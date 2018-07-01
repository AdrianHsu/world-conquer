import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ZoomPan from './map.js';
import TEST from './test.js';
// import SignUp from './SignUp.js';
// import Blog from './Blog.js';

const App = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ZoomPan} />
      <Route path="/sheet" component={TEST} />
      {/* <Route path="/signup" component={SignUp} />
      <Redirect from="/login" to="/" />
      <Route path="/blog/" component={Blog} />
      <Route path="/blog/:id" component={Blog} /> */}
    </Switch>
  </BrowserRouter>
);

export default App;
