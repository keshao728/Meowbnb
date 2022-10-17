import { csrfFetch } from "./csrf"

const ADD_SPOT = "spots/ADD_SPOT"
const LOAD_ALL_SPOT = "spots/LOAD_ALL_SPOT"
const LOAD_ONE_SPOT = "spots/LOAD_ALL_SPOT"
const UPDATE_ONE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"


//ACTIONS-------------
//create
const addSpot = (newSpot) => ({
  type: ADD_SPOT,
  newSpot
})

//read
const loadAllSpot = (allSpots) => ({
  type: LOAD_ALL_SPOT,
  allSpots
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
const deleteSpot = () => ({
  type: DELETE_SPOT
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
  if (response.ok){
    const newSpot = await response.json()
    dispatch(addSpot(newSpot))
    return newSpot
  }
}

//read
export const getAllSpots = () => async dispatch => {
  const response = await fetch('/api/spots')

  if (response.ok) {
    const allSpots = await response.json()
    dispatch(loadAllSpot(allSpots))
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
export const updateSpot = (updated) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updated)
  })
  if (response.ok){
    const updatedSpot = await response.json()
    dispatch(updateOneSpot(updatedSpot))
    return updatedSpot
  }
}

//delete

//REDUCER

