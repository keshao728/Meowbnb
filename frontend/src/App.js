import * as sessionActions from "./store/session";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import FilteredSpots from "./components/SpotBrowser/FilteredSpots"
import HostSpot from "./components/HostSpot"
import UserSpots from "./components/UserSpots"
import SingleSpotBrowser from "./components/SingleSpotBrowser"
import ReviewSpot from "./components/ReviewSpot"
import UserReviews from "./components/UserReview";
import UserBookings from "./components/UserBooking";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <FilteredSpots />
          </Route>

          <Route path='/spots/create'>
            <HostSpot />
          </Route>

          <Route exact path='/spots/hosting'>
            <UserSpots />
          </Route>

          <Route exact path='/spots/trips'>
            <UserBookings />
          </Route>
          
          <Route path='/spots/my-reviews'>
            <UserReviews />
          </Route>

          <Route exact path='/spots/:spotId'>
            <SingleSpotBrowser />
          </Route>

          <Route path='/spots/:spotId/review'>
            <ReviewSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
