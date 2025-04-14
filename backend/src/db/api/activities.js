const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ActivitiesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.create(
      {
        id: data.id || undefined,

        description: data.description || null,
        scheduled_at: data.scheduled_at || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await activities.setLead(data.lead || null, {
      transaction,
    });

    await activities.setBranches(data.branches || null, {
      transaction,
    });

    return activities;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const activitiesData = data.map((item, index) => ({
      id: item.id || undefined,

      description: item.description || null,
      scheduled_at: item.scheduled_at || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const activities = await db.activities.bulkCreate(activitiesData, {
      transaction,
    });

    // For each item created, replace relation files

    return activities;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const activities = await db.activities.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.description !== undefined)
      updatePayload.description = data.description;

    if (data.scheduled_at !== undefined)
      updatePayload.scheduled_at = data.scheduled_at;

    updatePayload.updatedById = currentUser.id;

    await activities.update(updatePayload, { transaction });

    if (data.lead !== undefined) {
      await activities.setLead(
        data.lead,

        { transaction },
      );
    }

    if (data.branches !== undefined) {
      await activities.setBranches(
        data.branches,

        { transaction },
      );
    }

    return activities;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of activities) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of activities) {
        await record.destroy({ transaction });
      }
    });

    return activities;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findByPk(id, options);

    await activities.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await activities.destroy({
      transaction,
    });

    return activities;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findOne({ where }, { transaction });

    if (!activities) {
      return activities;
    }

    const output = activities.get({ plain: true });

    output.lead = await activities.getLead({
      transaction,
    });

    output.branches = await activities.getBranches({
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
        model: db.leads,
        as: 'lead',

        where: filter.lead
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.lead
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  name: {
                    [Op.or]: filter.lead
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
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

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'activities',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              scheduled_at: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              scheduled_at: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.scheduled_atRange) {
        const [start, end] = filter.scheduled_atRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            scheduled_at: {
              ...where.scheduled_at,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            scheduled_at: {
              ...where.scheduled_at,
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
      const { rows, count } = await db.activities.findAndCountAll(queryOptions);

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
          Utils.ilike('activities', 'description', query),
        ],
      };
    }

    const records = await db.activities.findAll({
      attributes: ['id', 'description'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['description', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.description,
    }));
  }
};
