const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const e = require('express');
const { Op } = require('sequelize');

const router = express.Router();

//GET all current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
      }]
    })
const bookingss = []
for (let theBooking of bookings) {
  let review = theBooking.toJSON()
  const imagePreview = await SpotImage.findAll({
    where: {
      preview: true,
    spotId: review.spotId },
  })
  review.Spot.imagePreview = imagePreview.url
  bookingss.push(review)

}

  res.json({ Bookings: bookings })
})

// Edit Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const { bookingId } = req.params;
  const booking = await Booking.findByPk(bookingId)

  if (!booking) {
    res.status = 404
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }
  if (booking.endDate < new Date()) {
    res.status = 403
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
    res.status = 403
    res.json({
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
    res.statusCode = 404,
      res.json({
        "message": "Booking couldn't be found",
        "statusCode": 404
      })
  }
  if (bookings.startDate < today || bookings.endDate < today) {
    res.statusCode = 403,
      res.json({
        "message": "Bookings that have been started can't be deleted",
        "statusCode": 403
      })

  } else if (bookings.userId === user.id || deleteSpotBooking.ownerId === user.id) {

    await bookings.destroy()

    res.statusCode = 200
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  } else {

    res.status(403)
    res.json({
      "message": "Booking must belong to the current user or the Spot must belong to the current user",
      "statusCode": 403
    })
  }

})


module.exports = router;
