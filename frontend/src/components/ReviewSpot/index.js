import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect, useParams } from "react-router-dom"
import { addReview, locationReviewsThunk } from "../../store/reviews"
import { getOneSpot } from "../../store/spots"
import "./ReviewSpot.css"

const ReviewSpot = ({ setShowModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  // const spot = useSelector(state => state.spots.singleSpot)
  const currSpot = useSelector(state => state.spots.singleSpot)

  console.log("currSpot", currSpot)
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)
  const [hover, setHover] = useState(0)
  // const [selectStar, setSelectStar] = useState(4)

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)


  useEffect(() => {
    const errors = []
    if (!review || review.length < 5 || review.length > 200) errors.push('Please enter more than 5 characters and less than 200 characters')
    if (!stars || !Number(stars)) errors.push("Please enter a valid rating between 1 to 5 stars")

    setValidationErrors(errors)
  }, [review])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true)

    if (!validationErrors.length) {
      const newReview = {
        review,
        stars
      }

      let createdReview = await dispatch(addReview(spotId, newReview))
      if (createdReview) {
        setShowErrors(false)
        setShowModal(false)
        // history.push(`/spots/${spotId}`);
      }
      await dispatch(locationReviewsThunk(spotId))
      await dispatch(getOneSpot(spotId))

      return validationErrors
    }
  }

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    setShowModal(false);
  }

  return (
    <div className="review-full-host-form">
      <div className="login-title-wrap">
        <div className="login-title">
          <div className="login-close" onClick={handleCancel}>x</div>
          <div className="login-title-item"> Review </div>
          <div></div>
        </div>
      </div>
      <form className="host-form-parent" onSubmit={handleSubmit}>
        <h3 className="host-message">How was your stay at {currSpot.name}?</h3>
        {showErrors &&
          <ul className="form-errors">
            {validationErrors.length > 0 &&
              validationErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
          </ul>
        }
        <div className="review-spot-host-form">
          <div className="rate-stay">
            <img className="review-image" alt="spot" src={currSpot.SpotImages[0]?.url}></img>
            <div>Rate your stay at {currSpot.Owner.firstName}'s place</div>
          </div>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  id="star-button"
                  key={index}
                  className={index <= (hover || stars) ? "on" : "off"}
                  onClick={() => setStars(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(stars)}
                >
                  <i class="fa-solid fa-paw"></i>
                </button>
              );
            })}
          </div>
          <div className="review-textarea-wrap">
            <label className="review-label">Tell the next guests what you loved and anything else they should know about {currSpot.Owner.firstName}'s place: </label>
            <textarea
              placeholder="Write a public review"
              type="text"
              className="review-input"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            // required
            />
          </div>

          {/* <div className='star-rating'>
            <label className="stars-box">
              ★&nbsp;<input
                type='number'
                min='1' max='5'
                step="1"
                placeholder='stars'
                value={stars}
                onChange={e => setStars(e.target.value)}>
              </input>
            </label>
          </div> */}
        <button className="button-create-review" type="submit"> Add Review</button>
        </div>
        {/* <button type="button" className="button-create-spot" onClick={handleCancel}>Cancel</button> */}
      </form>
    </div>
  )
}
export default ReviewSpot
