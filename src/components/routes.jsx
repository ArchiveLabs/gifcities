import React from 'react';
import {
  browserHistory, hashHistory, Router, Route, IndexRoute
} from 'react-router';
import RootComponent from './root.jsx';
import HomeComponent from './home.jsx';
import SearchResultsComponent from './search-results.jsx';
import LiveResultsComponent from './live-results.jsx';
import AboutComponent from './about.jsx';
import TwentyComponent from './twenty.jsx';
import jQuery from 'jquery';


import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// Declarative route configuration
// note set history=browserHistory to use history api

export default (
  <Router
      history={appHistory}
      onUpdate={() => {
        window.scrollTo(0, 0);
        document.body.className = window.location.hash.replace('#', 'hash').replace('/', 'slash');
      }}
  >
    <Route path="/" component={RootComponent}>
      <Route path="/20" component={TwentyComponent}></Route>
      <Route path="/live" component={LiveResultsComponent}></Route>
      <Route path="/about-gifcities" component={AboutComponent}></Route>
      <Route path="/" component={HomeComponent}>
        <Route path="/:query" component={SearchResultsComponent}/>
      </Route>
      <IndexRoute component={HomeComponent} />
    </Route>
  </Router>
);
