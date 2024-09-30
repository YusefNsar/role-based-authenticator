export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  logging: {
    logHeaders: process.env.LOG_HEADERS || false,
    logRequestData: process.env.LOG_REQUEST_DATA || false,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super_secret_321',
    expiresIn: process.env.JWT_EXPIRES_IN || '240s',
    refreshSecret: process.env.JWT_SECRET_REFRESH,
    refreshExpiresIn: process.env.JWT_EXPIRES_IN_REFRESH || '300s',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 1433,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME || 'user-service',
  },
});
