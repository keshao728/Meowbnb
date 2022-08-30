'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, { foreignKey: 'id' });
    }
  }

  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
