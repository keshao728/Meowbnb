import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import './SingleSpotBrowser.css'

const SingleSpotBrowser = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { spotId } = useParams()

  const currSpot = useSelector(state => state.spots.singleSpot)
  const sessionUser = useSelector((state) => state.session.user)

  // console.log("this is the user's current spot", currSpot)

  useEffect(() => {
    dispatch(getOneSpot(spotId))
    .then(()=>setIsLoaded(true))
  }, [dispatch, spotId])


  return isLoaded && (
    <div className="browser-wrapper">
      {currSpot.id &&
        <div className="single-spot-parent">
          <strong className="spot-name">
            {currSpot.name}
          </strong>

          <div className="spot-details">
            <div className="spot-star">
              <i className="fa-solid fa-star"></i>
              &nbsp;
              {currSpot.avgRating > 0 ? Number(currSpot.avgRating).toFixed(2) : 'New'}
              &nbsp;&nbsp;·
            </div>

            <div className="address" key={currSpot.name}>
              {currSpot.city}, {currSpot.state}, {currSpot.country}
            </div>
          </div>

          <div className="all-images">
            <img className="big-image" src={currSpot.SpotImages[0]?.url}></img>
          </div>

          <div className="spot-hosted">
            <div> Spot hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}</div>
          </div>

          <div>
            <strong>
              ${currSpot.price}
            </strong>
            &nbsp;
            night
          </div>

          <div>
            <div className="spot-description">
              {currSpot.description}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SingleSpotBrowser
