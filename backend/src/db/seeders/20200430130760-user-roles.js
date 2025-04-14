const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('ChiefOperationsOfficer'),
        name: 'Chief Operations Officer',
        createdAt,
        updatedAt,
      },

      {
        id: getId('SalesDirector'),
        name: 'Sales Director',
        createdAt,
        updatedAt,
      },

      {
        id: getId('CustomerServiceManager'),
        name: 'Customer Service Manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('LegalAdvisor'),
        name: 'Legal Advisor',
        createdAt,
        updatedAt,
      },

      {
        id: getId('MarketingCoordinator'),
        name: 'Marketing Coordinator',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'activities',
      'contacts',
      'leads',
      'metrics',
      'notes',
      'roles',
      'permissions',
      'branches',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('CREATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('READ_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('UPDATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('DELETE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('CREATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('READ_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('UPDATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('DELETE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('CREATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('READ_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('UPDATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('DELETE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('READ_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('UPDATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('READ_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('UPDATE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('CREATE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('READ_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('UPDATE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('DELETE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('CREATE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('READ_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('UPDATE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('DELETE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('READ_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('UPDATE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('READ_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('UPDATE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('READ_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('UPDATE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('CREATE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('READ_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('UPDATE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('DELETE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('READ_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('UPDATE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('READ_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('READ_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('CREATE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('READ_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('UPDATE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('DELETE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('CREATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('READ_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('UPDATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('DELETE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('CREATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('READ_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('UPDATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('DELETE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('CREATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('READ_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('UPDATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('DELETE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('CREATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('READ_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('UPDATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('DELETE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('READ_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('UPDATE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ChiefOperationsOfficer'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesDirector'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CustomerServiceManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LegalAdvisor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('MarketingCoordinator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CONTACTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CONTACTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CONTACTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_LEADS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_LEADS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_LEADS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_METRICS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_METRICS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_METRICS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NOTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NOTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NOTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_CONTACTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_CONTACTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_CONTACTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_CONTACTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_LEADS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_LEADS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_LEADS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_LEADS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_METRICS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_METRICS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_METRICS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_METRICS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_NOTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_NOTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_NOTES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_NOTES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_BRANCHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_BRANCHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_BRANCHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_BRANCHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'ChiefOperationsOfficer',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SalesDirector',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
