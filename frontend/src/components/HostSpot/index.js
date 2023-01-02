import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect } from "react-router-dom"
// import { useHistory } from "react-router-dom"
import { addOneSpot } from "../../store/spots"
import { resetData } from "../../store/spots"
import "./HostSpot.css"

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const HostSpot = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
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
    if (!description || description.length > 250) { errors.push("Description is required and must be be less than 250 characters") }
    if (!price || !Number(price) || price < 1) { errors.push("Price per day is required and must be more than $1 (no decimal)") }
    if (!url.match(/\.(jpg|jpeg|png|gif)$/)) { errors.push("Please enter a valid URL ending with jpg, jpeg, png or gif") }
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
        lat,
        lng,
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

  const handleAddress = async (address) => {
    const result = await geocodeByAddress(address)
    const ll = await getLatLng(result[0])
    console.log(result, "result")
    const item = result[0].address_components
    const streetNum = item[0].long_name
    const streetName = item[1].long_name
    const street = streetNum + " " + streetName

    const city = item[3].long_name
    const state = item[5].long_name
    const country = item[6].long_name
    setAddress(street)
    setCity(city)
    setState(state)
    setCountry(country)
    setLat(ll.lat)
    setLng(ll.lng)
  }






  if (!sessionUser) {
    return <Redirect to="/" />
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    history.push("/")
  }

  const options = { types: ['address'] }
  return (
    <div className="full-host-form">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleAddress}
        searchOptions={options}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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
              type="number"
              placeholder="Price"
              className="host-input"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value).toFixed(0))}
            // required
            />
          </label>
          <label>
            <input
              placeholder="Image (url only)"
              type="url"
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
