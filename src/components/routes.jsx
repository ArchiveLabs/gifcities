import React from 'react';
import {
  browserHistory, hashHistory, Router, Route, IndexRoute, Link, withRouter
} from 'react-router';
import RootComponent from './root.jsx';
import HomeComponent from './home.jsx';


// Declarative route configuration
// note set history=browserHistory to use history api

export default (
  <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={RootComponent}>
      <IndexRoute component={HomeComponent} />
    </Route>
  </Router>
);
