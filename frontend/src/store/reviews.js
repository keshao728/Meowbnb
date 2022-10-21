import { csrfFetch } from "./csrf"
import { getAllSpots } from "./spots"

const ADD_REVIEW = "spots/ADD_REVIEW"
const LOAD_LOCATION_REVIEW = "LOAD_LOCATION_REVIEW"
const DELETE_REVIEW = "spots/DELETE_REVIEW"
const LOAD_USER_REVIEW = "spots/LOAD_USER_REVIEWS"

//ACTIONS-------------
const addOneReview = (addTheReview) => ({
  type: ADD_REVIEW,
  addTheReview
})

const loadLocationReviews = (locationReview) => ({
  type: LOAD_LOCATION_REVIEW,
  locationReview
})

export function loadUserReviews(userReview) {
  return {
    type: LOAD_USER_REVIEW,
    userReview
  }
}

const deleteOneReview = (deleteTheReview) => ({
  type: DELETE_REVIEW,
  deleteTheReview
})

//THUNK-----------------
export const addReview = (spotId, added) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(added)
  })
  if (response.ok) {
    const newReview = await response.json()
    dispatch(addOneReview(newReview))
    return newReview
  }
}

export const locationReviewsThunk = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`)
  console.log("LOCATION REVIEW THUNK", response)
  if (response.ok) {
    const existingReviews = await response.json()
    console.log("THISIS EXISTING REVIEW IN THUNK", existingReviews)
    dispatch(loadLocationReviews(existingReviews))
    return existingReviews
  }
}

export const userReviewsThunk = () => async dispatch => {
  let res = await csrfFetch(`/api/reviews/current`)
  if (res.ok) {
    let userReview = await res.json()
    dispatch(loadUserReviews(userReview.Reviews))
    return userReview
  }
}


export const deleteReview = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${spotId}`, {
    method: 'DELETE'
  });

  await response.json();
  dispatch(deleteOneReview(spotId));
}

//REDUCER
const initialState = { user: {}, spot: {} }

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_LOCATION_REVIEW:
      let newAllReviewObject = {}
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }

      action.locationReview.Reviews.forEach((review) => {
        newAllReviewObject[review.id] = review
      })

      newState.spot = newAllReviewObject
      //   // console.log("this is REVIEW REDUCER FOR LOAD REVIEW", newState)
      //   // newState = newAllReviewObject
      return newState;

    case LOAD_USER_REVIEW:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      // action.userReview.Reviews.forEach((review) => {
      //   newState.spot[review.id] = review
      // })
      newState.user = action.userReview
      return newState;

    case ADD_REVIEW:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      newState.spot[action.addTheReview.id] = action.addTheReview
      newState.user = action.addTheReview
      return newState


    case DELETE_REVIEW:
      newState = {
        ...state,
        user: { ...state.user },
        spot: { ...state.spot }
      }
      delete newState.spot[action.deleteTheReview]
      newState.user = {}
      return newState

    default:
      return state
  }
}

export default reviewReducer;
