'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 2,
        place: 'Play zone',
        amenities: 'Air conditioning, Dedicated workspace, Kitchen, Wifi, TV, Washer, Free parking on premises, Paid parking on premises',
        address: '1325 Sunsweet Blvd',
        city: 'Yuba City',
        state: 'California',
        country: 'United States',
        lat: 39.135910,
        lng: -121.635460,
        name: 'Cat Palace',
        description: 'Welcome to a wonderful beachfront home with breathtaking views and direct access to the best shops in town, located in the private neighborhood of Yuba City. Homes don\'t get closer than this to the road!',
        price: 299
      },
      {
        ownerId: 5,
        place: 'Box',
        amenities: 'Wifi, TV, Air conditioning, Free parking on premises',
        address: '11421 S Halsted St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 41.686600,
        lng: -87.641930,
        name: 'Fish Castle',
        description: 'Kick back, relax, and enjoy the view in our boho Little Aiyi Xitelu. Perfect for down time in between adventures.',
        price: 999
      },
      {
        ownerId: 8,
        place: 'Tree',
        amenities: 'Wifi, TV, Dedicated workspace, Free parking on premises',
        address: '4500 Wilbur Avenue',
        city: 'Oakley',
        state: 'California',
        country: 'United States',
        lat: 38.01,
        lng: -121.74,
        name: 'Mouse TreeHouse',
        description: 'Stunning Tree house brings you a total North-West Washington experience.',
        price: 2820
      },
      {
        ownerId: 10,
        place: 'Box',
        amenities: 'Air conditioning, TV, Dedicated workspace, Free parking on premises',
        address: '5450 Concord Boulevard',
        city: 'Concord',
        state: 'California',
        country: 'United States',
        lat: 37.955,
        lng: -121.951,
        name: 'Catnip Maison',
        description: 'Inspired by the French countryside, this Beverly Hills residence exudes the ideal mix of modernity and charm.',
        price: 50000
      },
      {
        //5
        ownerId: 4,
        place: 'Others',
        amenities: 'Kitchen, Wifi, TV, Washer, Free parking on premises, Paid parking on premises',
        address: '4456 East Absolut Avenue',
        city: 'Fresno',
        state: 'California',
        country: 'United States',
        lat: 36.653,
        lng: -119.71,
        name: 'Scratch Pad Private Garage',
        description: 'Come and spend a relaxing moment in our Love Cave located in the centre of Valencia for couples or groups of friends!',
        price: 159
      },
      {
        //6
        ownerId: 3,
        place: 'Others',
        amenities: 'Air conditioning, Dedicated workspace, Kitchen, Wifi, TV, Washer, Free parking on premises, Paid parking on premises',
        address: '5643 Apex Drive',
        city: 'Dublin',
        state: 'California',
        country: 'United States',
        lat: 88.88,
        lng: -88.88,
        name: 'Litter Cave House',
        description: 'This accommodation only accepts lovers of all kinds, life, nature, the cat being.',
        price: 28
      },
      {
        //7
        ownerId: 6,
        place: 'No-meows-land',
        amenities: 'Dedicated workspace, Kitchen, Wifi, TV, Washer, Paid parking on premises',
        address: '765 Montague Expressway',
        city: 'Milpitas',
        state: 'California',
        country: 'United States',
        lat: 37.4118964,
        lng: -121.8909867,
        name: 'Outside of the House',
        description: 'Enjoy some fresh air.',
        price: 1
      },
      {
        //8
        ownerId: 7,
        place: 'Sleep-only',
        amenities: 'Kitchen, Wifi, TV, Washer, Paid parking on premises',
        address: '6970 Brentwood Boulevard',
        city: "Brentwood",
        state: 'Grand Est',
        country: 'Grand Est',
        lat: 37.9546641,
        lng: -121.695767,
        name: 'Furball Townhouse',
        description: 'Best place in the world',
        price: 99
      },
      {
        //9
        ownerId: 5,
        place: 'Furball',
        amenities: 'Dedicated workspace, Kitchen, Wifi, TV, Washer, Paid parking on premises',
        address: '430 Railroad Avenue',
        city: 'Old Town',
        state: 'Contra Costa County',
        country: 'United States',
        lat: 38.0325107,
        lng: -121.8838967,
        name: 'Warm-Knited Home',
        description: 'This place has a unique feature that will surely amaze and delight guests; its wall is designed to open and close at will, offering a breathtaking view of the southern side of the Meowmeow Mountains. ',
        price: 1459
      },
      {
        //10
        ownerId: 3,
        place: 'Furball',
        amenities: 'Kitchen, Wifi, TV, Washer, Free parking on premises, Paid parking on premises',
        address: '6675 Brentwood Boulevard',
        city: 'Brentwood',
        state: 'California',
        country: 'United States',
        lat: 37.9593747,
        lng: -121.6964766,
        name: 'Carpet of Fur',
        description: 'Are you bored and tired of quarantine and longing for a new place and a new atmosphere to just break away for a couple of days, week or month? the Carpet of Fur has the answer.',
        price: 559
      },
      {
        //11
        ownerId: 4,
        place: 'Shared',
        amenities: 'Kitchen, Wifi, TV, Washer, Free parking on premises, Paid parking on premises',
        address: '12435 West Jefferson Boulevard',
        city: 'Westchester',
        state: 'LA County',
        country: 'United States',
        lat: 33.9807115,
        lng: -118.4109238,
        name: 'Carpet of Fur',
        description: 'Enjoy beautiful views of the other cats and spectacular sunsets at this five star rated home in Westchester.',
        price: 79
      },
      {
        //12
        ownerId: 6,
        place: 'Sleep-only',
        amenities: 'Wifi, TV, Dedicated workspace, Free parking on premises',
        address: '548 Bliss Avenue',
        city: 'Pittsburg',
        state: 'California',
        country: 'United States',
        lat: 38.012758,
        lng: -121.8786304,
        name: 'Snooze Room',
        description: 'Snooze Room is a Frank Lloyd Wright inspired modern California Ranch w/ subtle Prairie & International architectural design; perched on a promontory overlooking cove w/ jaw dropping ocean views and mesmerizing - audible crashing white water waves.',
        price: 2199
      },
      {
        //13
        ownerId: 7,
        place: 'No-meows-land',
        amenities: 'Dedicated workspace, Kitchen, Wifi, TV, Washer, Paid parking on premises',
        address: '2701 Contra Loma Boulevard',
        city: 'Antioch',
        state: 'California',
        country: 'United States',
        lat: 37.9976579,
        lng: -121.8216976,
        name: 'Quite-Time Single Family Home',
        description: 'Channel the pursuit of pause in this tranquil retreat. The private space is set in a lovingly decorated home with a mid-century modern aesthetic, chic furnishings, contrasting textures, and features a shared living space and kitchen.',
        price: 186
      },
      {
        //14
        ownerId: 8,
        place: 'Evil',
        amenities: 'Wifi, TV, Air conditioning, Free parking on premises',
        address: '65923 Rimrock Court',
        city: 'Bend',
        state: 'California',
        country: 'Oregon',
        lat: 44.192829,
        lng: -121.1780685,
        name: 'A Place to Stay',
        description: 'Big Horn Lodge 403 is designated Platinum with exquisite mountain modern décor, luxe flooring and finishes as well as exceptional sleeping capacity.',
        price: 86
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: {
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
          14
        ]
      }
    });
  }
};
