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

  useEffect(() => {
    dispatch(loadUserBookingThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  const sortedPastBookingArr = bookingsArr.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });
  const pastBookings = sortedPastBookingArr.filter(booking => {
    return new Date(booking.startDate) <= new Date();
  });

  const sortedBookingArr = bookingsArr.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  const upcomingBookings = sortedBookingArr.filter(booking => {
    return new Date(booking.startDate) > new Date();
  });


  if (!sessionUser) {
    return <Redirect to="/" />
  }

  return isLoaded && (
    <div className="user-booking-wrapper">
      <div className="booking-container">
        <div className="user-booking-title">Trips</div>
        {upcomingBookings.length ?
          <div className="user-booking-des">Upcoming reservations</div> :
          <div className="no-booking-wrapper">
            <div className="no-booking-left">
              <img className="no-booking-wave" src="https://imgur.com/qBkxBRR.png" alt="no booking" />
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
              <img className="no-booking-img" src="https://imgur.com/gIMSpLk.png" alt="no booking" />
            </div>
          </div>
        }

        <div className="individual-bookings-wrapper">


          {upcomingBookings?.map((booking) => (

            <div className="user-booking-wrapper-1">
              <NavLink to={`/spots/${booking.spotId}`} className="individual-booking">

                <div className="individual-booking-left">
                  <div className="booking-left-top">
                    <div className="booking-name">{booking?.Spot?.name}</div>
                  </div>

                  <div className="booking-left-bottom">

                    <div className="booking-dates">
                      {moment(booking.startDate).format('YYYY') === moment(booking.endDate).format('YYYY') && moment(booking.startDate).format('MMM') === moment(booking.endDate).format('MMM') ?
                        <div className="booking-individual-dates">
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
                          <div className="booking-individual-dates">
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
                          <div className="booking-individual-dates">
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
                  {/* {console.log(booking.Spot, "this is booking spot")} */}
                  <img className="booking-img" alt="preview" src={booking?.Spot?.previewImage} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
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

          <div className="past-booking-wrapper">
            <div className="past-booking-des">Where you've been</div>
            <div className="past-booking-individual-wrap">
              {pastBookings?.map((booking) => (
                <NavLink to={`/spots/${booking.spotId}`} className="past-booking-link">
                  <img className="past-booking-img" src={booking.Spot.previewImage} alt="preview" />
                  <div className="past-booking-info">
                    <div className="past-booking-name-city">
                      <div className="past-booking-name">{booking.Spot.name}</div>
                      <div className="past-booking-gray">at {booking.Spot.city}</div>
                    </div>
                    <div className="past-booking-gray">
                      {moment(booking.startDate).format('YYYY') === moment(booking.endDate).format('YYYY') && moment(booking.startDate).format('MMM') === moment(booking.endDate).format('MMM') ?
                        <div className="past-booking-individual-dates">
                          <div>
                            {moment(booking.startDate).format('MMM')}
                          </div>
                          <div className="past-booking-specific-date">
                            <div>
                              {moment(booking.startDate).format('D')}
                            </div>
                            -
                            <div>
                              {moment(booking.endDate).format('D')},
                            </div>
                          </div>
                          <div className="past-booking-specific-yr">
                            {moment(booking.endDate).format('YYYY')}
                          </div>
                        </div> :
                        moment(booking.startDate).format('YYYY') === moment(booking.endDate).format('YYYY') ?
                          <div className="past-booking-individual-dates">
                            <div className="past-booking-specific-date">
                              <div>
                                {moment(booking.startDate).format('MMM D')} -
                              </div>
                              <div>
                                {moment(booking.endDate).format('MMM D')}
                              </div>
                            </div>
                            <div className="past-booking-specific-yr">
                              {moment(booking.endDate).format('YYYY')}
                            </div>
                          </div> :
                          <div className="past-booking-individual-dates">
                            <div className="past-booking-specific-date">
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
                  </div>
                </NavLink>


              ))}
            </div>
















          </div>
        </div>
      </div>
    </div>

  )
}
export default UserBookings
