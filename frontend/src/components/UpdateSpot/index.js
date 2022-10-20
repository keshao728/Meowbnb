import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect, useParams } from "react-router-dom"
import { updateSpot, getOneSpot } from "../../store/spots"


const UpdateSpot = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  const singleSpot = useSelector(state => state.spots.singleSpot)

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  // const [errors, setErrors] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false)
  // const [url, setUrl] = useState(currSpots.SpotImages[0].url)

  useEffect(() => {
    dispatch(getOneSpot(spotId))
  }, [dispatch, spotId])

  // const currSpotImg = currSpots.SpotImages[0].url

  // if (currSpotImg.length > 0) prevImg = currSpotImg.find(obj => obj.preview === true).url

  useEffect(() => {
    setAddress(singleSpot.address)
    setCity(singleSpot.city)
    setState(singleSpot.state)
    setCountry(singleSpot.country)
    setName(singleSpot.name)
    setDescription(singleSpot.description)
    setPrice(singleSpot.price)
  }, [singleSpot])

  const handleSubmit = async (e) => {
    e.preventDefault()

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
    //FIXME - error validation
    let newUpdatedSpot = await dispatch(updateSpot(editSpot, spotId)) // bc i passed in 2 params in Thunk

    if (newUpdatedSpot) {
      // setErrors([])
      // return <Redirect to='/spots/my-spots' />
      history.push('/spots/my-spots')
    }

    if (!sessionUser) {
      return <Redirect to="/" />
    }
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    history.push("/spots/my-spots")
  }


  return (
    <div className="full-host-form">
      <form className="host-form-parent" onSubmit={handleSubmit}>
        <ul>
          {/* //FIXME - ERROR VALIDATION */}
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
        <h3 className="host-message">Update Your Spot Meow!!!</h3>
        <div className="host-form">
          <label>
            <input
              placeholder="Address"
              type="text"
              className="host-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="City"
              type="text"
              className="host-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="State"
              type="text"
              className="host-input"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="Country"
              type="text"
              className="host-input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="Name"
              type="text"
              className="host-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="Description"
              type="text"
              className="host-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="Price"
              type="text"
              className="host-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          {/* <label>
            <input
              placeholder="Image (url only)"
              type="text"
              className="host-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label> */}
        </div>
        <button className="button-create-spot" type="submit"> Edit Spot </button>
        <button type="button" className="button-create-spot" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}
export default UpdateSpot
