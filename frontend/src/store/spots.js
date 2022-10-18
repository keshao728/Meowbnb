import { csrfFetch } from "./csrf"

const ADD_SPOT = "spots/ADD_SPOT"
const LOAD_ALL_SPOT = "spots/LOAD_ALL_SPOT"
const LOAD_ONE_SPOT = "spots/LOAD_ONE_SPOT"
const UPDATE_ONE_SPOT = "spots/UPDATE_ONE_SPOT"
const DELETE_ONE_SPOT = "spots/DELETE_ONE_SPOT"


//ACTIONS-------------
//create
const addSpot = (newSpot) => ({
  type: ADD_SPOT,
  newSpot
})

//read
const loadAllSpot = (allSpot) => ({
  type: LOAD_ALL_SPOT,
  allSpot
})
const loadOneSpot = (oneSpot) => ({
  type: LOAD_ONE_SPOT,
  oneSpot
})

//update
const updateOneSpot = (updatedSpot) => ({
  type: UPDATE_ONE_SPOT,
  updatedSpot
})

//delete
const deleteOneSpot = () => ({
  type: DELETE_ONE_SPOT
})


//THUNK-----------------
//create
export const addOneSpot = (added) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(added)
  })
  if (response.ok) {
    const newSpot = await response.json()
    dispatch(addSpot(newSpot))
    return newSpot
  }
}

//read
export const getAllSpots = () => async dispatch => {
  const response = await fetch('/api/spots')

  if (response.ok) {
    const allSpot = await response.json()
    console.log('sssssssssssssssssssssssssssss', allSpot)
    dispatch(loadAllSpot(allSpot))
  }
}

export const getOneSpots = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)

  if (response.ok) {
    const oneSpot = await response.json()
    dispatch(loadOneSpot(oneSpot))
  }
}

//update
export const updateSpot = (updated, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updated)
  })
  if (response.ok) {
    const updatedSpot = await response.json()
    dispatch(updateOneSpot(updatedSpot))
    return updatedSpot
  }
}

//delete
export const deleteSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(deleted)
  })
  if (response.ok) {
    const deletedSpot = await response.json()
    dispatch(deleteOneSpot(deletedSpot))
    // return deletedSpot
  }
}


//REDUCER
const initialState = {
  allSpots: {
    // spotId: {}
  },
  singleSpot: {
    SpotImages: []
  }
}

const spotReducer = (state = initialState, action) => {
  let newState;
  let allSpots = {}
  let singleSpot = {}
  switch (action.type) {
    case ADD_SPOT:
      singleSpot = { ...action.newSpot }
      newState = {
        ...state,
        singleSpot
      }
      newState.allSpots[action.newSpot.id] = { ...action.newSpot }
      return newState
    case LOAD_ALL_SPOT:
      newState = {
        ...state,
        allSpots: { ...action.allSpot.Spots }
      }
      let spotsArr = Object.values(newState.allSpots)
      // console.log('allSpotsArr=================', allSpotsArr)
      spotsArr.forEach(spot => {
        allSpots[spot.id] = spot
      })
      return allSpots
    default:
      return state
  }
}

export default spotReducer
