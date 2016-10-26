import React from 'react';
import { withRouter } from 'react-router';

// history stuff
import { browserHistory, hashHistory } from 'react-router';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


export default withRouter(React.createClass({
  componentWillMount: function() {
    document.cookie = "happybirthday=1; path=/";
    appHistory.push('/');
  },
  render: function() {
    return (
      <div>20</div>
    );
  }
}));
