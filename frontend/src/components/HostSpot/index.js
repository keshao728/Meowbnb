import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Redirect } from "react-router-dom"
// import { useHistory } from "react-router-dom"
import { addOneSpot } from "../../store/spots"
import { resetData } from "../../store/spots"
import "./HostSpot.css"
import { MapStyle } from "./MapStyle"
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
  const [price, setPrice] = useState("99")

  const [url, setUrl] = useState("")
  const [url2, setUrl2] = useState("")
  const [url3, setUrl3] = useState("")
  const [url4, setUrl4] = useState("")
  const [url5, setUrl5] = useState("")

  const [allUrls, setAllUrls] = useState([])
  const [isChecked, setIsChecked] = useState(false);

  const [center, setCenter] = useState({ lat: 37.0902, lng: -95.7129 })
  const [position, setPosition] = useState({ lat: 37.0902, lng: -95.7129 })

  const [place, setPlace] = useState("")
  const [amenities, setAmenities] = useState([])
  // const [isLoaded, setIsLoaded] = useState(false)
  // const [preiview, setPreview] = useState("")
  const [page, setPage] = useState(0);

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)


  // const spot = useSelector(state => state.spots.singleSpot)
  // let spotImg;
  // if (url) {
  //   spotImg = spot?.SpotImages
  // }
  // // const spotImgArr = Object.values(spotImg)
  // console.log(spotImg, "SPOTIMGARR")


  useEffect(() => {
    let error = []

    if (!name || name.length > 20 || !name.trim().length) error.name = "Name is required and must be less than 20 characters"
    if (!description || description.length > 250 || !description.trim().length) error.description = "Description is required and must be be less than 250 characters"
    if (!price || !Number(price) || price < 1) error.price = "Price per day is required and must be more than $1 (no decimal)"

    setValidationErrors(error)

  }, [description, price, name])

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
  let imageUrl = []
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
        url: allUrls,
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
        // setErrors([])
        setShowErrors(false)
        // .then(() => setIsLoaded(true))
        history.push(`/spots/${createdSpot.id}`)
        return (() => dispatch(resetData()))
      }
    }
  }

  function increment() {
    let count = document.getElementById('price')
    if (count) {
      count.value++
    }
    setPrice(count.value)
  }

  function decrement() {
    let count = document.getElementById('price')
    if (count) {
      count.value--
    }
    setPrice(count.value)
  }

  const handleAddress = async (address) => {
    const result = await geocodeByAddress(address)
    const ll = await getLatLng(result[0])
    // console.log(result, "result")
    const item = result[0].address_components

    let streetNum;
    let streetName;
    let city;
    let state;
    let country;
    item.map((item) => {
      console.log(item, "item")
      // console.log(item, "item")
      if (item.types.includes("street_number")) {
        streetNum = item.long_name
      }
      if (item.types.includes("route")) {
        streetName = item.long_name
      }
      if (item.types.includes("locality")) {
        city = item.long_name
      }
      if (item.types.includes("administrative_area_level_1") ||
        item.types.includes("administrative_area_level_2") ||
        item.types.includes("administrative_area_level_3") ||
        item.types.includes("administrative_area_level_4")) {
        state = item.long_name
      }
      if (item.types.includes("country")) {
        country = item.long_name
      }
      // if (item.types[0] === "street_number") {
      //   item.long_name
      // }
      // if (item.types[0] === "route") {
      //   item.long_name
      // }
      // if (item.types[0] === "locality") {
      //   item.long_name
      // }
      // if (item.types[0] === "administrative_area_level_1") {
      //   item.long_name
      // }
      // if (item.types[0] === "country") {
      //   item.long_name
      // }
    })
    // const streetNum = item[0].long_name
    // const streetName = item[1].long_name
    // console.log(street, "street")

    // const city = item[2].long_name
    // const state = item[4].long_name
    // const country = item[5].long_name
    const street = streetNum + " " + streetName
    setAddress(street.trimStart())
    setCity(city.trimStart())
    setState(state.trimStart())
    setCountry(country.trimStart())
    setLat(ll.lat)
    setLng(ll.lng)
    setPage(4)
  }

  const spotPage0 = () => {
    return (
      <div className="step0-wrapper">
        <div className="step0">
          <div className="step0-seperate">
            <div className="step0-title">It’s easy to get started on Meowbnb</div>
          </div>
          <div className="step0-seperate">
            <div className="step0-individual-wrap">
              <div className="step0-individual step0-1">
                <div>1</div>
                <div className="step0-items">
                  <div>
                    Tell us about your place
                  </div>
                  <div className="step0-item-des">
                    Share some basic info, like where it is and how many guests can stay.
                  </div>
                </div>
                <img className="step0-img" src="https://imgur.com/6BpM4wC.png" />
              </div>
              <div className="step0-individual">
                <div>2</div>
                <div className="step0-items">
                  <div>
                    Make it stand out
                  </div>
                  <div className="step0-item-des">
                    Add 1 or more photos plus a title and description - we’ll help you out.
                  </div>
                </div>
                <img className="step0-img-1" src="https://imgur.com/8igNnZe.png" />
              </div>
            </div>
          </div>
        </div >
        <div className="step0-footer">
          <div></div>
          <button className="step0-next" type="button" onClick={() => setPage(1)}> Get started </button>
        </div>
      </div >
    )
  }
  const spotPage1 = () => {
    return (
      <div className="step1-wrapper">
        <div className="step1-left-wrap">
          <div className="step1-left-1">Step 1</div>
          <div className="step1-left-2">Tell us about your place</div>
          <div className="step1-left-3">In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</div>
        </div>
        <div className="step1-right">
          <img className="step1-img-1" src="https://imgur.com/qScRuLe.png" />
        </div>
        <div className="step0-footer step1-footer">
          <button className="step-button-back" type="button" onClick={() => setPage(0)}> Back </button>
          <button className="step-button-next" type="button" onClick={() => setPage(2)}> Next</button>
        </div>
        {/* <button onClick={() => setPage(2)}> Next </button> */}
      </div >
    )
  }

  const spotPage2 = () => {
    let errors = []

    if (!place) { errors.push("Please select an option") }
    const handleSubmit = async (e) => {
      // e.preventDefault()
      setShowErrors(true)


      if (!errors.length) {
        setShowErrors(false)
        setPage(3);
      }
    }

    return (
      <div className="step2-wrapper">
        <div className="step2">
          <div className="step2-title">Which of these best describes your place?</div>
          {showErrors && errors.length ? (
            <div className='error-wrap'>
              <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
              {errors.map((error) => (
                <div className="error-message">{error}</div>
              ))}
            </div>
          ) : null}
          <div className="step2-input-wrapper">
            <div className="step2-input-container">
              <input src="https://imgur.com/sz5sFYf.png" type="button" value="Play zone" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/bboPy36.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Sleep-only" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/hpmirKZ.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Tree" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/xgffVdE.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Box" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/7oxOZy7.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="No human" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/cIIP3LF.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Furball" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/B2UcvKy.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Catnip" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/u6LVB8Y.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Shared" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/atditdJ.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Petting home" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/XIsDXKA.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Nature" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/SGK10E3.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="No-meows-land" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/uQOxjcy.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Snacks" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/UQ1veNy.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Evil" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/f0dNDBx.png" />
            </div>

            <div className="step2-input-container">
              <input type="button" value="Others" onClick={(e) => setPlace(e.target.value)} className="describe-place" />
              <img className="place-img" src="https://imgur.com/zgtELKc.png" />
            </div>

          </div>
          <div className="step0-footer">
            <button type="button" className="step-button-back" onClick={() => setPage(1)}> Back </button>
            <div className="step-right-buttons">
              <button className="step-button-demo"
                type="button"
                onClick={() => {
                  setPlace("Nature")
                  setPage(3)
                }}>
                Autofill
              </button>
              {place ?
                <button className="test step-button-next" type="button" onClick={handleSubmit}> Next</button>
                :
                <button className="step-button-disabled"
                  type="button"
                  disabled={true}
                > Next
                </button>
              }
            </div>
          </div>
        </div>
      </div >
    )
  }
  const options = { types: ['address'] }
  const centerPoint = { lat: lat, lng: lng }
  const sanFran = { lat: 37.7749, lng: -122.4194 }

  const spotPage3 = () => {

    let errors = []

    if (!address || address.length > 20) { errors.push("Address is required and must be less than 20 characters") }
    const handleSubmit = async (e) => {
      // e.preventDefault()
      setShowErrors(true)
      if (!lat) setLat(37.7749)
      if (!lng) setLng(-122.4194)

      if (!errors.length) {
        setShowErrors(false)
        setPage(4);
      }
    }
    return (
      <div className="step3-wrapper">
        <div className="step3">
          <div className="step3-title">Where's your place located?</div>
          <div className="step3-des">Your address is only shared with guests after they’ve made a reservation.</div>
          {showErrors && errors.length ? (
            <div className='error-wrap'>
              <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
              {errors.map((error) => (
                <div className="error-message">{error}</div>
              ))}
            </div>
          ) : null}
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleAddress}
            onClick={() => setPage(4)}
            searchOptions={options}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className="create-search-autocomplete">
                <div className="create-search">
                  <i className="fa-solid fa-location-dot" id="create-search-icon"></i>
                  <input
                    {...getInputProps({
                      placeholder: 'Enter your address',
                      className: 'location-search-input',
                    })}
                  />
                </div>
                <div className="autocomplete-dropdown-container">
                  {loading &&
                    <div className="autocomplete-loading">
                      <img className="autocomplete-loading-img" src="https://imgur.com/gIENxaI.gif" />
                    </div>}
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
          <div className="map-wrapper">
            <GoogleMap
              zoom={12}
              center={sanFran}
              options={{
                disableDefaultUI: true,
                styles: MapStyle
              }}
              mapContainerClassName="create-spot-map-container"
            >
              {/* <Marker position={sanFran} /> */}
            </GoogleMap>
          </div>
          <div className="step0-footer">
            <button className="step-button-back" type="button" onClick={() => setPage(2)}> Back </button>
            <div className="step-right-buttons">
              <button className="step-button-demo"
                type="button"
                onClick={() => {
                  handleAddress("180 Geary Street")
                  setPage(4)
                }}>
                Autofill
              </button>
              {address ?
                <button className="test step-button-next" type="button" onClick={handleSubmit}> Next</button>
                :
                <button type="button" className="step-button-disabled"
                  disabled={true}
                > Next
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  const spotPage4 = () => {
    let errors = []

    if (!address || address.length > 30) { errors.push("Address is required and must be less than 30 characters") }
    if (!city || city.length > 15) { errors.push("City is required and must be less than 15 characters") }
    if (!state || state.length > 20) { errors.push("State is required and must be less than 20 characters") }
    if (!country || country.length > 15) { errors.push("Country is required and must be less than 15 characters") }

    const handleSubmit = async (e) => {
      // e.preventDefault()
      setShowErrors(true)
      if (!lat) setLat(37.7749)
      if (!lng) setLng(-122.4194)

      if (!errors.length) {
        setShowErrors(false)
        setPage(5);
      }
    }

    return (
      <div className="step4-wrapper">
        <div className="step3">
          <div className="step3-title">Confirm your address</div>
          <div className="step3-des">Your address is only shared with guests after they’ve made a reservation.</div>
          {showErrors && errors.length ? (
            <div className='error-wrap-address'>
              {errors.map((error) => (
                <div className='error-wrap-address-1'>
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                  <div className="error-message">{error}</div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="host-input-parent">
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={address}
                onChange={(e) => setAddress(e.target.value.trimStart())}
                required
              />
              <label>Address</label>
            </div>
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={city}
                onChange={(e) => setCity(e.target.value.trimStart())}
                required
              />
              <label>City</label>
            </div>
            <div className="host-input-box">
              <input
                type="text"
                className="host-input"
                value={state}
                onChange={(e) => setState(e.target.value.trimStart())}
                required
              />
              <label>State</label>
            </div>
            <div className="host-input-box host-input-last">
              <input
                type="text"
                className="host-input"
                value={country}
                onChange={(e) => setCountry(e.target.value.trimStart())}
                required
              />
              <label>Country</label>
            </div>
          </div>
          {console.log(lat, "LAT")}
          {console.log(lng, "LNG")}
          <div className="map-wrapper">
            <GoogleMap
              zoom={14}
              center={centerPoint}
              options={{
                disableDefaultUI: true,
                styles: MapStyle,
              }}
              mapContainerClassName="create-spot-pin-container"
            >
              <Marker position={centerPoint} />
            </GoogleMap>
          </div>
          <div className="step0-footer">
            <button type="button" className="step-button-back" onClick={() => setPage(3)}> Back </button>
            {address && city && state && country ?
              <button type="button" className="step-button-next"
                onClick={handleSubmit}> Next</button>
              :
              <button type="button" className="step-button-disabled"
                disabled={true}
              > Next</button>
            }
          </div>
        </div>
      </div>
    )
  }
  const spotPage5 = () => {
    return (
      <div className="step1-wrapper">
        <div className="step1-left-wrap">
          <div className="step1-left-1">Step 2</div>
          <div className="step1-left-2 step5-left">Make your place stand out</div>
          <div className="step1-left-3 step5-left-1">In this step, you’ll add some of the amenities your place offers, plus 1 or more photos. Then, you’ll create a title and description.</div>
        </div>
        <div className="step1-right">
          <img className="step1-img-1" src="https://imgur.com/JyXItmZ.png" />
        </div>
        <div className="step0-footer step1-footer">
          <button type="button" className="step-button-back" onClick={() => setPage(4)}> Back </button>
          <button type="button" className="step-button-next" onClick={() => setPage(6)}> Next</button>
        </div>
        {/* <button onClick={() => setPage(2)}> Next </button> */}
      </div >
    )
  }
  const spotPage6 = () => {

    let error = []

    if (!amenities || amenities.length === 0) {
      error.push("Please select at least one amenities")
    }
    // function anyCheckbox() {
    //   var inputElements = document.getElementsByTagName("input");
    //   for (var i = 0; i < inputElements.length; i++) {

    //     if (inputElements[i].type === "checkbox") {
    //       if (inputElements[i].checked) {
    //         console.log("checked")
    //         return true;
    //       }
    //     }
    //   }
    //   console.log("not checked")
    //   return false;
    // }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setShowErrors(true)

      if (!error.length) {
        setShowErrors(false)
        setPage(7);
      }
    }


    const handleChange = (e) => {
      let amenitiesButton = document.getElementById('testing')
      if (e.target.checked && !amenities.includes(e.target.value)) {
        setAmenities([...amenities, e.target.value])
        console.log(amenities, "add amenities")
        if (amenities.length > 0 || amenities) {
          amenitiesButton.classList.remove("step-button-disabled")
          amenitiesButton.classList.add("step-button-next")
        }
      } else if (!e.target.checked && amenities.includes(e.target.value)) {
        amenities.splice(amenities.indexOf(e.target.value), 1)
        console.log(amenities, "deleted amenities")
        console.log(amenities, "amenities")
        if (amenities.length === 0 || !amenities) {
          amenitiesButton.classList.remove("step-button-next")
          amenitiesButton.classList.add("step-button-disabled")
          console.log(amenities, "no amenities")
          // return setAmenities(amenities)
        }
      }
    }

    console.log(amenities, "amenities")


    // console.log(amenities, "allAmenities")

    return (
      <div className="step2-wrapper">
        <div className="step2">
          <div className="step2-title step6-title">Tell guests what your place has to offer</div>
          <div className="step3-des step6-des">You cannot add more amenities after you publish your listing.</div>
          {showErrors && error.length ? (
            <div className='error-wrap'>
              <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
              {error.map((error) => (
                <div className="error-message">{error}</div>
              ))}
            </div>
          ) : null}
          <div className="step6-input-wrapper">
            <div className="amenities-container">
              <input id="wifi" type="checkbox" value="Wifi" onClick={handleChange} className="amenities-place" />
              <label for="wifi" className="amenities-label">Wifi</label>
              <img className="amenities-img" src="https://imgur.com/fHVWE9K.png" />
            </div>
            <div className="amenities-container">
              <input id="tv" type="checkbox" value="TV" onClick={handleChange} className="amenities-place" />
              <label for="tv" className="amenities-label">TV</label>
              <img className="amenities-img" src="https://imgur.com/csXC3RL.png" />
            </div>
            <div className="amenities-container">
              <input id="kitchen" type="checkbox" value="Kitchen" onClick={handleChange} className="amenities-place" />
              <label for="kitchen" className="amenities-label">Kitchen</label>
              <img className="amenities-img" src="https://imgur.com/uwD4CGY.png" />
            </div>
            <div className="amenities-container">
              <input id="washer" type="checkbox" value="Washer" onClick={handleChange} className="amenities-place" />
              <label for="washer" className="amenities-label" >Washer</label>
              <img className="amenities-img" src="https://imgur.com/Xluxljd.png" />
            </div>
            <div className="amenities-container">
              <input id="free-park" type="checkbox" value="Free parking on premises" onClick={handleChange} className="amenities-place" />
              <label for="free-park" className="amenities-label">Free parking on premises</label>
              <img className="amenities-img" src="https://imgur.com/z2lA5yX.png" />
            </div>
            <div className="amenities-container">
              <input id="paid-park" type="checkbox" value="Paid parking on premises" onClick={handleChange} className="amenities-place" />
              <label for="paid-park" className="amenities-label">Paid parking on premises</label>
              <img className="amenities-img" src="https://imgur.com/nARtwQZ.png" />
            </div>
            <div className="amenities-container">
              <input id="air" type="checkbox" value="Air conditioning" onClick={handleChange} className="amenities-place" />
              <label for="air" className="amenities-label">Air conditioning</label>
              <img className="amenities-img" src="https://imgur.com/cHR1Rxx.png" />
            </div>
            <div className="amenities-container">
              <input id="workspace" type="checkbox" value="Dedicated workspace"
                onClick={handleChange}
                className="amenities-place" />
              <label for="workspace" className="amenities-label">Dedicated workspace</label>
              <img className="amenities-img" src="https://imgur.com/7iFsb5g.png" />
            </div>
          </div>
          <div className="step0-footer">
            <button type="button" className="step-button-back" onClick={() => setPage(5)}> Back </button>
            <div className="step-right-buttons">
              <button className="step-button-demo"
                type="button"
                onClick={() => {
                  setAmenities(['Dedicated workspace', 'Kitchen', 'Wifi', 'TV', 'Washer', 'Paid parking on premises'])
                  setPage(7)
                }}>
                Autofill
              </button>
              {amenities.length && amenities ?
                <button type="button" className="test step-button-next" id="testing" onClick={handleSubmit}> Next</button>
                :
                <button type="button" className="step-button-disabled"
                  disabled={true}
                > Next
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  // useEffect(() => {
  //   if (url.length) {
  //     imageUrl.push(url)
  //   }
  //   if (url2.length) {
  //     imageUrl.push(url2)
  //   }
  //   if (url3.length) {
  //     imageUrl.push(url3)
  //   }
  //   if (url4.length) {
  //     imageUrl.push(url4)
  //   }
  //   if (url5.length) {
  //     imageUrl.push(url5)
  //   }
  // }, [url, url2, url3, url4, url5])

  const spotPage7 = () => {
    let error = []

    if (url.length) {
      if (!url.includes("png") && !url.includes("jpg") && !url.includes("jpeg")) {
        error.push("Please enter at least one valid URL ending with jpg, jpeg or png")
      } else {
        imageUrl.push(url)
      }
    }
    if (url2.length) {
      imageUrl.push(url2)
    }
    if (url3.length) {
      imageUrl.push(url3)
    }
    if (url4.length) {
      imageUrl.push(url4)
    }
    if (url5.length) {
      imageUrl.push(url5)
    }


    const handleSubmit = async (e) => {
      // e.preventDefault()
      setShowErrors(true)

      // setUrl("")
      // setUrl2("")
      // setUrl3("")
      // setUrl4("")
      // setUrl5("")

      if (!error.length) {
        setShowErrors(false)
        setAllUrls(imageUrl);
        setPage(8);
      }
    }

    return (
      <div className="step7-wrapper">
        <div className="step7-left">
          <div className="step2-title">Choose at least 1 photo</div>
          <div className="step3-des step7-des">Cover Photo</div>
          {showErrors && error.length ? (
            <div className='error-wrap'>
              <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
              {error.map((error) => (
                <div className="error-message">{error}</div>
              ))}
            </div>
          ) : null}
          <div className="host-input-parent">
            <div className="host-input-box host-input-last">
              <input
                type="text"
                className="host-input"
                value={url}
                onChange={(e) => setUrl(e.target.value.trim())}
                required
              />
              <label>Image (url only)</label>
            </div>
          </div>
          <div className="step3-des step7-des">Optional</div>
          <div className="host-input-parent">
            <div className="host-input-box">
              <input
                type="text"
                id="url2"
                className="host-input"
                value={url2}
                onChange={(e) => setUrl2(e.target.value.trim())}
              // required
              // formnovalidate
              />
              <label>Image (url only)</label>
            </div>
            <div className="host-input-box">
              <input
                type="text"
                id="url3"
                className="host-input"
                value={url3}
                onChange={(e) => setUrl3(e.target.value.trim())}
              // required
              />
              <label>Image (url only)</label>
            </div>
            <div className="host-input-box ">
              <input
                type="text"
                id="url4"
                className="host-input"
                value={url4}
                onChange={(e) => setUrl4(e.target.value.trim())}
              // required
              />
              <label>Image (url only)</label>
            </div>
            <div className="host-input-box host-input-last">
              <input
                type="text"
                id="url5"
                className="host-input"
                value={url5}
                onChange={(e) => setUrl5(e.target.value.trim())}
              // required
              />
              <label>Image (url only)</label>
            </div>
          </div>
        </div>
        <div className="step7-right">
          {!url ?
            <div className="step3-des step7-preview">Image Preview</div> : <div className="step3-des step7-preview">Cover Photo</div>
          }
          {url && !url2 && !url3 && !url4 && !url5 &&
            <img className="spot-img-upload-1" src={url} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
            // <img className="spot-img-upload-1" src='https://imgur.com/WghnM0b.png' />
          }

          {url && url2 && !url3 && !url4 && !url5 &&
            <div className="step7-2url">
              <img className="spot-img-upload-2" src={url} />
              <img className="spot-img-upload-3" src={url2} />
            </div>
          }
          {url && url2 && url3 && !url4 && !url5 &&
            <div className="step7-3url">
              <img className="spot-img-upload-2" src={url} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
              <div className="step7-3url-bottom">
                <img className="spot-img-upload-4" src={url2} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                <img className="spot-img-upload-5" src={url3} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
              </div>
            </div>
          }
          {url && url2 && url3 && url4 && !url5 &&
            <div className="step7-3url">
              <div className="step8-3url-top">
                <img className="spot-img-upload-4" src={url} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                <img className="spot-img-upload-5" src={url2} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
              </div>
              <div className="step7-3url-bottom">
                <img className="spot-img-upload-4" src={url3} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                <img className="spot-img-upload-5" src={url4} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
              </div>
            </div>
          }
          {url && url2 && url3 && url4 && url5 &&
            <div className="step7-3url">
              <div className="step8-3url-top">
                <img className="spot-img-upload-4" src={url} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                <img className="spot-img-upload-5" src={url2} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
              </div>
              <div className="step7-3url-bottom">
                <img className="spot-img-upload-6" src={url3} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                <img className="spot-img-upload-7" src={url4} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
                <img className="spot-img-upload-8" src={url5} onError={(e) => e.target.src = 'https://imgur.com/WghnM0b.png'} />
              </div>
            </div>
          }

        </div>
        <div className="step0-footer">
          <button className="step-button-back" type="button" onClick={() => setPage(6)}> Back </button>
          <div className="step-right-buttons">
            <button className="step-button-demo"
              type="button"
              onClick={() => {
                // setUrl("https://bouncymustard.com/wp-content/uploads/2021/12/11-funny-cat-reaction-to-snow.jpg")
                // setUrl2("https://bouncymustard.com/wp-content/uploads/2021/12/11-funny-cat-reaction-to-snow.jpg")
                // setUrl3("https://bouncymustard.com/wp-content/uploads/2021/12/11-funny-cat-reaction-to-snow.jpg")
                // handleSubmit()
                setAllUrls(["https://bouncymustard.com/wp-content/uploads/2021/12/11-funny-cat-reaction-to-snow.jpg", "https://bouncymustard.com/wp-content/uploads/2021/12/11-funny-cat-reaction-to-snow.jpg", "https://bouncymustard.com/wp-content/uploads/2021/12/11-funny-cat-reaction-to-snow.jpg"]);
                setPage(8)
              }}>
              Autofill
            </button>
            {url ?
              <button type="button" className="step-button-next"
                // disabled={() => { !url; error }}
                // formnovalidate
                onClick={() => {
                  // { !url2 && document.getElementById("url2").removeAttribute("required") }
                  // { !url3 && document.getElementById("url3").removeAttribute("required") }
                  // { !url4 && document.getElementById("url4").removeAttribute("required") }
                  // { !url5 && document.getElementById("url5").removeAttribute("required") }
                  handleSubmit();
                  // setAllUrls(imageUrl);
                  // setPage(8);
                }}> Next</button>
              :
              <button type="button" className="step-button-disabled"
                disabled={true}
              > Next</button>
            }
          </div>
        </div>
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
    <div className="full-host-wrapper">
      <form className="full-host-form" onSubmit={handleSubmit} id="spot-form">
        <button type="button" className="button-cancel-spot" onClick={handleCancel}>Exit</button>
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
          <div className="step3">
            <div className="step3-title">Now, let's give your dome a final touchup</div>
            <div className="step3-des">You can change it anytime..</div>
            {showErrors && !!validationErrors.name &&
              <div className="error-wrap error-name">
                <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                <div className="error-message">{validationErrors.name}</div>
              </div>
            }
            {showErrors && !!validationErrors.description &&
              <div className="error-wrap error-name">
                <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                <div className="error-message">{validationErrors.description}</div>
              </div>
            }
            <div className="host-input-parent">
              <div className="host-input-box">
                <input
                  type="text"
                  className="host-input"
                  value={name}
                  onChange={(e) => setName(e.target.value.trimStart())}
                  required
                />
                <label>Name</label>
              </div>
              <div className="host-input-box host-input-last">
                <textarea
                  type="text"
                  className="host-input host-input-des"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.trimStart())}
                  required
                />
                <label>Description</label>
              </div>
            </div>

            <div className="step8-title">Set your price</div>
            <div className="host-input-price-wrapper ">
              <div className="host-input-price-container">
                <button className="price-increase-decrese" type="button" onClick={decrement}>-</button>
                <input
                  type="number"
                  placeholder="00"
                  id='price'
                  min="1"
                  className="host-input-price-item"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value).toFixed(0))}
                  required
                />
                <button className="price-increase-decrese" type="button" onClick={increment}>+</button>

              </div>
              <div className="host-input-per-night">per night</div>
              {showErrors && !!validationErrors.price &&
                <div className="error-wrap">
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                  <div className="error-message">{validationErrors.price}</div>
                </div>
              }
            </div>

            <div type="button" className="step0-footer">
              <button className="step-button-back" onClick={() => setPage(7)}> Back </button>
              <div className="step-right-buttons">
                <button className="step-button-demo"
                  type="submit"
                  form="spot-form"
                  onClick={() => {
                    setName("Cats Meowtside")
                    setDescription("A tranquil contemplative nature retreat, in a magnificent setting surrounded by a creek, meadow and woodlands. You’ll love this place because of the light, the comfy beds and the location.")
                    setPrice("333")
                    handleSubmit()
                  }}>
                  Autofill
                </button>

                {name && description && price ?
                  <button className="step-button-next" onClick={handleSubmit} form="spot-form" type="submit"> Create Spot</button>
                  :
                  <button type="button" className="step-button-disabled"
                    disabled={true}
                  > Create Spot
                  </button>
                }
              </div>
            </div>
          </div>
        }
        {/* <div className="footer">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === 8) {
                alert("FORM SUBMITTED");
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === 8 ? <button className="button-create-spot" form="spot-form" type="submit"> Create Spot</button> : "Next"}
          </button>
        </div> */}
        <div className="progressbar">
          <div className="progress-bar-1">
            <div style={{ width: page === 0 ? "0%" : page === 1 ? "0%" : page === 2 ? "33.3%" : page === 3 ? "66.6%" : "100%" }}></div>
          </div>
          <div className="progress-bar-1">
            <div style={{ width: page === 6 ? "33.3%" : page === 7 ? "66.6%" : page === 8 ? "100%" : "0%" }}></div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default HostSpot
