import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect } from "react-router-dom"
// import { useHistory } from "react-router-dom"
import { addOneSpot } from "../../store/spots"
import { resetData } from "../../store/spots"
import "./HostSpot.css"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"


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
  const [center, setCenter] = useState({ lat: 37.0902, lng: -95.7129 })
  const [position, setPosition] = useState({ lat: 37.0902, lng: -95.7129 })

  const [place, setPlace] = useState("")
  const [amenities, setAmenities] = useState([])
  // const [isLoaded, setIsLoaded] = useState(false)
  // const [preiview, setPreview] = useState("")
  const [page, setPage] = useState(0);

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)


  // useEffect(() => {
  //   const errors = []
  //   if (!address || address.length > 20) { errors.push("Address is required and must be less than 20 characters") }
  //   if (!city || city.length > 15) { errors.push("City is required and must be less than 15 characters") }
  //   if (!state || state.length > 10) { errors.push("State is required and must be less than 10 characters") }
  //   if (!country || country.length > 15) { errors.push("Country is required and must be less than 15 characters") }
  //   if (!name || name.length > 20) { errors.push("Name is required and must be less than 20 characters") }
  //   if (!description || description.length > 250) { errors.push("Description is required and must be be less than 250 characters") }
  //   if (!price || !Number(price) || price < 1) { errors.push("Price per day is required and must be more than $1 (no decimal)") }
  //   if (!url.match(/\.(jpg|jpeg|png|gif)$/)) { errors.push("Please enter a valid URL ending with jpg, jpeg, png or gif") }
  //   // if (!url.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) { errors.push("Please enter a valid URL") }
  //   // if (!url.includes('https')) {errors.push("Please enter a valid URL")}
  //   // if (!url.includes('jpg')) {errors.push("Please enter a valid URL")}
  //   // if (!url.includes('png')) {errors.push("Please enter a valid URL")}
  //   // if (!url.includes('jpeg')) {errors.push("Please enter a valid URL")}

  //   setValidationErrors(errors)
  // }, [name, address, city, state, country, description, price, url])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    console.log("CLICKED ABDKHDBKHWBSKDHBKWE")
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
        amenities,
        place,
        preview: true
      }
      console.log(newSpot, "NEWSPOT")
      let createdSpot = await dispatch(addOneSpot(newSpot))

      // const createdSpot = () => {
      //   dispatch(addOneSpot(newSpot))
      //   return (() => dispatch(resetData()))
      //   // window.location.reload()
      // }

      if (createdSpot) {
        // dispatch(resetData())
        console.log("UBMITWADBKAB")
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
    // setPage(3)
  }

  const spotPage0 = () => {
    return (
      <div className="step0-wrapper">
        <div>It’s easy to get started on Airbnb</div>
        <ol>
          <li>
            <div>
              Tell us about your place
            </div>
            <div>
              Share some basic info, like where it is and how many guests can stay.
            </div>
          </li>
          <li>
            <div>
              Make it stand out
            </div>
            <div>
              Add 5 or more photos plus a title and description—we’ll help you out.
            </div>
          </li>
          <li>
            <div>
              Finish up and publish
            </div>
            <div>
              Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.

            </div>
          </li>
        </ol>
        <button onClick={() => setPage(1)}> Next </button>
      </div >
    )
  }
  const spotPage1 = () => {
    return (
      <div className="step1-wrapper">
        <div>Step 1</div>
        <div>Tell us about your place</div>
        <div>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</div>
        <div>INSERT CAT IMG HERE</div>
        <button onClick={() => setPage(2)}> Next </button>
      </div >
    )
  }

  const spotPage2 = () => {
    return (
      <div>
        <div>Which of these best describes your place?</div>
        <input type="button" value="Cat Tree" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
        <input type="button" value="Box" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
        <button onClick={() => setPage(3)}> Next </button>
      </div>
    )
  }
  const options = { types: ['address'] }
  const centerPoint = { lat: lat, lng: lng }
  const spotPage3 = () => {
    return (
      <div>
        <div>Where's your place located?</div>
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
        {/* <div className="map-wrapper">
          <GoogleMap
            zoom={10}
            center={centerPoint}
            mapContainerClassName="map-container"
          >
            <Marker position={centerPoint} />
          </GoogleMap>
        </div> */}
        <button onClick={() => setPage(4)}> Next </button>
      </div>
    )
  }

  const spotPage4 = () => {
    return (
      <div>
        <h3 className="host-message">Confirm your address</h3>
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
        </div>
        <button onClick={() => setPage(5)}> Next </button>
      </div>
    )
  }
  const spotPage5 = () => {
    return (
      <div className="step1-wrapper">
        <div>Step 2</div>
        <div>Make your place stand out</div>
        <div>In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.</div>
        <div>INSERT CAT IMG HERE</div>
        <button onClick={() => setPage(6)}> Next </button>
      </div >
    )
  }
  const spotPage6 = () => {
    return (
      <div>
        <div>Tell guests what your place has to offer</div>
        <input type="button" value="Wifi" onClick={(e) => setAmenities(e.target.value)} className="amenities-place" />
        <input type="button" value="TV" onClick={(e) => setAmenities(e.target.value)} className="amenities-place" />
        <button onClick={() => setPage(7)}> Next </button>
      </div>
    )
  }

  const spotPage7 = () => {
    return (
      <div>
        <div>Choose at least 1 photo</div>
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
        <button onClick={() => setPage(8)}> Next </button>
      </div>
    )
  }

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    history.push("/")
  }

  return (
    <div>
      <form className="full-host-form" onSubmit={handleSubmit} id="spot-form">
        {page === 0 &&
          spotPage0()
        }
        {page === 1 &&
          spotPage1()
        }
        {page === 2 &&
          spotPage2()
        }
        {page === 3 &&
          spotPage3()
        }
        {page === 4 &&
          spotPage4()
        }
        {page === 5 &&
          spotPage5()
        }
        {page === 6 &&
          spotPage6()
        }
        {page === 7 &&
          spotPage7()
        }
        {page === 8 &&
          <div>
            <label>
              <input
                placeholder="Name"
                type="text"
                className="host-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <button className="button-create-spot" form="spot-form" type="submit"> Create Spot</button>
          </div>
        }
        <button type="button" className="button-create-spot" onClick={handleCancel}>Cancel</button>
      </form>
    </div >
  )
}
export default HostSpot
