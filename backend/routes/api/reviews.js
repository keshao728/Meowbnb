const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5') //Stars is required
    .isLength({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

//get all review
// router.get('/current', requireAuth, async (req, res) => {
//   const currentUserId = req.user.id
//   const currentUserReview = await Review.findAll({
//     where: {
//       userId: currentUserId
//     },
//     attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
//     include: [
//       { model: User, attributes: ['id', 'firstName', 'lastName'] },
//       { model: Spot,
//         attributes: [
//           'id', 'ownerId', 'address',
//           'city', 'state', 'country',
//           'lat', 'lng', 'name', 'price'
//         ],
//         include: [
//           {model: SpotImage, where: {preview: true}, attributes: ["url"], raw: true, nest: true},]
//      },
//       { model: ReviewImage, attributes: ['id', 'url'], raw: true },
//     ],

//   });
//   console.log(currentUserReview)
//   res.json({ Reviews: currentUserReview });
// });

router.get('/current', requireAuth, async(req, res, next) => {
  let result = []
  const currentUserId = req.user.id

  const currentUserReview = await Review.findAll({
    where: {
      userId: currentUserId
    },
    attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot,
        attributes: [
          'id', 'ownerId', 'address',
          'city', 'state', 'country',
          'lat', 'lng', 'name', 'price'
        ],
      },
          {
              model: ReviewImage,
              attributes: ['id','url'],
              raw: true
          }
        ]

      })

   for(let review of currentUserReview) {
      let spotimage = await SpotImage.findByPk( review.id, {where: { preview: true }, attributes: ['url'] })
      let data = review.toJSON()
      data.Spot.previewImage = spotimage.url
     result.push(data)
   }
      res.json({Reviews: result})
  })

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const { reviewId } = req.params
  const { user } = req
  const { url, previewImage } = req.body
  const findReview = await Review.findByPk(reviewId)
  if (!findReview) {
    res.statusCode = 404,
      res.json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
  }
  if (user.id !== findReview.userId) {
    res.status(403)
    res.json({

      "message": "You must be the current user.",
      "statusCode": 403
    })
  } else {
    const imagecount = await ReviewImage.count({ where: { reviewId } })
    if (imagecount >= 10) {
      res.statusCode = 403.
      res.json({
        "message": "Maximum number of images for this resource was reached",
        "statusCode": 403
      })
    }
    const newImage = await ReviewImage.create({
      "reviewId": reviewId,
      "url": url
    })

    res.json(await ReviewImage.findByPk(newImage.id, {
      attributes: [
        'id',
        'url'
      ]
    }))
  }
})

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
  const userReview = await Review.findByPk(req.params.reviewId);
  if (!userReview) {
    res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    });
  };

  if (userReview) {
    if (userReview.userId === req.user.id) {
      const { review, stars } = req.body;

      if (review) userReview.review = review;
      if (stars) userReview.stars = stars;
      await userReview.save();

      res.json(userReview);
    } else {
      res.status(403).json({"message":"Forbidden","statusCode":403})}
  }
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
  res.status(404).json({
    message: "Review couldn't be found",
    statusCode: 404
  });
}
  if (review) {
    if (review.userId === req.user.id) {
      await review.destroy();

      res.json({
        message: "Successfully deleted",
        statusCode: 200
      });
    }


  }
});


module.exports = router;

