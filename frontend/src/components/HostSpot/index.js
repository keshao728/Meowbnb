import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect } from "react-router-dom"
// import { useHistory } from "react-router-dom"
import { addOneSpot } from "../../store/spots"
import "./HostSpot.css"

const HostSpot = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  // const [lat, setLat] = useState(0)
  // const [lng, setLng] = useState(0)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  //TODO -
  const [url, setUrl] = useState("")
  // const [preiview, setPreview] = useState("")

  // const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newSpot = {
      address,
      city,
      state,
      country,
      // lat: 20,
      // lng: 20,
      name,
      description,
      price,
      url,
      preview: true
    }

    // if (!sessionUser) return <Redirect to="/"/>
    // let createdSpot = await dispatch(addOneSpot(newSpot))

    //   if (newSpot) {
    //     setErrors([])
    //     return dispatch(addOneSpot(newSpot))
    //       .catch(async (res) => {
    //         const data = await res.json();
    //         if (data && data.errors) setErrors(data.errors)
    //       })
    //   }
    //   return setErrors
    // }


    const createdSpot = await dispatch(addOneSpot(newSpot))

    //FIXME - error validation not working
    // try {
    //   createdSpot = await dispatch(addOneSpot(newSpot))
    // } catch (error) {
    //   // const userError = await errors.json
    //   // if (userError && userError.error) setErrors(userError.error);
    //   if (error) setErrors(Object.values(errors.errors));
    // }

    if (createdSpot) {
      // setErrors([])
      history.push(`/spots/${createdSpot.id}`)
    }
  }

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    history.push("/")
  }


  return (
    <div className="full-host-form">
      <form className="host-form-parent" onSubmit={handleSubmit}>
        <ul>
          {/* //FIXME - ERROR VALIDATION */}
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
        <h3 className="host-message">Create Your Spot Meow!!!</h3>
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
          <label>
            <input
              placeholder="Spot Image"
              type="text"
              className="host-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="button-create-spot" type="submit"> Create Spot</button>
        <button type="button" className="button-create-spot" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password })).catch(
  //     async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     }
  //   );
  // };

}
export default HostSpot
