'use strict';

const fs = require('fs');
const path = require('path');
const { db, Sequelize } = require('../connection.js');
const basename = path.basename(__filename);
const models = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(db.sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = db.sequelize;
models.Sequelize = Sequelize;
module.exports = models;
