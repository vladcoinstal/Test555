const os = require('os');

const config = {
  gcloud: {
    bucket: 'fldemo-files',
    hash: 'ec57b246a0521edf8af3570956d1adad',
  },
  bcrypt: {
    saltRounds: 12,
  },
  admin_pass: 'd346520e',
  user_pass: '8254d64f8607',
  admin_email: 'admin@flatlogic.com',
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft',
  },
  secret_key: process.env.SECRET_KEY || '',
  remote: '',
  port: process.env.NODE_ENV === 'production' ? '' : '8080',
  hostUI: process.env.NODE_ENV === 'production' ? '' : 'http://localhost',
  portUI: process.env.NODE_ENV === 'production' ? '' : '3000',

  portUIProd: process.env.NODE_ENV === 'production' ? '' : ':3000',

  swaggerUI: process.env.NODE_ENV === 'production' ? '' : 'http://localhost',
  swaggerPort: process.env.NODE_ENV === 'production' ? '' : ':8080',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  microsoft: {
    clientId: process.env.MS_CLIENT_ID || '',
    clientSecret: process.env.MS_CLIENT_SECRET || '',
  },
  uploadDir: os.tmpdir(),
  email: {
    from: 'Test 444 <app@flatlogic.app>',
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  roles: {
    super_admin: 'Super Administrator',

    admin: 'Administrator',

    user: 'Marketing Coordinator',
  },

  project_uuid: 'd346520e-34c8-4488-890d-8254d64f8607',
  flHost:
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'dev_stage'
      ? 'https://flatlogic.com/projects'
      : 'http://localhost:3000/projects',
};

config.pexelsKey = process.env.PEXELS_KEY || '';
config.pexelsQuery = 'connecting departments through technology';
config.host =
  process.env.NODE_ENV === 'production' ? config.remote : 'http://localhost';
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.swaggerUrl = `${config.swaggerUI}${config.swaggerPort}`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}/#`;
config.backUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
