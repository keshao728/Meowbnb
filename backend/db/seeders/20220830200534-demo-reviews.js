'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 3,
        review: "Meow meow!! Meow meow meowwww",
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review: "MEOWU",
        stars: 4
      },
      {
        spotId: 3,
        userId: 6,
        review: "woof..?",
        stars: 1
      },
      {
        spotId: 4,
        userId: 7,
        review: "RAWRRRRRRRRRRR",
        stars: 3
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      spotId: {
        [Op.in]: [
          1,
          2,
          4,
          3
        ]
      }
    });
  }
};
