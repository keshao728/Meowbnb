import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, useHistory } from "react-router-dom"

import { getOneSpot } from "../../store/spots"
import { locationReviewsThunk } from "../../store/reviews"
import { addBookingThunk, loadAllBookingThunk } from "../../store/bookings"

import MeowCoverModal from "./MeowCoverModal"
import BookingLoginModal from "./RedirectModal"
import ReviewFormModal from "../ReviewSpot/ReviewModal"

import { MapStyle } from "../HostSpot/MapStyle"

import { GoogleMap, Marker } from "@react-google-maps/api"
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import * as moment from 'moment';

import format from 'date-fns/format'
import { HashLink as Link } from 'react-router-hash-link';


import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SingleSpotBrowser.css'

const SingleSpotBrowser = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(true)
  const { spotId } = useParams()


  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)

  const [displayBookings, setDisplayBookings] = useState(false)
  const [bookingNights, setBookingNights] = useState(0)

  // const [startDate, setStartDate] = useState(addDays(new Date(), 1))
  // const [endDate, setEndDate] = useState(addDays(new Date(), 2))
  const [openCalender, setOpenCalender] = useState(false)

  const [invalidDate, setInvalidDate] = useState(false)

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


  //NAV SCROLL
  const nav = document.getElementById('scroll-nav');

  window.addEventListener('scroll', () => {
    if (nav) {
      const top = window.scrollY > 680;
      if (top) {
        nav.className = 'scroll-nav';
      } else {
        nav.className = 'no-scroll-nav';
      }
    }
  });

  //SPOT
  const currSpot = useSelector(state => state.spots.singleSpot)
  const lat = currSpot?.lat
  const lng = currSpot?.lng
  const center = { lat: lat ? lat : 37.7749, lng: lng ? lng : -122.4194 }

  //AMENITIES
  const amenities = currSpot.amenities
  // console.log("amenities", amenities)

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

  const ownerBookingDisplay = () => {
    setDisplayBookings(!displayBookings)
  }


  //CONDITION FOR BOOKING ACTION
  let allowBookingAction = true;
  if (sessionUser) {
    if (sessionUser.id !== currSpot.ownerId) {
      allowBookingAction = false
    }
  } else {
    allowBookingAction = false
  }


  //CALL THUNKS
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


  //AN ARRAY OF DISABLED DATES FROM BOOKED SPOTS
  let disabledDates = []
  currSpotBooked?.forEach(booking => {
    let start = new Date(booking.startDate)
    let end = new Date(booking.endDate)

    // console.log(start, "start for disabled dates")
    // console.log(end, "end for disabled dates")

    while (start <= end) {
      disabledDates.push(new Date(start))
      start.setDate(start.getDate() + 1)
    }

    return disabledDates
  })


  //CHECK IF 'NUMBER' OF DAYS FROM TODAY IS AVALIABLE - USED FOR INITIAL DATE DISPLAY
  function dateChecker(number) {
    let bookedDates = disabledDates.map(date => date.toString().split(' ').slice(1, 4).join(' '))
    let newBookDate = addDays(new Date(), number).toString().split(' ').slice(1, 4).join(' ')
    // console.log("bookedDates", bookedDates)

    if (!bookedDates.includes(newBookDate)) {
      return addDays(new Date(), number)
    }
    // console.log("newBookDate", newBookDate)
    number += 1

    return dateChecker(number)
  }

  //DATE STATE + INITIAL DATE DISPLAY
  const calendarStartDate = dateChecker(1)
  const [startDate, setStartDate] = useState(calendarStartDate)

  const [endDate, setEndDate] = useState(addDays(startDate, 1))


  //CALENDAR SELECTOR
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  //FOR TEXT DISPLAY ON SELECTED DATES UPON CHANGE
  useEffect(() => {
    if (startDate && endDate) {
      setBookingNights(endDate?.getDate() - startDate?.getDate())
    }
  })


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

  useEffect(() => {
    const err = []
    setInvalidDate(unavaliableDateRange.some(invalidDate => selectedDateRange.includes(invalidDate)))

    if (invalidDate) err.push("Please select a valid date range")
    if (startDate?.toString().split(' ').slice(1, 4).join(' ') === endDate?.toString().split(' ').slice(1, 4).join(' ')) err.push("Check out date must be at least a day after check in")
    if (!startDate) err.startDate = err.push('Please enter a start date')
    if (!endDate) err.endDate = err.push('Please enter a end date')

    setValidationErrors(err)
  }, [startDate, endDate, invalidDate])


  //FOR 'CANCEL BEFORE [DATE]' TEXT
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


  //SUBMIT A BOOKING
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
          <div className="single-spot-parent" >
            <div className="top-spot" id="photos">
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
                {currSpot.numReviews === 1 ?
                  <Link
                    smooth to={`/spots/${currSpot.id}/#reviews`}
                    className="head-scroll-link"
                  >
                    <div>{currSpot.numReviews} review</div>
                  </Link> :
                  <Link
                    smooth to={`/spots/${currSpot.id}/#reviews`}
                    className="head-scroll-link"
                  >
                    <div>{currSpot.numReviews} reviews</div>
                  </Link>
                }
                <div className="spot-top-super">
                  ·&nbsp;&nbsp;
                  <img src="https://imgur.com/227Uv81.png" alt="spot" />
                  <div>Superhost </div>
                  &nbsp;&nbsp;
                </div>

                <div className="spot-address" key={currSpot.name}>
                  ·&nbsp;&nbsp;{currSpot.city}, {currSpot.state}, {currSpot.country}
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
                  <div className="hosted-by"> Spot hosted by {currSpot?.Owner?.firstName} {currSpot?.Owner?.lastName}</div>
                  <img className='hosted-pic' src="/images/meowbnb-host.png"  alt="Meowbnb Default Profile"></img>
                </div>

                {/* <div className="check-in-super"> */}
                <div className="self-check-in">
                  {/* <i className="fa-solid fa-door-open"></i> */}
                  <img className="check-in-img" src="https://imgur.com/Y8A5rKd.png" alt="spot" />
                  <div className="check-in">
                    <strong> Self check-in </strong>
                    <div className="check-in-des">
                      Check yourself in with the lockbox.
                    </div>
                  </div>
                </div>

                <div className="self-check-in" id="super">
                  {/* <i class="fa-regular fa-id-badge"></i> */}
                  <img className="check-in-img" src="https://imgur.com/5gPJvEp.png" alt="spot" />
                  <div className="superhost">
                    <strong> {currSpot?.Owner?.firstName} is a Superhost </strong>
                    <div className="check-in-des"> Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                  </div>
                </div>
                {/* </div> */}

                <div className="aircover-parent">
                  <img className="aircover-pic" src="https://imgur.com/0SJuCdh.png" alt="spot" />
                  {/* <img className="aircover-pic" src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" /> */}
                  <div className="aircover-des">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                  <div className="aircover-modal"><MeowCoverModal /></div>
                </div>

                <div>
                  <div className="spot-description" id="amenities">
                    {currSpot?.description}
                  </div>
                </div>

                {amenities &&
                  <div className="amenities-wrapper">
                    <div className="spot-checkin-title">What this place offers </div>
                    <div className="individual-amenities-wrapper">
                      {amenities.includes('Wifi') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/fHVWE9K.png" alt="spot" />
                          <div className="individual-amenities-title">Wifi</div>
                        </div>
                      }
                      {amenities.includes('TV') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/csXC3RL.png" alt="spot" />
                          <div className="individual-amenities-title">TV</div>
                        </div>
                      }
                      {amenities.includes('Kitchen') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/uwD4CGY.png" alt="spot" />
                          <div className="individual-amenities-title">Kitchen</div>
                        </div>
                      }
                      {amenities.includes('Washer') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/Xluxljd.png" alt="spot" />
                          <div className="individual-amenities-title">Washer</div>
                        </div>
                      }
                      {amenities.includes('Free parking on premises') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/z2lA5yX.png" alt="spot" />
                          <div className="individual-amenities-title">Free parking on premises</div>
                        </div>
                      }
                      {amenities.includes('Paid parking on premises') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/nARtwQZ.png" alt="spot" />
                          <div className="individual-amenities-title">Paid parking on premises</div>
                        </div>
                      }
                      {amenities.includes('Air conditioning') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/cHR1Rxx.png" alt="spot" />
                          <div className="individual-amenities-title">Air conditioning</div>
                        </div>
                      }
                      {amenities.includes('Dedicated workspace') &&
                        <div className="individual-amenities-container">
                          <img className="individual-amenities-img" src="https://imgur.com/7iFsb5g.png" alt="spot" />
                          <div className="individual-amenities-title">Dedicated workspace</div>
                        </div>
                      }
                    </div>
                  </div>
                }


                {!allowBookingAction &&
                  <div className="spot-checkin">
                    {bookingNights === 1 ?
                      <div className="spot-checkin-title">{bookingNights} night </div> :
                      bookingNights > 1 ?
                        <div className="spot-checkin-title">{bookingNights} nights </div> :
                        <div className="spot-checkin-title">Select dates</div>
                    }
                    {bookingNights ?
                      <div className="spot-checkin-des">
                        {moment(startDate).format('MMM D, YYYY')} - {moment(endDate).format('MMM D, YYYY')}
                      </div> :
                      <div className="spot-checkin-des"> Add your travel dates for exact pricing</div>
                    }
                    <div ref={ref} className="open-calendar-wrap" >
                      <DateRange
                        onChange={handleSelect}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        rangeColors={["#222222", "#AFAFAF", "#222222"]}
                        // rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
                        ranges={[selectionRange]}
                        months={2}
                        minDate={addDays(new Date(), 1)}
                        direction="horizontal"
                        className="booking-calendar-1"
                        disabledDates={disabledDates}
                      // disabledDays={[0, 6]}
                      />
                    </div>
                  </div>
                }
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
                    {currSpot.numReviews === 1 ?
                      <div>&nbsp;{currSpot.numReviews} review</div> :
                      <div>&nbsp;{currSpot.numReviews} reviews</div>
                    }
                  </div>
                  {!allowBookingAction ?
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
                        <div ref={ref} className="open-calendar-wrap">
                          {openCalender &&
                            <div className="open-calendar-wrap">
                              {bookingNights === 1 ?
                                <div className="booking-nights">{bookingNights} night </div> :
                                bookingNights > 1 ?
                                  <div className="booking-nights">{bookingNights} nights </div> :
                                  <div className="booking-nights">Select dates</div>
                              }
                              {bookingNights ?
                                <div className="booking-dates-night">
                                  {moment(startDate).format('MMM D, YYYY')} - {moment(endDate).format('MMM D, YYYY')}
                                </div> :
                                <div className="booking-dates-night"> Add your travel dates for exact pricing</div>
                              }
                              <div className="spot-calendar-wrapper">
                                <div className="spot-calendar-container">
                                  <DateRange
                                    onChange={handleSelect}
                                    editableDateInputs={true}
                                    moveRangeOnFirstSelection={false}
                                    rangeColors={["#222222", "#AFAFAF", "#222222"]}
                                    // rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
                                    ranges={[selectionRange]}
                                    months={2}
                                    minDate={addDays(new Date(), 1)}
                                    direction="horizontal"
                                    className="booking-calendar"
                                    disabledDates={disabledDates}
                                  />
                                  {/* <button type="button" className="close-booking-calender" onClick={() => setStartDate()}> Clear dates </button> */}
                                  {bookingNights ?
                                    <div className="spot-booking-button">
                                      <button type="button" className="close-booking-calender" onClick={() => setOpenCalender(false)}> Confirm </button>
                                    </div> :
                                    <div className="spot-booking-button">
                                      <button type="button" className="close-booking-calender" onClick={() => setOpenCalender(false)}> Close </button>
                                    </div>
                                  }
                                </div>
                              </div>
                            </div>
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
                    :
                    <div className="owner-booking-wrapper">
                      <div className="owner-booking-buttons">
                        <div className="owner-booking-button" onClick={ownerBookingDisplay}> Display Bookings</div>
                        <NavLink className="owner-booking-button"
                          to="/spots/hosting">
                          Manage My Spot
                        </NavLink>
                      </div>
                      <div className="owner-booking-display-wrap" >
                        {displayBookings && currSpotBooked ?
                          <div className="owner-booking-display">
                            {currSpotBooked?.map((bookings) => (
                              <div className="owner-booking-container">
                                <div className="owner-booking-display-details owner-booking-details">
                                  <div>Guest name</div>
                                  <div>Booking dates</div>
                                </div>
                                <div className="owner-booking-display-details">
                                  <div>{bookings.User.firstName} {bookings.User.lastName}</div>
                                  <div>{moment(booking.startDate).format('MMM D YYYY')} - {moment(booking.endDate).format('MMM D YYYY')}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          : displayBookings ?
                            <div className="owner-booking-display"> Your spot currently has no bookings </div>
                            : null
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        }

        <div className="review-star-foot" id="reviews">
          {currSpot.numReviews === 1 ?
            <div className="stars-n-review"><i className="fa-solid fa-paw" /> {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'} · {currSpot.numReviews} review</div> :
            <div className="stars-n-review"><i className="fa-solid fa-paw" /> {currSpot.avgStarRating > 0 ? Number(currSpot.avgStarRating).toFixed(2) : 'New'} · {currSpot.numReviews} reviews</div>
          }
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
                    <img className='user-profile-pic' src="/images/meowbnb-profile.png" alt="Meowbnb Default Profile"></img>
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

          <div className="map-wrapper-single" id="location">
            <div className="map-title">Where you'll be</div>
            <div className="spot-address-1" key={currSpot.name}>
              {currSpot.city}, {currSpot.state}, {currSpot.country}
            </div>
            <GoogleMap
              zoom={14}
              center={center}
              options={{
                disableDefaultUI: true,
                styles: MapStyle,
              }}
              mapContainerClassName="map-container"
            >
              <Marker
                position={center}
                icon={'https://imgur.com/KSss7VS.png'}
              />
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

      <div id="scroll-nav">
        <div className="scroll-container">
          <Link
            smooth to={`/spots/${currSpot.id}/#photos`}
            className="scroll-link"
          >
            Photos
            <div className="scroll-line"></div>
          </Link>
          <Link
            smooth to={`/spots/${currSpot.id}/#amenities`}
            className="scroll-link"
          >
            Amenities
            <div className="scroll-line"></div>
          </Link>
          <Link
            smooth to={`/spots/${currSpot.id}/#reviews`}
            className="scroll-link"
          >
            Reviews
            <div className="scroll-line"></div>
          </Link>
          <Link
            smooth to={`/spots/${currSpot.id}/#location`}
            className="scroll-link"
          >
            Location
            <div className="scroll-line"></div>
          </Link>
        </div>
      </div>

      <div className="footer-wrapper">
        <div className="footer">
          <div className="footer-left">
            <div>© 2023 Meowbnb, Inc. &nbsp;&nbsp;·&nbsp;&nbsp;</div>
            <a className="proj-directory" href="https://github.com/keshao728/Meowbnb" target="_blank" rel="noreferrer">
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
    </div >

  )
}

export default SingleSpotBrowser
