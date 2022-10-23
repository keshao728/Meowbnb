import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
// import { resetData } from "../../store/spots"
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
  // console.log("this is the user's current spot", currSpot)
  // const sessionUser = useSelector((state) => state.session.user)

  //REVIEWS
  const allReviews = useSelector(state => state.reviews.spot);
  // console.log("THIS IS MY COMPONENT OF ALL REVIEWS:", allReviews)
  const allReviewsArr = Object.values(allReviews)
  // console.log("THIS IS MY COMPONENT OF ALL REVIEWS ARR:", allReviewsArr)

  //TODO IIFE - async await
  useEffect(() => {
    dispatch(getOneSpot(spotId))
      .then(() => dispatch(locationReviewsThunk(spotId)))
      // return (() => dispatch(resetData()))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  let alreadyReviewed;
  if (sessionUser && allReviewsArr.length > 0) {
    alreadyReviewed = allReviewsArr.find(review => review.userId === sessionUser.id)
  }

  let allowReviewAction = false;
  if ((sessionUser) && (sessionUser.id !== currSpot.ownerId) && (!alreadyReviewed)) {
    allowReviewAction = true
  }



  return isLoaded && (
    <div className="big-mother">
      <div className="browser-wrapper">
        {currSpot.id &&
          <div className="single-spot-parent">
            <div className="top-spot">
              <div className="spot-name">
                {currSpot.name}
              </div>

              <div className="spot-details">
                <div className="spot-star">
                  <i className="fa-solid fa-paw"></i>
                  &nbsp;
                  {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'}
                  &nbsp;&nbsp;·
                </div>

                <div>&nbsp;&nbsp;{currSpot.numReviews} reviews&nbsp;&nbsp;·&nbsp;&nbsp;</div>
                <div className="spot-address" key={currSpot.name}>
                  {currSpot.city}, {currSpot.state}, {currSpot.country}
                </div>
              </div>

              <div className="all-images">
                <img className="big-image" alt="spot" src={currSpot.SpotImages[0]?.url}></img>
              </div>
            </div>
            <div className="middle-spot-items">
              <div>
                <div className="spot-hosted">
                  <div className="hosted-by"> Spot hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}</div>
                  {/* {console.log(currSpot)} */}
                  <img className='hosted-pic' src="https://drive.google.com/uc?export=view&id=1p7ALHdhdZsKxbR6qaFb4Wd_rbqSy1DwI" alt="Meowbnb Default Profile"></img>
                </div>

                {/* <div className="check-in-super"> */}
                <div className="self-check-in">
                  <i className="fa-solid fa-door-open"></i>
                  <div className="check-in">
                    <strong> Self check-in </strong>
                    <div>
                      Check yourself in with the lockbox.
                    </div>
                  </div>
                </div>

                <div className="self-check-in" id="super">
                  <i class="fa-regular fa-id-badge"></i>
                  <div className="superhost">
                    <strong> {currSpot.Owner.firstName} is a Superhost </strong>
                    <div> Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                  </div>
                </div>
                {/* </div> */}

                <div className="aircover-parent">
                  <img className="aircover-pic" src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" />
                  <div className="aircover-des">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                </div>
                <div>
                  <div className="spot-description">
                    {currSpot.description}
                  </div>
                </div>
              </div>

              <div className="spot-price-mother">
                <div className="spot-price">
                  <div className="spot-price-child">
                    <strong className="price-per-night">
                      ${currSpot.price}
                    </strong>
                    &nbsp;/&nbsp;night
                  </div>
                  {allowReviewAction &&
                    <div className='review-this-spot'>
                      <NavLink className="review-click"
                        to={`/spots/${currSpot.id}/review`}>
                        Review This Spot
                      </NavLink>
                    </div>
                  }
                  {!allowReviewAction && sessionUser && !alreadyReviewed &&
                    <div className='review-this-spot'>
                      <NavLink className="review-click"
                        to="/spots/my-spots">
                        Manage My Spot
                      </NavLink>
                    </div>
                  }
                  {alreadyReviewed &&
                    <div className='review-this-spot'>
                      <NavLink className="review-click"
                        to="/spots/my-reviews">
                        Manage My Reviews
                      </NavLink>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        }
        <div className="review-star-foot">

          <div className="stars-n-review">★ {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'} · {currSpot.numReviews} reviews</div>
        </div>
        <div className="single-spot-parent">
          {/* {console.log("AVG RATING FOR CURR SPOT", currSpot.avgStarRating)} */}

          <div className="reviews-wrapper">
            {allReviewsArr?.map((review) => (
              <div className='reviews' key={review.id}>
                <div>
                  <div className="profile-name">
                    <img className='user-profile-pic' src="https://drive.google.com/uc?export=view&id=1e6AIQpUAr0_HcNJNaptcQAHEdO5aib5k" alt="Meowbnb Default Profile"></img>
                    <div className="review-name-date">
                      <strong className="review-username">
                        {review.User.firstName} {review.User.lastName}
                      </strong>
                      <div className='user-review-date'>
                        {new Date(review.createdAt).toDateString().split(' ').slice(1).join(' ')}
                      </div>
                    </div>




                  </div>
                </div>
                <div className="review-message">
                  "{review?.review}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default SingleSpotBrowser
