export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  logging: {
    logHeaders: process.env.LOG_HEADERS || false,
    logRequestData: process.env.LOG_REQUEST_DATA || false,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret_123',
  },
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 1433,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'default',
  },
  email: {
    sendgridApiKey: process.env.SENDGRID_API_KEY,
  }
});
