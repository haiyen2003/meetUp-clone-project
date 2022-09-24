// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Groups from './components/Groups'
import GroupDetails from "./components/GroupDetails";
import CreateGroupForm from "./components/CreateGroup";
import CreateEventForm from "./components/CreateEvent";
import EditGroupForm from "./components/EditGroupForm";
import Events from './components/Events';
import EventDetails from "./components/EventDetails";
import EditEventForm from "./components/EditEventForm";
import Home from "./components/Home";

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
<<<<<<< HEAD
          <Route exact path = '/'>
            <Home />
=======
           <Route exact path="/">
            <Home/>
>>>>>>> 6f4e6872fc73768597fff9cbcc84700f33f61549
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/groups/:groupId/events/new'>
            <CreateEventForm />
          </Route>
          <Route exact path="/events/:eventId/edit">
            <EditEventForm />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route exact path='/groups/:groupId/edit'>
            <EditGroupForm />
          </Route>
          <Route exact path='/groups/new'>
            <CreateGroupForm />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
