'use strict';
const { INTEGER } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' });
      Spot.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true });
      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true });
      // Spot.belongsToMany(models.User, {
      //   through: models.Review,
      //   foreignKey: 'spotId',
      //   otherKey: 'userId',
      //   onDelete: 'CASCADE'
      // });
      // Spot.belongsToMany(models.User, {
      //   through: models.Booking,
      //   foreignKey: 'spotId',
      //   otherKey: 'userId',
      //   onDelete: 'CASCADE'

      // });
      //?Shall I connect to ReviewImages?
    }
  }

  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // onDelete: 'CASCADE'
    },
    place: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    amenities: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('amenities').split(';')
      },
      set(val) {
        this.setDataValue('amenities', val.join(';'));
      },
      // get: function () {
      //   return JSON.parse(this.getDataValue('amenities'));
      // },
      // set: function (val) {
      //   return this.setDataValue('amenities', JSON.stringify(val));
      // }
      // type: DataTypes.ARRAY(DataTypes.STRING),
      // allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlpha: true
      // }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlpha: true
      // }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlpha: true
      // }
    },
    lat: {
      type: DataTypes.DECIMAL,
      // allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      // allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};


