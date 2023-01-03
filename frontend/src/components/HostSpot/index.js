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
      // console.log(newSpot, "NEWSPOT")
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

    const city = item[2].long_name
    const state = item[4].long_name
    const country = item[5].long_name
    setAddress(street)
    setCity(city)
    setState(state)
    setCountry(country)
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
          <button className="step0-next" onClick={() => setPage(1)}> Get started </button>
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
          <button className="step-button-back" onClick={() => setPage(0)}> Back </button>
          <button className="step-button-next" onClick={() => setPage(2)}> Next</button>
        </div>
        {/* <button onClick={() => setPage(2)}> Next </button> */}
      </div >
    )
  }

  const spotPage2 = () => {
    return (
      <div className="step2-wrapper">
        <div className="step2">
          <div className="step2-title">Which of these best describes your place?</div>
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
            <button className="step-button-back" onClick={() => setPage(1)}> Back </button>
            <button className="step-button-next" onClick={() => setPage(3)}> Next</button>
          </div>
        </div>
      </div>
    )
  }
  const options = { types: ['address'] }
  const centerPoint = { lat: lat, lng: lng }
  const sanFran = { lat: 37.7749, lng: -122.4194 }
  const spotPage3 = () => {
    return (
      <div className="step3-wrapper">
        <div className="step2">
          <div className="step3-title">Where's your place located?</div>
          <div className="step3-des">Your address is only shared with guests after they’ve made a reservation.</div>
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
              }}
              mapContainerClassName="create-spot-map-container"
            >
              {/* <Marker position={sanFran} /> */}
            </GoogleMap>
          </div>
          <div className="step0-footer">
            <button className="step-button-back" onClick={() => setPage(2)}> Back </button>
            <button className="step-button-next" onClick={() => setPage(4)}> Next</button>
          </div>
        </div>
      </div>
    )
  }

  const spotPage4 = () => {
    return (
      <div className="step4-wrapper">
        <div className="step2">
          <div className="step3-title">Confirm your address</div>
          <div className="step3-des">Your address is only shared with guests after they’ve made a reservation.</div>
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
            <div className="host-input-box host-input-last">
              <input
                type="text"
                className="host-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <label>Country</label>
            </div>
          </div>

          <div className="map-wrapper">
            <GoogleMap
              zoom={14}
              center={centerPoint}
              options={{
                disableDefaultUI: true,
              }}
              mapContainerClassName="create-spot-pin-container"
            >
              <Marker position={centerPoint} />
            </GoogleMap>
          </div>
          <div className="step0-footer">
            <button className="step-button-back" onClick={() => setPage(3)}> Back </button>
            <button className="step-button-next" onClick={() => setPage(5)}> Next</button>
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
          <button className="step-button-back" onClick={() => setPage(4)}> Back </button>
          <button className="step-button-next" onClick={() => setPage(6)}> Next</button>
        </div>
        {/* <button onClick={() => setPage(2)}> Next </button> */}
      </div >
    )
  }
  const spotPage6 = () => {
    return (
      <div>
        <div>Tell guests what your place has to offer</div>
        <input type="button" value="Wifi" onClick={(e) => setAmenities(e.target.value)} className="amenities-place" />
        <input type="button" value="TV" onClick={(e) => setAmenities(e.target.value)} className="amenities-place" />
        <div className="step0-footer">
          <button className="step-button-back" onClick={() => setPage(5)}> Back </button>
          <button className="step-button-next" onClick={() => setPage(7)}> Next</button>
        </div>
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
        <div className="step0-footer">
          <button className="step-button-back" onClick={() => setPage(6)}> Back </button>
          <button className="step-button-next" onClick={() => setPage(8)}> Next</button>
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
            <div className="step0-footer">
              <button className="step-button-back" onClick={() => setPage(7)}> Back </button>
              {/* <button className="step-button-next" onClick={() => setPage(2)}> Next</button> */}
              <button className="step-button-next" form="spot-form" type="submit"> Create Spot</button>
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
