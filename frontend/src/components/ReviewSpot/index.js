import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect, useParams } from "react-router-dom"
import { addReview,userReviewsThunk } from "../../store/reviews"

const ReviewSpot = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  // const spot = useSelector(state => state.spots.singleSpot)
  // const { spotId } = useParams()


  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  // const [selectStar, setSelectStar] = useState(0)

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)

  useEffect(() => {
    dispatch(userReviewsThunk())
    const errors = []
    if (!review || review.length < 5) errors.push('Please enter more than 5 characters')
    setValidationErrors(errors)
  }, [review])


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true)
    if (!validationErrors.length) {

      const newReview = {
        review,
        stars
      }


      const createdReview = dispatch(addReview(newReview))

      // if (createdReview) {
      //   history.push(`/spots/${spotId}`)
      // }
    }
  }

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    history.push("/spots/my-spots")
  }

  return (
    <div className="full-host-form">
      <form className="host-form-parent" onSubmit={handleSubmit}>
        {/* <ul> */}
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        {/* </ul> */}
        <h3 className="host-message">Add a Review Meow!!!</h3>
        {showErrors &&
          <ul className="form-errors">
            {validationErrors.length > 0 &&
              validationErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
          </ul>
        }
        <div className="host-form">
          <label>
            <textarea
              placeholder="How was your experience?"
              type="text"
              className="review-input"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
          {/* <label>
            <input
              placeholder="City"
              type="text"
              className="host-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label> */}
        </div>
        <button className="button-create-spot" type="submit"> Add Review</button>
        <button type="button" className="button-create-spot" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}
export default ReviewSpot
