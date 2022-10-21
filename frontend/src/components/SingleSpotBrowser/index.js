import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import { locationReviewsThunk } from "../../store/reviews"

import './SingleSpotBrowser.css'

const SingleSpotBrowser = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  // console.log("this is the SESSION USER", sessionUser)

  //SPOT
  const currSpot = useSelector(state => state.spots.singleSpot)
  console.log("this is the user's current spot", currSpot)
  // const sessionUser = useSelector((state) => state.session.user)

  //REVIEWS
  const allReviews = useSelector(state => state.reviews.spot);
  // console.log("THIS IS MY COMPONENT OF ALL REVIEWS:", allReviews)
  const allReviewsArr = Object.values(allReviews)
  // console.log("THIS IS MY COMPONENT OF ALL REVIEWS ARR:", allReviewsArr)

  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(locationReviewsThunk(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  let alreadyReviewed;
  if (sessionUser.id && allReviewsArr.length > 0) {
    alreadyReviewed = allReviewsArr.find(review => review.userId === sessionUser.id)
  }

  let allowReviewAction = false;
  if ((sessionUser) && (sessionUser.id !== currSpot.ownerId) && (!alreadyReviewed)) {
    allowReviewAction = true
  }


  return isLoaded && (
    <div className="browser-wrapper">
      {currSpot.id &&
        <div className="single-spot-parent">
          <strong className="spot-name">
            {currSpot.name}
          </strong>

          <div className="spot-details">
            <div className="spot-star">
              <i className="fa-solid fa-paw"></i>
              &nbsp;
              {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'}
              &nbsp;&nbsp;·
            </div>

            <div className="spot-address" key={currSpot.name}>
              {currSpot.city}, {currSpot.state}, {currSpot.country}
            </div>
          </div>

          <div className="all-images">
            <img className="big-image" alt="spot" src={currSpot.SpotImages[0]?.url}></img>
          </div>

          <div className="spot-hosted">
            <div> Spot hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}</div>
          </div>

          <div>
            <strong>
              ${currSpot.price}
            </strong>
            &nbsp;
            night
          </div>

          <div>
            <div className="spot-description">
              {currSpot.description}
            </div>
          </div>
        </div>
      }


      <div>
        <h3>★ {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'} · {currSpot.numReviews} reviews</h3>
{/* {console.log("AVG RATING FOR CURR SPOT", currSpot.avgStarRating)} */}
        {allowReviewAction &&
          <div className='review-this-spot'>
            <NavLink to={`/spots/${currSpot.id}/review`}>Review This Spot</NavLink>
          </div>
        }


        {allReviewsArr?.map((review) => (
          <div className='review-item' key={review.id}>
            <div>

              <div className="review-username">
                {review.User.firstName} {review.User.lastName}
              </div>

              <div className="review-message">
                {review?.review}
              </div>

              <div className='user-review-date'>
                {new Date(review.createdAt).toDateString().split(' ').slice(1).join(' ')}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SingleSpotBrowser
