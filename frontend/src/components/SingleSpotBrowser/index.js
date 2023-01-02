import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import { locationReviewsThunk } from "../../store/reviews"
import { addBookingThunk, loadAllBookingThunk } from "../../store/bookings"
import BookingLoginModal from "./RedirectModal"

import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import format from 'date-fns/format'


import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SingleSpotBrowser.css'
import ReviewFormModal from "../ReviewSpot/ReviewModal"

const SingleSpotBrowser = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { spotId } = useParams()
  // const [range, setRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection'
  //   }
  // ])

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(addDays(new Date(), 1))

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }


  const ref = useRef(null)

  const [openCalender, setOpenCalender] = useState(false)

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const sessionUser = useSelector(state => state.session.user)

  //SPOT
  const currSpot = useSelector(state => state.spots.singleSpot)

  //REVIEWS
  const allReviews = useSelector(state => state.reviews.spot);
  const allReviewsArr = Object.values(allReviews)

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  // const bookingStartDate = (ranges) => {
  //   setStartDate(ranges.selection.startDate)
  // }
  // const bookingEndDate = (ranges) => {
  //   setEndDate(ranges.selection.endDate)
  // }

  useEffect(() => {
    dispatch(getOneSpot(spotId))
      .then(() => dispatch(locationReviewsThunk(spotId)))
      // .then(() => dispatch(loadAllBookingThunk(spotId)))
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

  //BOOKING ERROR VALIDATION
  const validateBooking = () => {
    let err = {}
    // if (!range.startDate) err.range.startDate = 'Please enter a valid start date'
    // if (!range.endDate) err.range.endDate = 'Please enter a valid end date'
    setErrors(err)
    if (Object.values(err).length) {
      setShowErrors(true)
      return false
    }
    return err
  }

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  const hideOnClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpenCalender(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let err = validateBooking()
    if (Object.values(err).length > 0) {
      setShowErrors(true)
      return
    }
    if (!Object.values(err).length) {
      const newBooking = {
        "startDate": startDate,
        "endDate": endDate,
      }
      let createdBooking = await dispatch(addBookingThunk(spotId, newBooking))
      setShowErrors(false)
      // history.push(`/bookings/current`)
      return errors
    }
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
              <div className="left-middle">
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
                  <div className="spot-sticky-review">
                    <div className="spot-star">
                      <i className="fa-solid fa-paw" id="spot-star-paw"></i>
                      &nbsp;
                      {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'}
                      &nbsp;·
                    </div>
                    <div>&nbsp;{currSpot.numReviews} reviews</div>
                  </div>
                  <div className="booking-wrapper">
                    <form onSubmit={handleSubmit} className="booking-form">
                      <div className="booking-input-wrap">
                        <div className="booking-individual-input">
                          <input
                            value={`${format(startDate, "M/dd/yyyy")}`}
                            readOnly
                            className="booking-input booking-1"
                            placeholder="Add date"
                            onClick={() => setOpenCalender(openCalender => !openCalender)}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <label className="booking-label">CHECK-IN</label>
                        </div>
                        <div className="booking-individual-input">
                          <input
                            value={`${format(endDate, "M/dd/yyyy")}`}
                            readOnly
                            placeholder="Add date"
                            className="booking-input booking-2"
                            onClick={() => setOpenCalender(openCalender => !openCalender)}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                          <label className="booking-label">CHECKOUT</label>
                        </div>
                      </div>
                      <div ref={ref}>
                        {openCalender &&
                          <DateRange
                            onChange={handleSelect}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            rangeColors={["#222222", "#AFAFAF", "#222222"]}
                            // rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
                            ranges={[selectionRange]}
                            months={2}
                            minDate={new Date()}
                            direction="horizontal"
                            className="booking-calendar"
                          />
                        }
                      </div>
                      {sessionUser ?
                        <button className="button-create-booking" type="submit"> Reserve </button>
                        : <BookingLoginModal />
                      }

                    </form>
                    <div className="booking-des"> You won't be charged yet </div>
                    <div className="booking-fee-wrap">
                      <div className="booking-individual-fee">
                        <div> ${currSpot.price} x {((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 23)).toFixed()} night </div>
                        <div> ${currSpot.price * ((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 23)).toFixed()}  </div>
                      </div>
                      <div className="booking-individual-fee">
                        <div> Cleaning fee</div>
                        <div> $150 </div>
                      </div>
                      <div className="booking-individual-fee">
                        <div>Service fee</div>
                        <div> $71 </div>
                      </div>
                      <div className="booking-individual-fee booking-fee-total">
                        <div> Total before taxes </div>
                        <div> ${currSpot.price * ((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 23)).toFixed() + 150 + 71} </div>
                      </div>
                    </div>
                  </div>

                  {/* {allowReviewAction &&
                    <div className='review-this-spot'>
                      <NavLink className="review-click"
                        to={`/spots/${currSpot.id}/review`}>
                        Review This Spot
                      </NavLink>
                    </div>
                  } */}
                  {/* {!allowReviewAction && sessionUser && !alreadyReviewed &&
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
                  } */}
                </div>
                {/* <div className="MT"></div> */}
              </div>
            </div>
          </div>
        }
        <div className="review-star-foot">
          <div className="stars-n-review"><i className="fa-solid fa-paw" /> {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'} · {currSpot.numReviews} reviews</div>
          {allowReviewAction &&
            // <div className='review-this-spot'>
            //   <NavLink className="review-click"
            //     to={`/spots/${currSpot.id}/review`}>
            //     Review This Spot
            //   </NavLink>
            // </div>
            <ReviewFormModal />
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
