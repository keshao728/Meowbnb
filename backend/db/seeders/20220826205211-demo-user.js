'use strict';
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-user',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Cat',
        lastName: 'Boss',
        email: 'catboss@user.io',
        username: 'Cat-boss',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Maine',
        lastName: 'Coon',
        email: 'mainecoon@user.io',
        username: 'Maine-coon',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Persian',
        lastName: 'Cat',
        email: 'meowukey@user.io',
        username: 'Persian-cat',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'British',
        lastName: 'Shorthair',
        email: 'britishshorthair@user.io',
        username: 'British-shorthair',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Bengal',
        lastName: 'Cat',
        email: 'bengalcat@user.io',
        username: 'Bengal-cat',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Rag',
        lastName: 'Doll',
        email: 'ragdoll@user.io',
        username: 'Rag-doll',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Scottish',
        lastName: 'Fold',
        email: 'scottishfold@user.io',
        username: 'Scottish-fold',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'American',
        lastName: 'Shorthair',
        email: 'americanshorthair@user.io',
        username: 'American-shorthair',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Turkish',
        lastName: 'Angora',
        email: 'turkishangora@user.io',
        username: 'Turkish-angora',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        firstName: 'Russian',
        lastName: 'Blue',
        email: 'russianblue@user.io',
        username: 'Russian-blue',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        firstName: 'Bir',
        lastName: 'Man',
        email: 'birman@user.io',
        username: 'Bir-man',
        hashedPassword: bcrypt.hashSync('password12')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: [
          'Demo-user',
          'Cat-boss',
          'Maine-coon',
          'Persian-cat',
          'British-shorthair',
          'Bengal-cat',
          'Rag-doll',
          'Scottish-fold',
          'American-shorthair',
          'Turkish-angora',
          'Russian-blue',
          'Bir-man'
        ]
      }
    }, {});
  }
};
