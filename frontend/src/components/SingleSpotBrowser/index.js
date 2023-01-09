import { useEffect, useState, useRef, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, useHistory } from "react-router-dom"

import { getOneSpot } from "../../store/spots"
import { locationReviewsThunk } from "../../store/reviews"
import { addBookingThunk, loadAllBookingThunk, loadUserBookingThunk } from "../../store/bookings"

import BookingLoginModal from "./RedirectModal"
import ReviewFormModal from "../ReviewSpot/ReviewModal"

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import * as moment from 'moment';

import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SingleSpotBrowser.css'

const SingleSpotBrowser = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { spotId } = useParams()


  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)

  // const [startDate, setStartDate] = useState(addDays(new Date(), 1))
  // const [endDate, setEndDate] = useState(addDays(new Date(), 2))
  const [openCalender, setOpenCalender] = useState(false)

  const [dates, setDates] = useState(false)

  // const [range, setRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection'
  //   }
  // ])

  // const { mapIsLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  // })

  const ref = useRef(null)

  const sessionUser = useSelector(state => state.session.user)

  //SPOT
  const currSpot = useSelector(state => state.spots.singleSpot)
  const lat = currSpot?.lat
  const lng = currSpot?.lng
  const center = { lat: lat, lng: lng }

  //REVIEWS
  const allReviews = useSelector(state => state.reviews.spot);
  const allReviewsArr = Object.values(allReviews)

  let alreadyReviewed;
  if (sessionUser && allReviewsArr.length > 0) {
    alreadyReviewed = allReviewsArr.find(review => review.userId === sessionUser.id)
  }

  let allowReviewAction = false;
  if ((sessionUser) && (sessionUser.id !== currSpot.ownerId) && (!alreadyReviewed)) {
    allowReviewAction = true
  }


  // const disabledDates = () => {
  //   let disabledDates = []
  //   bookingArr.forEach(booking => {
  //     let start = new Date(booking.startDate)
  //     let start1 = start.setDate(start.getDate() + 1)

  //     let end = new Date(booking.endDate)
  //     let end1 = end.setDate(end.getDate() + 1)

  //     console.log("start", start1.toString())
  //     console.log("end", end1.toString())
  //     while (start <= end) {
  //       disabledDates.push(new Date(start))
  //       start.setDate(start.getDate() + 1)
  //     }
  //   })
  //   let final = disabledDates.map(date => moment(date).format('YYYY-MM-DD'))
  //   // let final = disabledDates.map(date => date.toString().split(' ').slice(1, 3).join(' '))
  //   // setDisabledTime(final)
  //   return final
  // }
  // console.log("disabledDates", disabledDates())

  //BOOKINGS
  const booking = useSelector(state => state.bookings.spot)
  const bookingArr = Object.values(booking)
  // console.log("bookingArr", bookingArr)
  useEffect(() => {
    dispatch(getOneSpot(spotId))
      .then(() => dispatch(locationReviewsThunk(spotId)))
      .then(() => dispatch(loadAllBookingThunk(spotId)))
      // .then(() => dispatch(loadUserBookingThunk()))
      // return (() => dispatch(resetData()))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  let currSpotBooked;
  if (bookingArr.length > 0) {
    currSpotBooked = bookingArr.filter(booking => booking.spotId === currSpot.id)
  }
  // console.log(currSpotBooked, "----------------------")


  let disabledDates = []
  currSpotBooked?.forEach(booking => {
    let start = new Date(booking.startDate)
    // let start1 = start.setDate(start.getDate() + 1)
    // console.log(start, "============================")

    let end = new Date(booking.endDate)
    // let end1 = end.setDate(end.getDate() + 1)

    while (start <= end) {
      disabledDates.push(new Date(start))
      start.setDate(start.getDate() + 1)
    }
    return disabledDates
  })

  // function dateChecker(number) {
  //   let bookedDates = disabledDates.map(date => date.toString().split(' ').slice(1, 4).join(' '))
  //   let newBookDate = addDays(new Date(), number).toString().split(' ').slice(1, 4).join(' ')

  //   let count = number + 1
  //   console.log("bookedDates", bookedDates)
  //   console.log("newBookDate", newBookDate)
  //   if (bookedDates.includes(newBookDate)) {
  //     count += 1
  //     console.log("THIS IS COUNT", count)
  //     dateChecker(count)
  //   }
  //   if (!bookedDates.includes(newBookDate)) {
  //     console.log("THIS IS SHIBA COUNT", count)
  //     console.log((new Date(), count), "MEOWMEOW")
  //     return addDays(new Date(), count)
  //   }
  //   // count += 1
  //   // console.log("THIS IS MAI COUNT", count)
  //   // return addDays(new Date(), count)
  //   // return
  // }

  // function dateChecker() {
  //   let bookedDates = disabledDates.map(date => date.toString().split(' ').slice(1, 4).join(' '))
  //   let newBookDate = addDays(new Date(), 0).toString().split(' ').slice(1, 4).join(' ')

  //   let count = 1
  //   console.log("bookedDates", bookedDates)
  //   console.log("newBookDate", newBookDate)
  //   if (bookedDates.includes(newBookDate)) {
  //     count += 1
  //     // newBookDate = addDays(newBookDate, 1)
  //     console.log("THIS IS COUNT", count)
  //   }
  //   console.log(addDays(new Date(), count), "MEOWMEOW")
  //   return addDays(new Date(), count)
  // }
  // console.log(dateChecker(),"SIMON HEHEHEHEH")



  function dateChecker(number) {
    let bookedDates = disabledDates.map(date => date.toString().split(' ').slice(1, 4).join(' '))
    let newBookDate = addDays(new Date(), number).toString().split(' ').slice(1, 4).join(' ')
    let count = number

    // console.log(bookedDates)
    console.log("bookedDates", bookedDates)

    if (!bookedDates.includes(newBookDate)) {
      console.log((new Date(), count), "MEOWMEOW")
      return addDays(new Date(), count)
    }


    console.log("newBookDate", newBookDate)
    count += 1

    return dateChecker(count)
  }

  // console.log(dateChecker(0),"-----------------------------------")

  const shibashakeit = dateChecker(1)
  const [startDate, setStartDate] = useState(shibashakeit)

  const [endDate, setEndDate] = useState(addDays(startDate, 1))
  // console.log(endDate, "ENDDATE")
  // const [startDate, setStartDate] = useState(dateChecker(0) ? dateChecker(0) : addDays(new Date(), 1))
  // const [endDate, setEndDate] = useState(dateChecker(1)  ? dateChecker(1) : addDays(new Date(), 2))
  // }

  console.log("startDate", startDate)
  console.log("endDate", endDate)
  // console.log("disabledDates", disabledDates)





  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }



  //BOOKING ERROR VALIDATION

  //CHECKING IF SELECTED DATE RANGE IS ALREADY BOOKED
  let clickedDates = []

  function unavaliableDates() {
    let start1 = new Date(startDate)

    let end1 = new Date(endDate)

    while (start1 <= end1) {
      clickedDates.push(new Date(start1))
      start1.setDate(start1.getDate() + 1)
    }
    return clickedDates
  }

  let unavaliableDateRange = disabledDates.map(date => date.toString().split(' ').slice(1, 4).join(' '))
  let selectedDateRange = unavaliableDates().map(date => date.toString().split(' ').slice(1, 4).join(' '))

  // console.log("clickedDates", selectedDateRange)
  // console.log("disabledDates", unavaliableDateRange)

  // console.log(unavaliableDateRange.some(date => selectedDateRange.includes(date)), "HAHAHHAHHHAHHA")


  useEffect(() => {
    const err = []
    setDates(unavaliableDateRange.some(date => selectedDateRange.includes(date)))

    if (dates) err.push("Please select a valid date range")
    if (startDate?.toString().split(' ').slice(1, 4).join(' ') === endDate?.toString().split(' ').slice(1, 4).join(' ')) err.push("Check out date must be at least a day after check in")
    if (!startDate) err.startDate = err.push('Please enter a start date')
    if (!endDate) err.endDate = err.push('Please enter a end date')

    setValidationErrors(err)
  }, [startDate, endDate, dates])


  function subractDays(startingDate, number) {
    return new Date(new Date(startDate).setDate(startingDate?.getDate() - number));
  }
  const minus15 = subractDays(startDate, 15).toString().split(' ').slice(1, 3).join(' ')

  //CLOSE CALENDER UPON CLICK
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

    setShowErrors(true)

    if (!validationErrors.length) {
      setShowErrors(false)
      const newBooking = {
        "startDate": startDate,
        "endDate": endDate,
      }

      let addedBooking = await dispatch(addBookingThunk(spotId, newBooking))
      await dispatch(loadAllBookingThunk(spotId))

      if (addedBooking) {
        setShowErrors(false)
        history.push(`/spots/trips`)
      }
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

              {currSpot.SpotImages[0]?.url && !currSpot.SpotImages[1]?.url && !currSpot.SpotImages[2]?.url && !currSpot.SpotImages[3]?.url && !currSpot.SpotImages[4]?.url &&
                <div className="all-images">
                  <img className="big-image one-image" alt="spot" src={currSpot.SpotImages[0]?.url ? currSpot.SpotImages[0]?.url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                </div>
              }
              {currSpot.SpotImages[0]?.url && currSpot.SpotImages[1]?.url && !currSpot.SpotImages[2]?.url && !currSpot.SpotImages[3]?.url && !currSpot.SpotImages[4]?.url &&
                <div className="all-images">
                  <div className="left-image">
                    <img className="big-image" alt="spot" src={currSpot.SpotImages[0]?.url ? currSpot.SpotImages[0].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                  <div className="right-3-image">
                    <img className="big-image-10" alt="spot" src={currSpot.SpotImages[1]?.url ? currSpot.SpotImages[1].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                </div>
              }
              {currSpot.SpotImages[0]?.url && currSpot.SpotImages[1]?.url && currSpot.SpotImages[2]?.url && !currSpot.SpotImages[3]?.url && !currSpot.SpotImages[4]?.url &&
                <div className="all-images">
                  <div className="left-image">
                    <img className="big-image" alt="spot" src={currSpot.SpotImages[0]?.url ? currSpot.SpotImages[0].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                  <div className="right-3-image">
                    <img className="big-image-8" alt="spot" src={currSpot.SpotImages[1]?.url ? currSpot.SpotImages[1].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                    <img className="big-image-9" alt="spot" src={currSpot.SpotImages[2]?.url ? currSpot.SpotImages[2].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                </div>
              }
              {currSpot.SpotImages[0]?.url && currSpot.SpotImages[1]?.url && currSpot.SpotImages[2]?.url && currSpot.SpotImages[3]?.url && !currSpot.SpotImages[4]?.url &&
                <div className="all-images">
                  <div className="left-image">
                    <img className="big-image" alt="spot" src={currSpot.SpotImages[0]?.url ? currSpot.SpotImages[0].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                  <div className="right-3-image">
                    <img className="big-image-5" alt="spot" src={currSpot.SpotImages[1]?.url ? currSpot.SpotImages[1].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                    <img className="big-image-6" alt="spot" src={currSpot.SpotImages[2]?.url ? currSpot.SpotImages[2].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                    <img className="big-image-7" alt="spot" src={currSpot.SpotImages[3]?.url ? currSpot.SpotImages[3].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                </div>
              }
              {currSpot.SpotImages[0]?.url && currSpot.SpotImages[1]?.url && currSpot.SpotImages[2]?.url && currSpot.SpotImages[3]?.url && currSpot.SpotImages[4]?.url &&
                <div className="all-images">
                  <div className="left-image">
                    <img className="big-image" alt="spot" src={currSpot.SpotImages[0]?.url ? currSpot.SpotImages[0].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                  <div className="middle-image">
                    <img className="big-image-1" alt="spot" src={currSpot.SpotImages[1]?.url ? currSpot.SpotImages[1].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                    <img className="big-image-2" alt="spot" src={currSpot.SpotImages[2]?.url ? currSpot.SpotImages[2].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                  <div className="right-image">
                    <img className="big-image-3" alt="spot" src={currSpot.SpotImages[3]?.url ? currSpot.SpotImages[3].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                    <img className="big-image-4" alt="spot" src={currSpot.SpotImages[4]?.url ? currSpot.SpotImages[4].url : 'https://imgur.com/WghnM0b.png'} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'}></img>
                  </div>
                </div>
              }
            </div>
            <div className="middle-spot-items">
              <div className="left-middle">
                <div className="spot-hosted">
                  <div className="hosted-by"> Spot hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}</div>
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
                <div className="spot-checkin">
                  <div className="spot-checkin-title">Select check-in date</div>
                  <div className="spot-checkin-des">Add your travel dates for exact pricing</div>
                  <div ref={ref}>
                    <DateRange
                      onChange={handleSelect}
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      rangeColors={["#222222", "#AFAFAF", "#222222"]}
                      // rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
                      ranges={[selectionRange]}
                      months={2}
                      minDate={addDays(new Date, 1)}
                      direction="horizontal"
                      className="booking-calendar-1"
                      disabledDates={disabledDates}

                    // disabledDays={[0, 6]}
                    />
                  </div>
                </div>
              </div>

              <div className="spot-price-mother">
                <div className="spot-price">
                  <div className="spot-price-child">
                    <strong className="price-per-night">
                      ${currSpot.price}
                    </strong>
                    <div className="price-per-night-1">
                      &nbsp;night
                    </div>
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
                    {showErrors && validationErrors.length ? (
                      <div className='error-wrap booking-error'>
                        <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                        {validationErrors.map((error) => (
                          <div className="error-message">{error}</div>
                        ))}
                      </div>
                    ) : null}
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
                            minDate={addDays(new Date, 1)}
                            direction="horizontal"
                            className="booking-calendar"
                            disabledDates={disabledDates}
                          />
                        }
                      </div>
                      {sessionUser ?
                        // <NavLink to={`/spots/trips`}>
                        <button className="button-create-booking" type="submit"> Reserve </button>
                        // </NavLink>
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
                </div>
              </div>
            </div>
          </div>
        }

        <div className="review-star-foot">
          <div className="stars-n-review"><i className="fa-solid fa-paw" /> {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'} · {currSpot.numReviews} reviews</div>
          {allowReviewAction &&
            <ReviewFormModal />
          }
          {!allowReviewAction && sessionUser && !alreadyReviewed &&
            <div className='review-this-spot'>
              <NavLink className="review-click"
                to="/spots/hosting">
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
          <div className="reviews-wrapper">
            {allReviewsArr?.map((review) => (
              <div className='reviews' key={review.id}>
                <div>
                  <div className="profile-name">
                    <img className='user-profile-pic' src="https://drive.google.com/uc?export=view&id=1e6AIQpUAr0_HcNJNaptcQAHEdO5aib5k" alt="Meowbnb Default Profile"></img>
                    <div className="review-name-date">
                      <strong className="review-username">
                        {review?.User?.firstName} {review?.User?.lastName}
                      </strong>
                      <div className='user-review-date'>
                        {new Date(review?.createdAt).toDateString().split(' ').slice(1).join(' ')}
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

          <div className="map-wrapper-single">
            <div className="map-title">Where you'll be</div>
            <div className="spot-address-1" key={currSpot.name}>
              {currSpot.city}, {currSpot.state}, {currSpot.country}
            </div>
            <GoogleMap
              zoom={10}
              center={center}
              options={{
                disableDefaultUI: true,
              }}
              mapContainerClassName="map-container"
            >
              <Marker position={center} />
            </GoogleMap>
          </div>
          <div className="spot-know-wrapper">
            <div className="spot-know-title">Things to know</div>
            <div className="spot-know-individual-wrap">
              <div className="spot-know-individual">
                <div className="spot-know-individual-title">House rules</div>
                <div className="spot-know-items">
                  <div>Check-in after 3:00 PM</div>
                  <div>Checkout before 12:00 PM</div>
                </div>
              </div>
              <div className="spot-know-individual">
                <div className="spot-know-individual-title">Safety & property</div>
                <div className="spot-know-items">
                  <div>House rules</div>
                  <div>Carbon monoxide alarm</div>
                  <div>Smoke alarm</div>
                </div>
              </div>
              <div className="spot-know-individual">
                <div className="spot-know-individual-title">Cancellation policy</div>
                <div className="spot-know-items">
                  <div>Free cancellation before 3:00 PM on {minus15}.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer">
          <div className="footer-left">
            <div>© 2023 Meowbnb, Inc. &nbsp;&nbsp;·&nbsp;&nbsp;</div>
            <a className="proj-directory" href="https://github.com/keshao728/Varorant" target="_blank" rel="noreferrer">
              Project Github
            </a>
          </div>
          <div className="dev-socials">
            <div className="dev-socials-links">
              <a href="https://github.com/keshao728" className="dev-link" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i></a>
            </div>

            <div className="dev-socials-links">
              <a href="https://www.linkedin.com/in/keyingshao/" className="dev-link" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SingleSpotBrowser
