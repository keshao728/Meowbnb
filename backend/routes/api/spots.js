const express = require('express')

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const router = express.Router();

const { Op } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
//sequelize.Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { create } = require('domain');
const user = require('../../db/models/user');


const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  // .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
  // .isAlpha('en-US', {ignoreList: ' '})
  // .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    // .withMessage('Latitude is required')
    // .isLength({ min: -90, max: 90 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    // .withMessage('Longitude is required')
    // .isLength({ min: -180, max: 180 })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars is required')
    .isLength({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];


//Get all Spots
router.get('/', async (req, res, next) => {

  let { size, page } = req.query
  let pagination = {}
  let spot = []

  if (!page) page = 1
  if (!size) size = 20
  page = parseInt(page);
  size = parseInt(size);

  if (page >= 1 && size >= 1) {
    pagination.limit = size
    pagination.offset = size * (page - 1)

  }

  const spots = await Spot.findAll({
    ...pagination
  })

  for (let content of spots) {
    const ratings = await Review.findAll({
      raw: true,
      where: {
        spotId: content.id
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"],
      ],
    })

    let imageUrl = await SpotImage.findByPk(content.id, {
      where: {
        preview: true
      },
      attributes: ['url'], raw: true,
    })

    let spotData = content.toJSON()
    spotData.avgRating = ratings[0].avgRating
    spotData.previewImage = imageUrl.url


    spot.push(spotData)
  }

  res.json({
    Spots: spot,
    page: page,
    size: size
  })
});

// Get all Spots owned by the Current User // AVG RATING AND PREVIEWIMAGE MISSING
router.get('/current', requireAuth, async (req, res, next) => {
  const ownerId = req.user.id
  const spots = await Spot.findAll({
    where: {
      ownerId: ownerId
    }
  })

  let spot = []
  for (let content of spots) {
    const ratings = await Review.findAll({
      raw: true,
      where: {
        spotId: content.id
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
      ],
    })

    data = {
      ...content.dataValues,
      avgRating: ratings[0].avgRating,
    }
    spot.push(data)
  }

  res.json({ Spots: spots })
});

//Get details of a Spot from an id// SPOTIMAGES NOT DISPLAYING FALSE
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        attributes: {
          exclude: ["spotId", "createdAt", "updatedAt"]
        }
      },
      {
        model: User,
        attributes: [ 'id', 'firstName', 'lastName'],
        as: 'Owner',

      }
    ]
  })

  if (!spot) {
    res.statusCode = 404,
      res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  const reviews = await Review.count({
    where: {
      spotId: spot.id
    }
  })
  const sumReviews = await Review.sum('stars', {
    where: { spotId: spot.id }
  })
  let avgStarRatings;
  if (sumReviews === null) {
    avgStarRatings = 0
  } else {
    avgStarRatings = (sumReviews / reviews).toFixed(1)
  }

  // spot.numReviews = reviews
  // spot.avgStarRating = sumReviews
  res.json({spot, numReviews: reviews, avgStarRating:avgStarRatings})

  // const owner = await User.findByPk(spot.ownerId,
  //   {
  //     attributes: ['id', 'firstName', 'lastName']
  //   })
  // const spotImage = await SpotImage.findByPk(spot.ownerId, {

  //   attributes: ['id', 'url', 'preview']
  // })
  // let newSpot = spot.toJSON()
  // newSpot.numReviews = reviews;
  // newSpot.avgRating = avgStarRating
  // newSpot.SpotImage = spotImage;
  // newSpot.Owner = owner;
  // res.json(newSpot)
})

//create a spot
router.post('/', validateSpot, requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const user = req.user
  console.log(req.user)
  const spots = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })
  res.status = 201
  return res.json(spots)
})

//Add an Image to a Spot based on th Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { url, preview } = req.body
  const { spotId } = req.params

  const spot = await Spot.findByPk(spotId)
  if (!spot) {
    res.statusCode = 404,
      res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  const spotImage = await SpotImage.create({
    "spotId": spotId,
    "url": url,
    "preview": true
  })

  res.json(await SpotImage.findByPk(spotImage.id, {
    attributes: [
      'id',
      'url',
      'preview'
    ]
  }))
})

//Edit a Spot
router.put('/:spotId', validateSpot, requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })
  return res.json(spot)
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', validateReview, async (req, res) => {
  const { spotId } = req.params
  const { review, stars } = req.body
  const spot = await Spot.findByPk(spotId)
  if (!spot) {
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
  const alreadyReviewed = await Review.findOne({
    where: {
      spotId: spot.id,
      userId: req.user.id
    }
  })
  if (alreadyReviewed) {
    res.statusCode = 403
    res.json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  }
  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spot.id,
    review,
    stars
  })

  res.json(newReview)

})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params
  const spot = await Spot.findByPk(spotId)
  const reviews = await Review.findAll({
    where: {
      spotId: spotId
    },
    include: [
      {
        model: User, //NULL?
        attributes: [
          'id',
          'firstName',
          'lastName']
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'reviewId'
          ]
        }
      }
    ]

  })

  if (!spot) {
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  res.json({
    Reviews: reviews
  })
})

//GET all bookings for a spot based on spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (req.user.id !== spot.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    return res.json({ Bookings: bookings })
  }

  if (req.user.id === spot.ownerId) {
    const bookings = await Booking.findAll({
      include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
      where: {
        spotId: spot.id
      }
    })
    return res.json({ Bookings: bookings })
  }
})

//create a booking from a spot based on the spot's id
router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res, next) => {
  const { spotId } = req.params
  const { startDate, endDate } = req.body
  const bookSpot = await Spot.findByPk(spotId)

  if (!bookSpot) {
    res.status = 404,
      res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }

  if (endDate <= startDate) {
    res.status = 400,
      res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "endDate": "endDate cannot be on or before startDate"
        }
      })
  }

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

  if (bookings.length >= 1) {
    res.statusCode = 403
    res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }
  const newBooking = await Booking.create({
    spotId: spotId,
    userId: req.user.id,
    startDate,
    endDate
  })
  return res.json(newBooking)

})
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
      res.status = 404
      return res.json({
          message: "Spot couldn't be found",
          statusCode: 404
      })
  }
  if (spot.ownerId !== req.user.id) {
      res.status = 403
      res.json({
          "message": "Forbidden",
          "statusCode": 403
      })
  }

  spot.destroy()

  res.status = 200
  return res.json({
      message: "Successfully deleted",
      statusCode: 200
  })
})

module.exports = router;
