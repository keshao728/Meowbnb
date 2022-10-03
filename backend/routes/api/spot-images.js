const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { Spot, SpotImage, sequelize } = require('../../db/models');

router.delete('/:spotImageId', requireAuth, async (req, res) => {
  const { spotImageId } = req.params;
  const spotImage = await SpotImage.findByPk(spotImageId)

  if (!spotImage) {
    return res
      .status(404)
      .json({
        message: "Spot Image couldn't be found",
        statusCode: 404
      })
  }
  const owner = await Spot.findByPk(spotImage.spotId)

  if (owner.ownerId !== req.user.id) {
    res.status(403).json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }
  if (owner.ownerId === req.user.id) {
    await spotImage.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})

module.exports = router;
