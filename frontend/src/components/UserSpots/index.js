import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentSpots, deleteSpot } from "../../store/spots"
import { NavLink, Redirect } from "react-router-dom"

const UserSpots = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector(state => state.spots.allSpots)
  // const testSpots = useSelector(state => state.spots)
  // console.log('this is a test', testSpots)
  const allSpotsArr = Object.values(allSpots)
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getCurrentSpots())
  }, [dispatch])

  const ownedSpots = allSpotsArr?.filter((spot) => spot.ownerId === sessionUser.id);
  // console.log('Owned Spot - UserSpots Component', ownedSpots)

  if (!ownedSpots || !ownedSpots.length) {
    return <h2> MEOWMEOW No Spots </h2>
  }

  //FIXME - redirect issue
  if (!sessionUser) {
    return <Redirect to="/" />
  }


  // const deleteUserSpot = async (spotId) => {
  //   await dispatch(deleteSpot(spotId))
  // }

  const spotDetails = ownedSpots?.map(spot => {
    return (
      <div className="all-spot">
        <NavLink className="spots" to={`spots/${spot.id}`}>
          <div className="individual-spots">
            <div>
              <img className="spot-image" key={spot.previewImage} src={spot.previewImage} alt={spot.previewImage} />
            </div>
            <div className="spot-info">
              <div className="address-star" key={spot.name}>{spot.city}, {spot.state}
                <span className="spot-star">
                  <i className="fa-solid fa-star"></i>
                  &nbsp;
                  {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(2) : 'New'}
                </span>
              </div>
              <div>
                <strong>
                  ${spot.price}
                </strong>
                &nbsp;
                night
              </div>
            </div>
          </div>
        </NavLink>
        {/* should i put edit here too? */}
        <div>
          <button className="delete"
            onClick={() => dispatch(deleteSpot(spot.id))}>
            Delete
          </button>
          <div>
            <NavLink to="/spots/edit">
              <button className="delete">
                Edit
              </button>
            </NavLink>
            {/* <button className="logout-button" onClick={() => history.push('/my-spots')}>My Spot</button> */}
          </div>
        </div>
      </div>
    )
  })


  return (
    <div>
      {spotDetails}
    </div>
  )
}



//   return (
//     <div>
//       {ownedSpots?.map((spot) => (
//         <div className="all-spot">
//           <NavLink className="spots" to={`/spots/${spot.id}`}>
//             <div className="individual-spots">
//               <div>
//                 <img className="spot-image" key={spot.previewImage} src={spot.previewImage} alt={spot.previewImage} />
//               </div>

//               <div className="spot-info">
//                 <div className="address-star" key={spot.name}>{spot.city}, {spot.state}
//                   <span className="spot-star">
//                     <i className="fa-solid fa-star"></i>
//                     &nbsp;
//                     {spot.avgRating > 0 ? Number(spot.avgRating).toFixed(2) : 'New'}
//                   </span>
//                 </div>
//                 <div>
//                   <strong>
//                     ${spot.price}
//                   </strong>
//                   &nbsp;
//                   night
//                 </div>
//               </div>

//             </div>
//           </NavLink>

//           <div>
//             <button className="delete"
//               onClick={() => deleteUserSpot}>
//               Delete
//             </button>
//           </div>

//         </div>
//       )}
//     </div>
//   )
// }
export default UserSpots
