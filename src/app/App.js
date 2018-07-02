import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Map from './map.js';

const App = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="/login" to="/" />
      <Route path="/map" component={Map} />
    </Switch>
  </BrowserRouter>
);

export default App;
