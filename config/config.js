require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USER_DATABASE,
    password: process.env.CLAVE_DB,
    database: process.env.NAME_DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.USER_DATABASE,
    password: process.env.CLAVE_DB,
    database: process.env.NAME_DATABASE + '_test',
    host: process.env.HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.USER_DATABASE,
    password: process.env.CLAVE_DB,
    database: process.env.NAME_DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
  },
};
