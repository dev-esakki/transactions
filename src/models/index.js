/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const db = {};

let sequelize;

// To remove the DeprecationWarning & this is only for dev/test env
if (config?.logging === true) {
  /* eslint-disable-next-line no-console */
  config.logging = console.log;
}
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// iterate and get all model files relative path
const files = [];
const getFilesRecursively = (dir) => {
  const filesInDir = fs.readdirSync(dir);
  filesInDir.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath);
    } else if (
      filePath.indexOf('.') !== 0 &&
      filePath !== path.join(dir, basename) &&
      filePath.slice(-3) === '.js'
    ) {
      files.push(filePath);
    }
  });
};
getFilesRecursively(__dirname);

files.forEach((file) => {
  const model = require(file)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
