'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        name: "asdasda",
        description: "asdadad",
        createdAt: new Date("2025-07-19T16:25:00.892Z"),
        updatedAt: new Date("2025-07-19T16:25:00.892Z"),
      },
      {
        name: "Mi primer post",
        description: "Este es un post de prueba creado desde Postman",
        createdAt: new Date("2025-07-19T21:54:24.066Z"),
        updatedAt: new Date("2025-07-19T21:54:24.066Z"),
      },
      {
        name: "nuevo 2",
        description: "nuevo 2",
        createdAt: new Date("2025-07-19T22:53:40.977Z"),
        updatedAt: new Date("2025-07-19T22:53:51.994Z"),
      },
      {
        name: "Mi primer post",
        description: "Este es un post de prueba creado desde Postman",
        createdAt: new Date("2025-07-20T19:27:50.166Z"),
        updatedAt: new Date("2025-07-20T19:27:50.166Z"),
      },
      {
        name: "maria",
        description: "backend",
        createdAt: new Date("2025-07-19T22:14:32.515Z"),
        updatedAt: new Date("2025-07-20T19:29:01.410Z"),
      },
      {
        name: "esther",
        description: "front end",
        createdAt: new Date("2025-07-19T22:00:59.821Z"),
        updatedAt: new Date("2025-07-20T19:29:09.320Z"),
      },
      {
        name: "esta es otra",
        description: "una prueba mas",
        createdAt: new Date("2025-07-19T22:00:34.174Z"),
        updatedAt: new Date("2025-07-20T19:29:20.440Z"),
      },
      {
        name: "luis",
        description: "fullstack",
        createdAt: new Date("2025-07-19T16:25:20.932Z"),
        updatedAt: new Date("2025-07-20T19:29:34.293Z"),
      },
      {
        name: "tci",
        description: "cloud solution",
        createdAt: new Date("2025-07-19T16:25:16.930Z"),
        updatedAt: new Date("2025-07-20T19:29:42.819Z"),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
