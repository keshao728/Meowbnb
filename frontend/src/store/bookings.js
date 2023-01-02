import { csrfFetch } from "./csrf"

const ADD_BOOKING = "bookings/ADD_BOOKING"
const LOAD_ALL_BOOKING = "bookings/LOAD_ALL_BOOKING"
const LOAD_USER_BOOKING = "bookings/LOAD_USER_BOOKING"
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING"
const DELETE_BOOKING = "bookings/DELETE_BOOKING"

//ACTIONS-------------
const addBookingAction = (newBooking) => ({
  type: ADD_BOOKING,
  newBooking
})

const loadAllBookingAction = (allBooking) => ({
  type: LOAD_ALL_BOOKING,
  allBooking
})

const loadUserBookingAction = (userBooking) => ({
  type: LOAD_USER_BOOKING,
  userBooking
})

const updateBookingAction = (updatedBooking) => ({
  type: UPDATE_BOOKING,
  updatedBooking
})

const deleteBookingAction = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId
})

//THUNK-----------------
export const addBookingThunk = (spotId, added) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(added)
  })
  if (response.ok) {
    const newBooking = await response.json()
    dispatch(addBookingAction(newBooking))
    return newBooking
  }
}

export const loadAllBookingThunk = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
  if (response.ok) {
    const allBooking = await response.json()
    dispatch(loadAllBookingAction(allBooking))
    return allBooking
  }
}

export const loadUserBookingThunk = () => async dispatch => {
  const response = await csrfFetch(`/api/bookings/current`)
  if (response.ok) {
    const userBooking = await response.json()
    dispatch(loadUserBookingAction(userBooking))
    return userBooking
  }
}

export const updateBookingThunk = (bookingId, updated) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updated)
  })
  if (response.ok) {
    const updatedBooking = await response.json()
    dispatch(updateBookingAction(updatedBooking))
    return updatedBooking
  }
}

export const deleteBookingThunk = (bookingId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  if (response.ok) {
    dispatch(deleteBookingAction(bookingId))
    return response
  }
}

//REDUCER----------------
const initialState = { user: {}, spot: {} }

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL_BOOKING:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      action.allBooking.forEach(booking => {
        newState.spot[booking.id] = booking
      })
      return newState
    case ADD_BOOKING:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      newState.user[action.newBooking.id] = action.newBooking
      return newState
    case LOAD_USER_BOOKING:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      action.userBooking.forEach(booking => {
        newState.user[booking.id] = booking
      })
      return newState
    case UPDATE_BOOKING:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      newState.user[action.updatedBooking.id] = action.updatedBooking
      return newState
    case DELETE_BOOKING:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      delete newState.user[action.bookingId]
      delete newState.spot[action.bookingId]
      return newState
    default:
      return state
  }
}

export default bookingsReducer
