import React from 'react';
import {
  browserHistory, hashHistory, Router, Route, IndexRoute
} from 'react-router';
import RootComponent from './root.jsx';
import HomeComponent from './home.jsx';
import SearchResultsComponent from './search-results.jsx';

import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// Declarative route configuration
// note set history=browserHistory to use history api

export default (
  <Router history={appHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={RootComponent}>
      <Route path="/" component={HomeComponent}>
        <Route path="/:query" component={SearchResultsComponent}/>
      </Route>
      <IndexRoute component={HomeComponent} />
    </Route>
  </Router>
);
