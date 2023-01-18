'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F30%2Fcat-in-house-41212978-2000.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F30%2Fcat-in-house-41212978-2000.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F30%2Fcat-in-house-41212978-2000.jpg',
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
        spotId: 3,
        url: 'https://www.rover.com/blog/wp-content/uploads/2019/06/cat-2251428_1920-e1612307977742-960x540.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.rover.com/blog/wp-content/uploads/2019/06/cat-2251428_1920-e1612307977742-960x540.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.rover.com/blog/wp-content/uploads/2019/06/cat-2251428_1920-e1612307977742-960x540.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.rover.com/blog/wp-content/uploads/2019/06/cat-2251428_1920-e1612307977742-960x540.jpg',
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
        spotId: 4,
        url: 'https://www.pawtracks.com/wp-content/uploads/sites/2/2020/06/thorsten-nilson-eyeem-yo-1.jpg?fit=1024%2C1024&p=1',
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
        spotId: 6,
        url: 'https://www.barcs.org/media/CACHE/images/post-images/litterbox/d46f15d900cfa4f05d1bd91e1f5ad092.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/bf/b6/59/bfb659516d11bc00f669917a57272ee1.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/bf/b6/59/bfb659516d11bc00f669917a57272ee1.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/bf/b6/59/bfb659516d11bc00f669917a57272ee1.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sleeping-kittens-in-bowl-sanna-pudas.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sleeping-kittens-in-bowl-sanna-pudas.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sleeping-kittens-in-bowl-sanna-pudas.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sleeping-kittens-in-bowl-sanna-pudas.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sleeping-kittens-in-bowl-sanna-pudas.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://miro.medium.com/max/720/1*0VU_jlhukyJN7IdefYnHZg.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://imgur.com/4AO1Mtt.png',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://imgur.com/4AO1Mtt.png',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://imgur.com/4AO1Mtt.png',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-photos-of-cats-cuddling-1593203046.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://media.timeout.com/images/105634590/image.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://media.timeout.com/images/105634590/image.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://media.timeout.com/images/105634590/image.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_513189787_110007.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://imgur.com/t6FwCrH.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://imgur.com/t6FwCrH.jpg',
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
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38
        ]
      }
    });
  }
};
