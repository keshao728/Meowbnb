'use strict';
const { INTEGER } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', onDelete: 'CASCADE',  hooks: true });
    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // onDelete: 'CASCADE'
    },
    review: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   isInt: true,
      //   min: 1,
      //   max: 5
      // }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
