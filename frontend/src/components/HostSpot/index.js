import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect } from "react-router-dom"
// import { useHistory } from "react-router-dom"
import { addOneSpot } from "../../store/spots"
import { resetData } from "../../store/spots"
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
  const [url, setUrl] = useState("")
  // const [isLoaded, setIsLoaded] = useState(false)
  // const [preiview, setPreview] = useState("")

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)


  useEffect(() => {
    const errors = []
    if (!address || address.length > 20) { errors.push("Address is required and must be less than 20 characters") }
    if (!city || city.length > 15) { errors.push("City is required and must be less than 15 characters") }
    if (!state || state.length > 10) { errors.push("State is required and must be less than 10 characters") }
    if (!country || country.length > 15) { errors.push("Country is required and must be less than 15 characters") }
    if (!name || name.length > 20) { errors.push("Name is required and must be less than 20 characters") }
    if (!description || description.length > 250) { errors.push("Description is required and must be be less than 250 characters")}
    if (!price || price < 0) { errors.push("Price per day is required and must be more than $0") }
    if (!url.match(/\.(jpg|jpeg|png|gif)$/)) {errors.push("Please enter a valid URL ending with jpg, jpeg, png or gif")}
    // if (!url.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) { errors.push("Please enter a valid URL") }
    // if (!url.includes('https')) {errors.push("Please enter a valid URL")}
    // if (!url.includes('jpg')) {errors.push("Please enter a valid URL")}
    // if (!url.includes('png')) {errors.push("Please enter a valid URL")}
    // if (!url.includes('jpeg')) {errors.push("Please enter a valid URL")}

    setValidationErrors(errors)
  }, [name, address, city, state, country, description, price, url])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    if (!validationErrors.length) {

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
      let createdSpot = await dispatch(addOneSpot(newSpot))

      // const createdSpot = () => {
      //   dispatch(addOneSpot(newSpot))
      //   return (() => dispatch(resetData()))
      //   // window.location.reload()
      // }

      if (createdSpot) {
        // dispatch(resetData())
        // setErrors([])
        setShowErrors(false)
        // .then(() => setIsLoaded(true))
        history.push(`/spots/${createdSpot.id}`)
        return (() => dispatch(resetData()))
      }
    }
  }



  // .catch(async (res) => {
  //   const data = await res.json();
  //   if (data && data.errors) {
  //     setErrors(data.errors);
  //   }
  // })


  // let createdSpot;
  // try {
  //   createdSpot = await dispatch(addOneSpot(newSpot))
  // } catch (error) {
  //   if (error) {
  //     let allErrors = error.errors
  //     let arrayAllErrors = Object.values(allErrors)
  //     setErrors(arrayAllErrors)
  //   }
  // }

  //FIXME - error validation not working
  // try {
  //   createdSpot = await dispatch(addOneSpot(newSpot))
  // } catch (error) {
  //   // const userError = await errors.json
  //   // if (userError && userError.error) setErrors(userError.error);
  //   if (error) setErrors(Object.values(errors.errors));
  // }


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
        {/* <ul> */}
        {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        {/* </ul> */}
        <h3 className="host-message">Create Your Spot Meow!!!</h3>
        {showErrors &&
          <ul className="form-errors">
            {validationErrors.length > 0 &&
              validationErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
          </ul>
        }
        <div className="host-form">
          <label>
            <input
              placeholder="Address"
              type="text"
              className="host-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              // required
            />
          </label>
          <label>
            <input
              placeholder="City"
              type="text"
              className="host-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              // required
            />
          </label>
          <label>
            <input
              placeholder="State"
              type="text"
              className="host-input"
              value={state}
              onChange={(e) => setState(e.target.value)}
              // required
            />
          </label>
          <label>
            <input
              placeholder="Country"
              type="text"
              className="host-input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              // required
            />
          </label>
          <label>
            <input
              placeholder="Name"
              type="text"
              className="host-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // required
            />
          </label>
          <label>
            <input
              placeholder="Description"
              type="text"
              className="host-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // required
            />
          </label>
          <label>
            <input
              placeholder="Price"
              type="number"
              className="host-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              // required
            />
          </label>
          <label>
            <input
              placeholder="Image (url only)"
              type="text"
              className="host-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              // required
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
