import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom";

import { loadUserBookingThunk, deleteBookingThunk } from "../../store/bookings"
import * as moment from 'moment';
import "./bookings.css"

const UserBookings = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const bookings = useSelector(state => state.bookings.user)
  const bookingsArr = Object.values(bookings)
  console.log("this is bookingsArr", bookingsArr)

  useEffect(() => {
    dispatch(loadUserBookingThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])




  if (!sessionUser) {
    return <Redirect to="/" />
  }

  return isLoaded && (
    <div className="user-booking-wrapper">
      <div className="booking-container">
        <div className="user-booking-title">Trips</div>
        {bookingsArr.length ?
          <div className="user-booking-des">Upcoming reservations</div> :
          <div className="no-booking-wrapper">
            <div className="no-booking-left">
              <img className="no-booking-wave" src="https://imgur.com/qBkxBRR.png" />
              <div className="no-booking-texts">
                <div className="no-booking-title">
                  No trips booked...yet!
                </div>
                <div className="no-booking-des">Time to dust off your bags and start planning your next adventure</div>
              </div>
              <NavLink to="/" className="user-booking-link">
                <button className="no-booking-button">Start searching</button>
              </NavLink>
            </div>
            <div className="no-booking-right">
              <img className="no-booking-img" src="https://imgur.com/gIMSpLk.png" />
            </div>
          </div>
        }

        <div className="individual-bookings-wrapper">


          {bookingsArr?.map((booking) => (

            <div className="user-booking-wrapper-1">
              <NavLink to={`/spots/${booking.spotId}`} className="individual-booking">

                <div className="individual-booking-left">
                  <div className="booking-left-top">
                    <div className="booking-name">{booking?.Spot?.name}</div>
                  </div>

                  <div className="booking-left-bottom">

                    <div className="booking-dates">
                      {moment(booking.startDate).format('YYYY') === moment(booking.endDate).format('YYYY') && moment(booking.startDate).format('MMM') === moment(booking.endDate).format('MMM') ?
                        <div className="bookding-individual-dates">
                          <div>
                            {moment(booking.startDate).format('MMM')}
                          </div>
                          <div className="booking-specific-date">
                            <div>
                              {moment(booking.startDate).format('D')}
                            </div>
                            -
                            <div>
                              {moment(booking.endDate).format('D')}
                            </div>
                          </div>
                          <div className="booking-specific-yr">
                            {moment(booking.endDate).format('YYYY')}
                          </div>
                        </div> :
                        moment(booking.startDate).format('YYYY') === moment(booking.endDate).format('YYYY') ?
                          <div className="bookding-individual-dates">
                            <div className="booking-specific-date">
                              <div>
                                {moment(booking.startDate).format('MMM D')} -
                              </div>
                              <div>
                                {moment(booking.endDate).format('MMM D')}
                              </div>
                            </div>
                            <div className="booking-specific-yr">
                              {moment(booking.endDate).format('YYYY')}
                            </div>
                          </div> :
                          <div className="bookding-individual-dates">
                            <div className="booking-specific-date">
                              <div>
                                {moment(booking.startDate).format('MMM D YYYY')} -
                              </div>
                              <div>
                                {moment(booking.endDate).format('MMM D YYYY')}
                              </div>
                            </div>
                          </div>
                      }
                    </div>
                    <div className="booking-address-wrapper">
                      <div className="booking-address-container">
                        <div>
                          {booking?.Spot?.address}
                        </div>
                        <div className="booking-specific-city-state">
                          <div>
                            {booking?.Spot?.city},
                          </div>
                          <div>
                            {booking?.Spot?.state}
                          </div>
                        </div>
                        <div className="booking-specific-country">
                          {booking?.Spot?.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="individual-booking-right">
                  <img className="booking-img" src={booking?.Spot?.previewImage} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                  <div className="booking-upcoming-days">{new moment().to(moment(booking?.startDate))}</div>
                </div>


              </NavLink>
              <div>
                <button className="delete-booking-button"
                  onClick={() => dispatch(deleteBookingThunk(booking.id))}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
export default UserBookings
