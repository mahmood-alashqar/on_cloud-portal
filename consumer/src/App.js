import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { withAuth0 } from "@auth0/auth0-react";
import Profile from './components/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Header/>
              <Main />
            </Route>
            <Route exact path='/favorite'>
              <Profile />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default withAuth0(App)