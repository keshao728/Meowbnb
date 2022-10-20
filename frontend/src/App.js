import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotBrowser from "./components/SpotBrowser"
import HostSpot from "./components/HostSpot"
import UserSpots from "./components/UserSpots"
import UpdateSpot from "./components/UpdateSpot"
import SingleSpotBrowser from "./components/SingleSpotBrowser"
import ReviewSpot from "./components/ReviewSpot"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const reviews = useSelector(state => state.reviews)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotBrowser />
          </Route>

          <Route path='/spots/create'>
            <HostSpot />
          </Route>

          <Route path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>

          <Route exact path='/spots/my-spots'>
            <UserSpots />
          </Route>

          <Route path='/spots/:spotId/review'>
            <ReviewSpot />
          </Route>

          <Route exact path='/spots/:spotId'>
            <SingleSpotBrowser />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
