import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect, useParams} from "react-router-dom"
import { updateSpot } from "../../store/spots"


const UpdateSpot = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user)

  const allSpots = useSelector(state => state.spots.allSpots)

  const singleSpot = allSpots[spotId]
  // const currSpotImg = currSpots.SpotImages[0].url

  // if (currSpotImg.length > 0) prevImg = currSpotImg.find(obj => obj.preview === true).url

  // console.log('currSpot in UpdatedSpot', currSpots)

  const [address, setAddress] = useState(singleSpot.address)
  const [city, setCity] = useState(singleSpot.city)
  const [state, setState] = useState(singleSpot.state)
  const [country, setCountry] = useState(singleSpot.country)
  const [name, setName] = useState(singleSpot.name)
  const [description, setDescription] = useState(singleSpot.description)
  const [price, setPrice] = useState(singleSpot.price)
  // const [url, setUrl] = useState(currSpots.SpotImages[0].url)

  // useEffect(() => {
  //   dispatch(getOneSpots(spotId))
  // }, [dispatch])

  //TODO -
  // const [url, setUrl] = useState("")
  // const [preiview, setPreview] = useState("")

  // const [errors, setErrors] = useState([]);

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
      preview: true
    }
    //FIXME - error validation
    const newUpdatedSpot = await dispatch(updateSpot(editSpot, spotId)) // bc i passed in 2 params in Thunk

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
