'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
        {
            spotId: 1,
            userId: 3,
            startDate: '2023-01-01',
            endDate: '2023-01-05'
        },
        {
            spotId: 2,
            userId: 4,
            startDate: '2022-2-01',
            endDate: '2023-2-10'
        },
        {
            spotId: 4,
            userId: 7,
            startDate: '2022-3-11',
            endDate: '2022-3-13'
        },
        {
            spotId: 3,
            userId: 6,
            startDate: '2022-3-11',
            endDate: '2022-3-13'
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
        userId: {
            [Op.in]: [
                3,
                4,
                7,
                6
            ]
        }
    });
  }
};
