'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        id: 8,
        name: "asdasda",
        description: "asdadad",
        createdAt: new Date("2025-07-19T16:25:00.892Z"),
        updatedAt: new Date("2025-07-19T16:25:00.892Z"),
      },
      {
        id: 9,
        name: "asdasdadsadas",
        description: "asdasdadad",
        createdAt: new Date("2025-07-19T16:25:07.144Z"),
        updatedAt: new Date("2025-07-19T16:25:07.144Z"),
      },
      {
        id: 10,
        name: "asdasdasdasdasd",
        description: "asdasdsadad",
        createdAt: new Date("2025-07-19T16:25:13.983Z"),
        updatedAt: new Date("2025-07-19T16:25:13.983Z"),
      },
      {
        id: 11,
        name: "qertqfqfq",
        description: "f2v2vq2vq",
        createdAt: new Date("2025-07-19T16:25:16.930Z"),
        updatedAt: new Date("2025-07-19T16:25:16.930Z"),
      },
      {
        id: 12,
        name: "qffqacac",
        description: "acascasfgtt",
        createdAt: new Date("2025-07-19T16:25:20.932Z"),
        updatedAt: new Date("2025-07-19T16:25:20.932Z"),
      },
      {
        id: 22,
        name: "Mi primer post",
        description: "Este es un post de prueba creado desde Postman",
        createdAt: new Date("2025-07-19T21:54:24.066Z"),
        updatedAt: new Date("2025-07-19T21:54:24.066Z"),
      },
      {
        id: 23,
        name: "das",
        description: "asdasd",
        createdAt: new Date("2025-07-19T22:00:34.174Z"),
        updatedAt: new Date("2025-07-19T22:00:34.174Z"),
      },
      {
        id: 24,
        name: "asdad",
        description: "ddd",
        createdAt: new Date("2025-07-19T22:00:59.821Z"),
        updatedAt: new Date("2025-07-19T22:00:59.821Z"),
      },
      {
        id: 25,
        name: "sadasdadassd",
        description: "asdas",
        createdAt: new Date("2025-07-19T22:14:32.515Z"),
        updatedAt: new Date("2025-07-19T22:14:32.515Z"),
      },
      {
        id: 32,
        name: "nuevo 2",
        description: "nuevo 2",
        createdAt: new Date("2025-07-19T22:53:40.977Z"),
        updatedAt: new Date("2025-07-19T22:53:51.994Z"),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
