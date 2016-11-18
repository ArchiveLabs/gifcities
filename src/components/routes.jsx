import React from 'react';
import {
  //browserHistory,
  Router, Route, IndexRoute
} from 'react-router';
import RootComponent from './root.jsx';
import HomeComponent from './home.jsx';
import SearchResultsComponent from './search-results.jsx';
import jQuery from 'jquery';


//import { createHashHistory } from 'history';
//import { useRouterHistory } from 'react-router';
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';
const browserHistory = useRouterHistory(createHistory)({
  // basename: '/~richard/projectx'
});

export default (
  <Router
      history={browserHistory}
      onUpdate={function() {
        window.scrollTo(0, 0);
        // for legacy reasons, keep a hash for className
        var path = '#' + this.state.location.pathname;
        document.body.className = path.replace('#', 'hash').replace('/', 'slash');
      }}
  >
    <Route path="/" component={RootComponent}>
      <IndexRoute component={HomeComponent} />
    </Route>
  </Router>
);
