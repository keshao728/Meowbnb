'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=%5B940%2C639%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F30%2Fcat-in-house-41212978-2000.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.rover.com/blog/wp-content/uploads/iStock-1360947774-960x540.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.rover.com/blog/wp-content/uploads/2019/06/cat-2251428_1920-e1612307977742-960x540.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.pawtracks.com/wp-content/uploads/sites/2/2020/06/thorsten-nilson-eyeem-yo-1.jpg?fit=1024%2C1024&p=1',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.ytimg.com/vi/YSHDBB6id4A/maxresdefault.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://www.barcs.org/media/CACHE/images/post-images/litterbox/d46f15d900cfa4f05d1bd91e1f5ad092.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://drive.google.com/uc?export=view&id=1MKdkTngstCf6VDIhH5EQJvifVPQ_78Rp',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://drive.google.com/uc?export=view&id=1MMyBDdK8yQWkStYUMmA4icxNt_aJsZpr',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://drive.google.com/uc?export=view&id=1M8bXCZSVpjcZewan1hR1coomjLEXXD8C',
        preview: true
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {
      spotId: {
        [Op.in]: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ]
      }
    });
  }
};
