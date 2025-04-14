const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class MetricsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        value: data.value || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await metrics.setBranch(data.branch || null, {
      transaction,
    });

    await metrics.setBranches(data.branches || null, {
      transaction,
    });

    return metrics;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const metricsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      value: item.value || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const metrics = await db.metrics.bulkCreate(metricsData, { transaction });

    // For each item created, replace relation files

    return metrics;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const metrics = await db.metrics.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;

    if (data.value !== undefined) updatePayload.value = data.value;

    updatePayload.updatedById = currentUser.id;

    await metrics.update(updatePayload, { transaction });

    if (data.branch !== undefined) {
      await metrics.setBranch(
        data.branch,

        { transaction },
      );
    }

    if (data.branches !== undefined) {
      await metrics.setBranches(
        data.branches,

        { transaction },
      );
    }

    return metrics;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of metrics) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of metrics) {
        await record.destroy({ transaction });
      }
    });

    return metrics;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.findByPk(id, options);

    await metrics.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await metrics.destroy({
      transaction,
    });

    return metrics;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const metrics = await db.metrics.findOne({ where }, { transaction });

    if (!metrics) {
      return metrics;
    }

    const output = metrics.get({ plain: true });

    output.branch = await metrics.getBranch({
      transaction,
    });

    output.branches = await metrics.getBranches({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    const user = (options && options.currentUser) || null;
    const userBranches = (user && user.branches?.id) || null;

    if (userBranches) {
      if (options?.currentUser?.branchesId) {
        where.branchesId = options.currentUser.branchesId;
      }
    }

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.branches,
        as: 'branch',
      },

      {
        model: db.branches,
        as: 'branches',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('metrics', 'name', filter.name),
        };
      }

      if (filter.valueRange) {
        const [start, end] = filter.valueRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            value: {
              ...where.value,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            value: {
              ...where.value,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.branch) {
        const listItems = filter.branch.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          branchId: { [Op.or]: listItems },
        };
      }

      if (filter.branches) {
        const listItems = filter.branches.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          branchesId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.branchesId;
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.metrics.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('metrics', 'name', query),
        ],
      };
    }

    const records = await db.metrics.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
