import { useEffect, useState } from "react"
import { NavLink, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userReviewsThunk, deleteReview } from "../../store/reviews"
// import './OwnerReviews.css'

const UserReviews = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const existingReviews = useSelector(state => state.reviews.user)
  // console.log("THIS IS A TEST IN USERREVIEW", existingReviews)

  // const spotId = existingReviews[0].spotId
  // console.log("USER SPOT ID JUNDKAJADJKAWNDK", spotId)

  const existingReviewArr = Object.values(existingReviews)
  console.log("THIS IS A REVIEWARR IN USERREVIEW", existingReviewArr)

  // const spotId = existingReviews.User

  // const spotData = reviewData.Spot


  useEffect(() => {
    dispatch(userReviewsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  // const deleteMyReview = async (reviewId) => {
  //   await dispatch(deleteReview(reviewId))
  // }

  // if (existingReviewArr.review.length < 0) {
  //   return <h2>no reviws</h2>
  // }

  if (!sessionUser) {
    return <Redirect to='/' />
  }


  return isLoaded && (
    <div>
      <h2 className="user-spot-message">Manage Your Reviews</h2>
      {existingReviewArr < 1 && <h2 className="no-spot"> MEOWMEOW No Reviews! </h2>}
      <div>
        {existingReviewArr?.map((review) => (
          <div className='review-item' key={review.id}>
            <div className='review-item-name'>
              <NavLink className='review-link'
                key={review?.Spot?.id}
                to={`/spots/${review?.Spot?.id}`}>
                {review?.Spot?.name}

                <div>
                  <img className="user-spot-image"
                    key={review?.Spot?.previewImage}
                    src={review?.Spot?.previewImage}
                    alt={review?.Spot?.previewImage} />
                </div>

                <div className='user-review-date'>
                  Reviewed on {new Date(review.createdAt).toDateString()}
                </div>

                <div className='user-review-location'>
                  {review?.Spot?.city},
                  {review?.Spot?.state}
                </div>

              </NavLink>
            </div>

            <div className="review-stars">
              My review: {review?.review}

              <span className="spot-star">
                <i className="fa-solid fa-star"></i>
                &nbsp;
                <div className='review-item-stars'>{review?.stars}</div>
              </span>
            </div>

            <div>
              <button className='review-delete' onClick={() => dispatch(deleteReview(review.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserReviews
