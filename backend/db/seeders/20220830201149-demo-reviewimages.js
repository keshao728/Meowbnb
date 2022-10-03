'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://na.rdcpix.com/503868865/8e426401a33aea693e391e225f49a632w-c0xd-w640_h480_q80.jpg'
      },
      {
        reviewId: 2,
        url: 'https://na.rdcpix.com/503868865/8e426401a33aea693e391e225f49a632w-c0xd-w640_h480_q80.jpg'
      },
      {
        reviewId: 3,
        url: 'https://na.rdcpix.com/503868865/8e426401a33aea693e391e225f49a632w-c0xd-w640_h480_q80.jpg'
      },
      {
        reviewId: 4,
        url: 'https://na.rdcpix.com/503868865/8e426401a33aea693e391e225f49a632w-c0xd-w640_h480_q80.jpg'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', {
      reviewId: {
        [Op.in]: [
          1,
          2,
          3,
          4
        ]
      }
    });
  }
};
