const db = require('../models');
const Users = db.users;

const Activities = db.activities;

const Contacts = db.contacts;

const Leads = db.leads;

const Metrics = db.metrics;

const Notes = db.notes;

const Branches = db.branches;

const ActivitiesData = [
  {
    description: 'Initial meeting with Acme Corp',

    scheduled_at: new Date('2023-11-01T10:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Follow-up call with Globex Inc',

    scheduled_at: new Date('2023-11-02T11:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Product demo for Initech',

    scheduled_at: new Date('2023-11-03T14:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Contract review with Umbrella Corp',

    scheduled_at: new Date('2023-11-04T09:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ContactsData = [
  {
    first_name: 'Alice',

    last_name: 'Johnson',

    email: 'alice.johnson@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Bob',

    last_name: 'Williams',

    email: 'bob.williams@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Charlie',

    last_name: 'Davis',

    email: 'charlie.davis@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Diana',

    last_name: 'Miller',

    email: 'diana.miller@example.com',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const LeadsData = [
  {
    name: 'Acme Corp',

    status: 'qualified',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Globex Inc',

    status: 'contacted',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Initech',

    status: 'new',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Umbrella Corp',

    status: 'new',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const MetricsData = [
  {
    name: 'Monthly Sales',

    value: 50000,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Customer Satisfaction',

    value: 85,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Lead Conversion Rate',

    value: 20,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Marketing ROI',

    value: 150,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const NotesData = [
  {
    content: 'Acme Corp is interested in our premium package.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Globex Inc needs a custom solution.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Initech is considering a long-term contract.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Umbrella Corp has budget constraints.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const BranchesData = [
  {
    name: 'Downtown Office',
  },

  {
    name: 'Uptown Office',
  },

  {
    name: 'Suburban Office',
  },

  {
    name: 'Riverside Office',
  },
];

// Similar logic for "relation_many"

async function associateUserWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setBranch) {
    await User0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setBranch) {
    await User1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setBranch) {
    await User2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setBranch) {
    await User3.setBranch(relatedBranch3);
  }
}

async function associateActivityWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setLead) {
    await Activity0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setLead) {
    await Activity1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setLead) {
    await Activity2.setLead(relatedLead2);
  }

  const relatedLead3 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity3 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Activity3?.setLead) {
    await Activity3.setLead(relatedLead3);
  }
}

async function associateActivityWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setBranch) {
    await Activity0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setBranch) {
    await Activity1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setBranch) {
    await Activity2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Activity3 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Activity3?.setBranch) {
    await Activity3.setBranch(relatedBranch3);
  }
}

async function associateContactWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setLead) {
    await Contact0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setLead) {
    await Contact1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setLead) {
    await Contact2.setLead(relatedLead2);
  }

  const relatedLead3 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Contact3 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contact3?.setLead) {
    await Contact3.setLead(relatedLead3);
  }
}

async function associateContactWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setBranch) {
    await Contact0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setBranch) {
    await Contact1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setBranch) {
    await Contact2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Contact3 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Contact3?.setBranch) {
    await Contact3.setBranch(relatedBranch3);
  }
}

async function associateLeadWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setOwner) {
    await Lead0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setOwner) {
    await Lead1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setOwner) {
    await Lead2.setOwner(relatedOwner2);
  }

  const relatedOwner3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setOwner) {
    await Lead3.setOwner(relatedOwner3);
  }
}

async function associateLeadWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setBranch) {
    await Lead0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setBranch) {
    await Lead1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setBranch) {
    await Lead2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setBranch) {
    await Lead3.setBranch(relatedBranch3);
  }
}

async function associateLeadWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setBranch) {
    await Lead0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setBranch) {
    await Lead1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setBranch) {
    await Lead2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setBranch) {
    await Lead3.setBranch(relatedBranch3);
  }
}

async function associateMetricWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric0 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Metric0?.setBranch) {
    await Metric0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric1 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Metric1?.setBranch) {
    await Metric1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric2 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Metric2?.setBranch) {
    await Metric2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric3 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Metric3?.setBranch) {
    await Metric3.setBranch(relatedBranch3);
  }
}

async function associateMetricWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric0 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Metric0?.setBranch) {
    await Metric0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric1 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Metric1?.setBranch) {
    await Metric1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric2 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Metric2?.setBranch) {
    await Metric2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Metric3 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Metric3?.setBranch) {
    await Metric3.setBranch(relatedBranch3);
  }
}

async function associateNoteWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Note0 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Note0?.setLead) {
    await Note0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Note1 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Note1?.setLead) {
    await Note1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Note2 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Note2?.setLead) {
    await Note2.setLead(relatedLead2);
  }

  const relatedLead3 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Note3 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Note3?.setLead) {
    await Note3.setLead(relatedLead3);
  }
}

async function associateNoteWithBranch() {
  const relatedBranch0 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Note0 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Note0?.setBranch) {
    await Note0.setBranch(relatedBranch0);
  }

  const relatedBranch1 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Note1 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Note1?.setBranch) {
    await Note1.setBranch(relatedBranch1);
  }

  const relatedBranch2 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Note2 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Note2?.setBranch) {
    await Note2.setBranch(relatedBranch2);
  }

  const relatedBranch3 = await Branches.findOne({
    offset: Math.floor(Math.random() * (await Branches.count())),
  });
  const Note3 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Note3?.setBranch) {
    await Note3.setBranch(relatedBranch3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Activities.bulkCreate(ActivitiesData);

    await Contacts.bulkCreate(ContactsData);

    await Leads.bulkCreate(LeadsData);

    await Metrics.bulkCreate(MetricsData);

    await Notes.bulkCreate(NotesData);

    await Branches.bulkCreate(BranchesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithBranch(),

      await associateActivityWithLead(),

      await associateActivityWithBranch(),

      await associateContactWithLead(),

      await associateContactWithBranch(),

      await associateLeadWithOwner(),

      await associateLeadWithBranch(),

      await associateLeadWithBranch(),

      await associateMetricWithBranch(),

      await associateMetricWithBranch(),

      await associateNoteWithLead(),

      await associateNoteWithBranch(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('activities', null, {});

    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('leads', null, {});

    await queryInterface.bulkDelete('metrics', null, {});

    await queryInterface.bulkDelete('notes', null, {});

    await queryInterface.bulkDelete('branches', null, {});
  },
};
