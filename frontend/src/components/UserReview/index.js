import { useEffect, useState } from "react"
import { NavLink, Redirect, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userReviewsThunk, deleteReview } from "../../store/reviews"
import * as moment from 'moment';
import "../UserSpots/UserSpots.css"
import "./UserReview.css"

const UserReviews = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  // const {Id} = useParams()
  const sessionUser = useSelector(state => state.session.user)

  const existingReviews = useSelector(state => state.reviews.user)

  const existingReviewArr = Object.values(existingReviews)


  useEffect(() => {
    dispatch(userReviewsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])


  if (!sessionUser) {
    return <Redirect to='/' />
  }

  return (
    <div className="user-review-mother">
      <div className="message-review-mother">
        <div className="message-review-container">
          <div className="user-welcome-host">
            <div className="user-review-message">Welcome, {sessionUser.username}!</div>
          </div>

          {existingReviewArr && <div className="user-review-your-review">Your reviews</div>}
        </div>
      </div>
      <div className="review-mother">
        <div className="no-review-mother">
          {existingReviewArr < 1 && (<img className="no-review-meow" alt="no-review-meow" src="https://drive.google.com/uc?export=view&id=1j_TgRhozzklKVuQfq1OVo3eBRXGPai3K" title="Meowbnb logo" />)}
          {existingReviewArr < 1 && <h4 className="no-review"> No Reviews yet.. </h4>}
        </div>
        <div className="all-owned-review-wrapper">
          {existingReviewArr?.map((review) => (
            <div className="all-owned-review">
              <div className="all-owned-review-container">
                <NavLink className="user-review" to={`/spots/${review?.Spot?.id}`}>
                  <div className="user-review-container">
                    <div className="user-review-texts">
                      <div className="user-review-left">
                        <div className="user-review-middle">
                          <div className="user-review-name">{review?.Spot?.name}</div>
                          <div className="user-address-star" key={review?.Spot?.name}> {review?.Spot?.city},
                            {review?.Spot?.state}</div>
                        </div>



                      </div>

                      <div className="user-review-right">
                        <div>{moment(review.createdAt).fromNow()}</div>

                        <div className="user-review-rating">
                          <i className="fa-solid fa-paw"></i>
                          <div>
                            {review?.stars > 0 ? Number(review?.stars).toFixed(2) : 'New'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="user-reviews-wrap">
                    <div className="user-reviews">
                      "{review?.review}"
                    </div>
                  </div>
                </NavLink>

                <div className="user-review-buttons">
                  <button className="delete-edit"
                    onClick={() => dispatch(deleteReview(review.id))}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserReviews
