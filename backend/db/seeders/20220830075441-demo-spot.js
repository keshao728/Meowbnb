'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 2,
        address: '1325 Sunsweet Blvd',
        city: 'Yuba City',
        state: 'California',
        country: 'United States',
        lat: 65.55,
        lng: -122.22,
        name: 'Cat Palace',
        description: 'Welcome to a wonderful beachfront home with breathtaking views and direct access to the best shops in town, located in the private neighborhood of Yuba City. Homes don\'t get closer than this to the road!',
        price: 299
      },
      {
        ownerId: 5,
        address: '11421 S Halsted St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 11.55,
        lng: 11.22,
        name: 'Fish Castle',
        description: 'Kick back, relax, and enjoy the view in our boho Little Aiyi Xitelu. Perfect for down time in between adventures.',
        price: 999
      },
      {
        ownerId: 8,
        address: '11223 Meowu Cat Ave',
        city: 'Port Angeles',
        state: 'Washington',
        country: 'United States',
        lat: 78.55,
        lng: 66.22,
        name: 'Mouse TreeHouse',
        description: 'Stunning Tree house brings you a total North-West Washington experience.',
        price: 2820
      },
      {
        ownerId: 10,
        address: '123 Lux Ave',
        city: 'Beverly Hills',
        state: 'California',
        country: 'United States',
        lat: 88.88,
        lng: -88.88,
        name: 'Catnip Maison',
        description: 'Inspired by the French countryside, this Beverly Hills residence exudes the ideal mix of modernity and charm.',
        price: 50000
      },
      {
        //5
        ownerId: 1,
        address: '321 Op Ave',
        city: 'Fairfield',
        state: 'California',
        country: 'United States',
        lat: 88.88,
        lng: -88.88,
        name: 'Scratch Pad Private Garage',
        description: 'Come and spend a relaxing moment in our Love Cave located in the centre of Valencia for couples or groups of friends!',
        price: 159
      },
      {
        //6
        ownerId: 3,
        address: '1 Best St',
        city: 'Martinsdale',
        state: 'California',
        country: 'United States',
        lat: 88.88,
        lng: -88.88,
        name: 'Litter Cave House',
        description: 'This accommodation only accepts lovers of all kinds, life, nature, the cat being.',
        price: 28
      },
      {
        ownerId: 4,
        address: '106 Onico St',
        city: 'Joshua Tree',
        state: 'California',
        country: 'United States',
        lat: 88.88,
        lng: -88.88,
        name: 'Public Villa',
        description: 'Our villa is the collective expression of lifelong friends with a passion for the desert, for art and for living well. We hope our home provides you with the same sense of awe we experience each time we visit Joshua Tree.',
        price: 728
      },
      {
        //8
        ownerId: 6,
        address: '112 Dammit Dr',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 88.88,
        lng: -88.88,
        name: 'Outside of the House',
        description: 'Enjoy some fresh air.',
        price: 0
      },
      {
        //9
        ownerId: 7,
        address: '888 Kelly St',
        city: "In a Cute Girl's Arms",
        state: 'California',
        country: 'United States',
        lat: 88.88,
        lng: -88.88,
        name: 'You know it',
        description: 'wink wink~',
        price: 9999999999
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: {
        [Op.in]: [
          2,
          5,
          8,
          10,
          1,
          3,
          4,
          6,
          7


        ]
      }
    });
  }
};
