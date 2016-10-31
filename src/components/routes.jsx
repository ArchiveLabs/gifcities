import React from 'react';
import {
  browserHistory, Router, Route, IndexRoute
} from 'react-router';
import RootComponent from './root.jsx';
import HomeComponent from './home.jsx';
import SearchResultsComponent from './search-results.jsx';
import LiveResultsComponent from './live-results.jsx';
import jQuery from 'jquery';


//import { createHashHistory } from 'history';
//import { useRouterHistory } from 'react-router';
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default (
  <Router
      history={browserHistory}
      onUpdate={() => {
        window.scrollTo(0, 0);
        document.body.className = window.location.hash.replace('#', 'hash').replace('/', 'slash');
      }}
  >
    <Route path="/" component={RootComponent}>
      <Route path="/x/live" component={LiveResultsComponent}></Route>
      <IndexRoute component={HomeComponent} />
    </Route>
  </Router>
);
