const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const {Review, ReviewImage, sequelize} = require('../../db/models');

router.delete('/:reviewImageId', requireAuth, async (req, res) => {
    const { reviewImageId } = req.params;
    const reviewImage = await ReviewImage.findByPk(reviewImageId)

    if (!reviewImage) {
        res
            .status(404)
            .json({
                message: "Review Image couldn't be found",
                statusCode: 404
              })
    }

    const owner = await Review.findByPk(reviewImage.reviewId)
    if(owner.userId !== req.user.id ){
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
        }
    if(owner.userId === req.user.id){
        await reviewImage.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})

module.exports = router;
