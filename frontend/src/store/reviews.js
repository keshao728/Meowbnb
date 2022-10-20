import { csrfFetch } from "./csrf"

const ADD_REVIEW = "spots/ADD_REVIEW"
const LOAD_REVIEW = "spots/LOAD_REVIEW"
const DELETE_REVIEW = "spots/DELETE_REVIEW"

//ACTIONS-------------
const addOneReview = (addTheReview) => ({
  type: ADD_REVIEW,
  addTheReview
})

const loadAllReviews = (loadTheReview) => ({
  type: LOAD_REVIEW,
  loadTheReview
})

//delete
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

export const getReviews = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}/reviews`)

  if (response.ok) {
    const existingReviews = await response.json()
    dispatch(loadAllReviews(existingReviews))
    return existingReviews
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
const initialState = {}

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REVIEW: {
      let newAllReviewObject = {}
      newState = { ...state }
      action.loadTheReview.Reviews.forEach(review => {
        newAllReviewObject[review.id] = review
      })
      newState = newAllReviewObject
      return newState;
    }

    case ADD_REVIEW: {
      newState = { ...state }
      newState[action.addTheReview.id] = action.review
      return newState
    }

    case DELETE_REVIEW: {
      newState = { ...state }
      delete newState[action.deleteTheReview]
      return newState
    }
    default:
      return state
  }
}

export default reviewReducer;
