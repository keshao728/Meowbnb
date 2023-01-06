import { csrfFetch } from "./csrf"

const ADD_SPOT = "spots/ADD_SPOT"
const LOAD_ALL_SPOT = "spots/LOAD_ALL_SPOT"
const LOAD_ONE_SPOT = "spots/LOAD_ONE_SPOT"
const UPDATE_ONE_SPOT = "spots/UPDATE_ONE_SPOT"
const DELETE_ONE_SPOT = "spots/DELETE_ONE_SPOT"
const RESET_DATA = "spots/RESET_DATA"

//ACTIONS-------------
//create
const addSpot = (newSpot) => ({
  type: ADD_SPOT,
  newSpot
})

//read
//FIXME CHANGE THE VARIABLE NAME
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
const deleteOneSpot = (spotId) => ({
  type: DELETE_ONE_SPOT,
  spotId
})

export const resetData = () => ({
  type: RESET_DATA,
})


//THUNK-----------------
//create
export const addOneSpot = (added) => async dispatch => {
  const { url, address, city, state, country, lat, lng, name, description, price, place, amenities } = added;
  console.log(added, "ADDED IN THUNK")

  console.log(url, "IMAGE IN THUNK")
  // console.log(url, "IMAGES IN THUNK")
  const formData = new FormData();

  formData['address'] = address;
  formData['city'] = city;
  formData['state'] = state;
  formData['country'] = country;
  formData['lat'] = lat;
  formData['lng'] = lng;
  formData['name'] = name;
  formData['description'] = description;
  formData['price'] = price;
  formData['place'] = place;
  formData['amenities'] = amenities;

  // for multiple files
  if (url && url.length !== 0) {
    for (var i = 0; i < url.length; i++) {
      formData['url'] = url[i];
      // formData.a("url", url[i]);
    }
  }

  // for single file
  if (url) formData['url'] = url;

  console.log(formData, "FORM DATA AFTER APPEND")

  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(formData),
  })
  // if (response.ok) {
    const newSpot = await response.json()
    dispatch(addSpot(newSpot))
    // console.log(newSpot, "NEW SPOT")
    // return newSpot
  // }
}

//read
export const getAllSpots = () => async dispatch => {
  const response = await fetch('/api/spots')

  if (response.ok) {
    const allSpot = await response.json()
    // console.log('sssssssssssssssssssssssssssss', allSpot)
    dispatch(loadAllSpot(allSpot))
  }
}

export const getOneSpot = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)

  if (response.ok) {
    const oneSpot = await response.json()
    dispatch(loadOneSpot(oneSpot))
    return oneSpot
  }
}

//current spot
export const getCurrentSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current')

  if (response.ok) {
    const current = await response.json()
    dispatch(loadAllSpot(current))
    return current
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
    const updatedSpot = await response.json() //this is my res.json in the backend
    dispatch(updateOneSpot(updatedSpot))
    return updatedSpot
  }
  //   if (response.ok) {
  //     await response.json() //this is my res.json in the backend
  //    dispatch(updateOneSpot(spotId))
  //    // return response
  //  }
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
    // const deleteResponseMessage =
    await response.json() //if message is successful
    // dispatch(deleteOneSpot(deleteResponseMessage))

    dispatch(deleteOneSpot(spotId)) //delete it

    // return deletedSpot
  }
}


//REDUCER
const initialState = {
  allSpots: {
    // spotId: {}
  },
  singleSpot: {
    // SpotImages: [] //NOTE - WE MIGHT NOT NEED THIS BC IT COMES FROM BACKEND
  }
}

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL_SPOT:
      let newAllSpotObject = {}
      newState = {
        ...state,
        singleSpot: { ...state.singleSpot }, //I need to add this bc reference in memory
        allSpots: { ...state.allSpots }
      }
      // let spotsArr = Object.values(action.allSpot)
      // console.log('IN LOAD_ALL_SPOT CASE, THIS IS ACTION.ALLSPOT', action.allSpot)
      // console.log('allSpotsArr=================', allSpotsArr)
      action.allSpot.Spots.forEach(spot => {
        newAllSpotObject[spot.id] = spot
      })
      newState.allSpots = newAllSpotObject
      return newState
    case LOAD_ONE_SPOT:
      newState = {
        ...state,
        singleSpot: { ...state.singleSpot },
        allSpots: { ...state.allSpots }
      }
      newState.singleSpot = action.oneSpot
      return newState
    case ADD_SPOT:
      newState = {
        ...state, //create a new reference in memory for each nested object/array
        singleSpot: { ...state.singleSpot },
        allSpots: { ...state.allSpots }
      } //then do things in a normalized manner
      newState.allSpots[action.newSpot.id] = action.newSpot //add my stuff
      newState.singleSpot = action.newSpot
      return newState

    case UPDATE_ONE_SPOT:
      newState = {
        //spread the original - has the same memory address
        ...state,
        //create a reference in memeory
        singleSpot: { ...state.singleSpot },
        allSpots: { ...state.allSpots }
      }
      newState.allSpots[action.updatedSpot.id] = action.updatedSpot //normalized object
      newState.singleSpot = action.updatedSpot // single object - theres only 1!!!

      return newState
    //action has a key of updated spot
    //newState.allSpots[action.updatedSpot.id] = action.updatedSpot //this is new memory address from backend
    case DELETE_ONE_SPOT:
      newState = {
        ...state,
        singleSpot: { ...state.singleSpot },
        allSpots: { ...state.allSpots }
      }

      delete newState.allSpots[action.spotId] // this also contain everything
      newState.singleSpot = {}

      return newState

    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default spotReducer
