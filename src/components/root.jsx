import { Link } from 'react-router'
import React from 'react';
import Header from './header.jsx';

export default React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});
