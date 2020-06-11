import React from 'react';
import VisibleUsers from '../../Containers/VisibleUsers'
import HeaderHandler from '../../Containers/HeaderHandler'
import Login from '../../Containers/Login'
import CreateHandler from '../../Containers/CreateHandler'
import ProfileHandler from '../../Containers/ProfileHandler'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Profile from '../Profile/Profile'

const NoMatch = () => {
  return (
    <h1> No such page found </h1>
  )
}



// const Create = () => <h1> Create a Page </h1>



function App() {
  return (
    <Router>
    {
    <Login />
    }
      <HeaderHandler />
      <div className="viewport">
        <Switch>

          <Route exact path="/">
            <VisibleUsers />
          </Route>

          <Route path="/users/:userID" >
            <ProfileHandler />
          </Route>

          <Route path="/create">
            <CreateHandler />
          </Route>


          <Route path="/users">
            <VisibleUsers />
          </Route>

          <Route>
            <NoMatch />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
