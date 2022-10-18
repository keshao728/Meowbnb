import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
// import { useHistory } from "react-router-dom"
import { addOneSpot } from "../../store/spots"
import "./HostSpot.css"

const HostSpot = () => {
  let dispatch = useDispatch()
  // let sessionUser = useSelector(state => state.session.user)
  // if (!sessionUser) return <Redirect to="/"/>
  let history = useHistory()
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  // const [lat, setLat] = useState(0)
  // const [lng, setLng] = useState(0)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  // const [url, setUrl] = useState("")

  // const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price
      // url
    }

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

    //FIXME - DOESNT REDIRECT
    if (createdSpot) {
      // setErrors([])
      history.push(`/spots/${createdSpot.id}`)
    }
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    history.push("/")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {/* //FIXME - ERROR VALIDATION */}
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
        <label>
          <input
            placeholder="Address"
            type="text"
            class="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="City"
            type="text"
            class="input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="State"
            type="text"
            class="input"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Country"
            type="text"
            class="input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Name"
            type="text"
            class="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Description"
            type="text"
            class="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Price"
            type="text"
            class="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button class="button-create-spot" type="submit"> Create Spot</button>
        <button type="button" class="button-create-spot" onClick={handleCancel}>Cancel</button>
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
