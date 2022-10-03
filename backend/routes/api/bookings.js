const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const e = require('express');
const { Op } = require('sequelize');


const router = express.Router();

//GET all current user's bookings
router.get('/current', requireAuth, async (req, res, next) => {
  let holder
  const { user } = req
  let result = []
  const bookings = await Booking.findAll({
    where: {
      userId: user.id
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'description']
      }
    }
  })

  for (let j = 0; j < bookings.length; j++) {
    holder = bookings[j].toJSON()
    let imageUrl = await SpotImage.findByPk(
      bookings[j].spotId, {
      where: { preview: true },
      attributes: ['url']
    })
    holder.Spot.previewImage = imageUrl.url
    result.push(holder)
  }
  res.json({ Bookings: result });
})


// Edit Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const { bookingId } = req.params;
  const booking = await Booking.findByPk(bookingId)

  if (!booking) {
    res.status(404)
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  if (booking.endDate < new Date()) {
    res.status(403)
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: res.statusCode
    })
  }
  let spotId = booking.spotId
  const bookings = await Booking.findAll({
    where: {
      spotId: spotId,
      startDate: {
        [Op.lte]: endDate,
        [Op.gte]: startDate
      },
      endDate: {
        [Op.lte]: endDate,
        [Op.gte]: startDate
      }
    }
  })

  if (bookings.length > 1) {
    res.status(403)
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  } else {
    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.update()
    res.json(booking)
  }
})

//Delete a Booking

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  const { bookingId } = req.params
  const { user } = req
  let today = new Date().toISOString().slice(0, 10)

  const bookings = await Booking.findByPk(bookingId)
  if (!bookings) {
    res.statusCode = 404;
     return res.json({
        "message": "Booking couldn't be found",
        "statusCode": 404
      })
  }
  const spot = await Spot.findOne({
    where: {
        id: bookings.spotId
    }
})
  if (bookings.startDate < today || bookings.endDate < today) {
    res.statusCode = 403
     return res.json({
        "message": "Forbidden",
        "statusCode": 403
      })

  } else if (bookings.userId === user.id || spot.ownerId === user.id) {

    await bookings.destroy()

    res.status(200)
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  } else {

    res.status(403)
    return res.json({
      "message": "Booking must belong to the current user or the Spot must belong to the current user",
      "statusCode": 403
    })
  }

})


module.exports = router;
