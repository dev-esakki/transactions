require('dotenv').config();

module.exports = {
  dev: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
    migrationStorageTableSchema: 'public',
    port: process.env.DB_PORT,
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    logging: true,
    logQueryParameters: true,
  },
};
