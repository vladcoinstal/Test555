const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const branches = sequelize.define(
    'branches',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  branches.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.branches.hasMany(db.users, {
      as: 'users_branches',
      foreignKey: {
        name: 'branchesId',
      },
      constraints: false,
    });

    db.branches.hasMany(db.activities, {
      as: 'activities_branches',
      foreignKey: {
        name: 'branchesId',
      },
      constraints: false,
    });

    db.branches.hasMany(db.contacts, {
      as: 'contacts_branches',
      foreignKey: {
        name: 'branchesId',
      },
      constraints: false,
    });

    db.branches.hasMany(db.leads, {
      as: 'leads_branch',
      foreignKey: {
        name: 'branchId',
      },
      constraints: false,
    });

    db.branches.hasMany(db.leads, {
      as: 'leads_branches',
      foreignKey: {
        name: 'branchesId',
      },
      constraints: false,
    });

    db.branches.hasMany(db.metrics, {
      as: 'metrics_branch',
      foreignKey: {
        name: 'branchId',
      },
      constraints: false,
    });

    db.branches.hasMany(db.metrics, {
      as: 'metrics_branches',
      foreignKey: {
        name: 'branchesId',
      },
      constraints: false,
    });

    db.branches.hasMany(db.notes, {
      as: 'notes_branches',
      foreignKey: {
        name: 'branchesId',
      },
      constraints: false,
    });

    //end loop

    db.branches.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.branches.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return branches;
};
