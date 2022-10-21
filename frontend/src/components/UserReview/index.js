import { useEffect, useState } from "react"
import { NavLink, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userReviewsThunk, deleteReview } from "../../store/reviews"
import './UserReview.css'

const UserReviews = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  const existingReviews = useSelector(state => state.reviews.user)
  // console.log("THIS IS A TEST IN USERREVIEW", existingReviews)
  const existingReviewArr = Object.values(existingReviews)
  // console.log("THIS IS A REVIEWARR IN USERREVIEW", existingReviewArr)

  // const spotId = existingReviews[0].spotId
  // console.log("USER SPOT ID JUNDKAJADJKAWNDK", spotId)

  // const spotId = existingReviews.User
  // const spotData = reviewData.Spot


  useEffect(() => {
    dispatch(userReviewsThunk())
      // window.location.reload()
      .then(() => setIsLoaded(true))
  }, [dispatch])

  // const deleteMyReview = async (reviewId) => {
  //   await dispatch(deleteReview(reviewId))
  //   window.location.reload()
  // }

  // if (existingReviewArr.review.length < 0) {
  //   return <h2>no reviws</h2>
  // }

  if (!sessionUser) {
    return <Redirect to='/' />
  }


  return isLoaded && (
    <div className="review-content">
      <h2 className="user-review-message">Manage Your Reviews Meow!!!</h2>
      {existingReviewArr < 1 && <h2 className="no-spot"> MEOWMEOW No Reviews! </h2>}
      <div className="review-mother">

        {existingReviewArr?.map((review) => (
          <div className="review-child">
            <div className='review-item' key={review.id}>
              <div className='review-item-name'>
                <NavLink className='review-link'
                  key={review?.Spot?.id}
                  to={`/spots/${review?.Spot?.id}`}>
                  <div className="location-name">

                    {review?.Spot?.name}
                  </div>

                  {/* <div>
                  <img className="user-spot-image"
                  key={review?.Spot?.previewImage}
                  src={review?.Spot?.previewImage}
                  alt={review?.Spot?.previewImage} />
                  {console.log(review.Spot)}
                </div> */}


                  <div className='user-review-location'>
                    {review?.Spot?.city},
                    {review?.Spot?.state}
                  </div>

                </NavLink>
                <div className="review-text">
                  {review?.review}
                </div>
              </div>


              <div className="right-review">

                <div>
                  <div className="review-stars-date">
                    <div className='user-review-date'>
                      {new Date(review.createdAt).toDateString().split(' ').slice(1).join(' ')}
                    </div>

                    <span className="spot-star">
                      <i class="fa-solid fa-paw"></i>
                      &nbsp;
                      <div className='review-item-stars'>{review?.stars}</div>
                    </span>
                  </div>

                  <div>
                    <button className='review-delete'
                      onClick={() => dispatch(deleteReview(review.id))}>
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default UserReviews
