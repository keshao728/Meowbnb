const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { SpotImage, sequelize } = require('../../db/models');

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

  spotImage.destroy()

  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})

module.exports = router;
