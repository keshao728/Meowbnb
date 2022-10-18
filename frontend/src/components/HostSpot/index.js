import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
// import { useHistory } from "react-router-dom"
import { addOneSpot } from "../../store/spots"

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

  const [errors, setErrors] = useState([]);

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
    let createdSpot;

    try {
      createdSpot = await dispatch(addOneSpot(newSpot))
    } catch (error) {
      if (error) setErrors(Object.values(errors.errors));
    }
    if (createdSpot) {
      setErrors([])
      history.push(`/spots/${createdSpot.id}`)

    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
