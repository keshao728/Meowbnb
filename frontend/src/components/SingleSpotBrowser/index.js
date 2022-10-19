import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import './SingleSpotBrowser.css'

const SingleSpotBrowser = () => {
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const currSpot = useSelector(state => state.spots.singleSpot)
  console.log("this is the user's current spot", currSpot)

  useEffect((spotId) => {
    dispatch(getOneSpot(spotId))
  }, [dispatch])

  return (
    <div>
      <h1>MEOW MEOW MEOW</h1>
    </div>
  )
}
export default SingleSpotBrowser
