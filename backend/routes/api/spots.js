const express = require('express')

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const router = express.Router();

const { Op } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { create } = require('domain');

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
router.get('/', validateSpot, async (req, res, next) => {

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
      attributes: ['url']
    })

    let spotData = content.toJSON()
    spotData.avgRating = ratings[0].avgRating
    spotData.previewImage = imageUrl.url


    spot.push(spotData)
  }

  res.json({
    spots: spot,
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

  res.json({Spots: spots})
});

//Get details of a Spot from an id// SPOTIMAGES NOT DISPLAYING FALSE
router.get('/:spotId', async (req, res) => {
  const {spotId} = req.params
  const spot = await Spot.findByPk(spotId)
  const owner = await User.findByPk(spot.ownerId,
    { attributes: ['id', 'firstName', 'lastName']
})
  const reviews = await Review.count({
      where: {
          spotId: spot.id
      }
  })
  const sumReviews = await Review.sum('stars', {
      where: { spotId: spot.id }
  })
  const spotImage = await SpotImage.findByPk(spot.ownerId,{

    attributes: ['id', 'url', 'preview']
})
  let newSpot = spot.toJSON()
  let avgStarRating;
  if (sumReviews === null) {
      avgStarRating = 0
  } else {
      avgStarRating = (sumReviews / reviews).toFixed(1)
  }


  if(!spot){
    res.statusCode = 404,
    res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }

  newSpot.numReviews = reviews;
  newSpot.avgRating = avgStarRating
  newSpot.SpotImages = spotImage;
  newSpot.Owner = owner;
  res.json(newSpot)
})

//create a spot
router.post('/', validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const user = req.user
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
  res.json(spots)
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



  module.exports = router;
