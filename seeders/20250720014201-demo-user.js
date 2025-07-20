'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admintcit2025', 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'tcit',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', { username: 'tcit' }, {});
  }
};
