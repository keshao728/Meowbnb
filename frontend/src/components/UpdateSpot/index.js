import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect, useParams } from "react-router-dom"
import { updateSpot, getOneSpot } from "../../store/spots"

import "./UpdateSpot.css"

const UpdateSpot = ({ setShowModal, id }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  const allSpots = useSelector(state => state.spots.allSpots)
  const allSpotsArr = Object.values(allSpots)

  // console.log(id, "IDIDIIDIDIDIDI")
  let singleSpot;
  allSpotsArr.map((spot) => {
    if (spot.id === id) singleSpot = spot
  })

  // console.log("singleSpot", singleSpot)
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)


  useEffect(() => {
    dispatch(getOneSpot(singleSpot.id))
  }, [dispatch, spotId])


  useEffect(() => {
    setAddress(singleSpot.address)
    setCity(singleSpot.city)
    setState(singleSpot.state)
    setCountry(singleSpot.country)
    setName(singleSpot.name)
    setDescription(singleSpot.description)
    setPrice(singleSpot.price)
  }, [singleSpot])


  useEffect(() => {
    const errors = []
    if (!address || address.length > 30) { errors.push("Address is required and must be less than 30 characters") }
    if (!city || city.length > 15) { errors.push("City is required and must be less than 15 characters") }
    if (!state || state.length > 10) { errors.push("State is required and must be less than 10 characters") }
    if (!country || country.length > 15) { errors.push("Country is required and must be less than 15 characters") }
    if (!name || name.length > 20) { errors.push("Name is required and must be less than 20 characters") }
    if (!description || description.length > 250) { errors.push("Description is required and must be be less than 250 characters") }
    if (!price || !Number(price) || price < 1) { errors.push("Price per day is required and must be more than $1 (no decimal)") }


    setValidationErrors(errors)
  }, [name, address, city, state, country, description, price])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    if (!validationErrors.length) {
      const editSpot = {
        address,
        city,
        state,
        country,
        name,
        description,
        price,
        // url,
        // preview: true
      }
      let newUpdatedSpot = await dispatch(updateSpot(editSpot, spotId)) // bc i passed in 2 params in Thunk
      if (newUpdatedSpot) {
        setShowErrors(false)
        setShowModal(false)
        history.push('/spots/hosting')
      }
    }

    if (!sessionUser) {
      return <Redirect to="/" />
    }
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    setShowModal(false)
  }


  return (
    <div className="full-update-form">
      <form className="update-spot-form-parent" onSubmit={handleSubmit}>
        <h2 className="update-host-message">Update {singleSpot.name}</h2>
        {showErrors && validationErrors.length &&
          <div className='error-wrap'>
            <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
            {validationErrors.map(error => (
              <div className="error-message" key={error}>{error}</div>
            ))}
          </div>
        }
        <div className="host-form">
          <div className="host-input-parent">
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label>Address</label>
            </div>
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <label>City</label>
            </div>
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <label>State</label>
            </div>
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <label>Country</label>
            </div>
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Name</label>
            </div>
            <div className="host-input-box">
              <textarea
                type="text"
                className="host-input host-input-des"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label>Description</label>
            </div>
            <div className="host-input-box host-input-last">
              <input
                type="number"
                className="host-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <label>Price</label>
            </div>
          </div>
        </div>
        <div className="edit-spot-buttons">
          <button className="button-edit-spot" type="submit"> Submit </button>
          <button type="button" className="button-cancel-edit" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
export default UpdateSpot
