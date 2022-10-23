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
        userId: 2,
        review: "MEOWU",
        stars: 4
      },
      {
        spotId: 3,
        userId: 5,
        review: "woof..?",
        stars: 1
      },
      {
        spotId: 3,
        userId: 2,
        review: "woof..?",
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: "hiss hiss, this place sucks",
        stars: 1
      },
      {
        spotId: 5,
        userId: 7,
        review: "RAWRRRRRRRRRRR",
        stars: 3
      },
      {
        spotId: 6,
        userId: 5,
        review: "It's aite",
        stars: 2
      },
      {
        spotId: 7,
        userId: 5,
        review: "So...c..cold.......",
        stars: 1
      },
      {
        spotId: 7,
        userId: 6,
        review: "PURR*",
        stars: 5
      },
      {
        spotId: 8,
        userId: 9,
        review: "10/10!! Don't even think about it, reserve your night now",
        stars: 5
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
