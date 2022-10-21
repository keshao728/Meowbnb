import React from "react"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
// import { resetData } from "../../store/reviews"
import { deleteReview } from "../../store/reviews"
import '../UserReview/UserReview.css'

const UserReviewCard = ({ review }) => {
  const dispatch = useDispatch()

  const handleDelete = async (e) => {
    e.preventDefault()

    await dispatch(deleteReview(review.id))
    // .then(setIsLoaded(false))
  }

  return (
    <div className="review-child">
      <div className='review-item' key={review.id}>
        <div className='review-item-name'>
          <NavLink className='review-link'
            key={review?.Spot?.id}
            to={`/spots/${review?.Spot?.id}`}>
            <div className="location-name">
              {review?.Spot?.name}
            </div>

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

              <span className="review-spot-star">
                <i className="fa-solid fa-paw"> </i>
                &nbsp;
                <div className='review-item-stars'>{Number(review?.stars).toFixed(2)}</div>
              </span>
            </div>

            <div>
              <button className='review-delete'
                onClick={handleDelete}>
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default UserReviewCard
