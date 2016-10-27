import { Link } from 'react-router'
import React from 'react';
import Header from './header.jsx';

export default React.createClass({
  render: function() {
    var hideTopLogo = false;
    if (this.props.params.query) {
      hideTopLogo = true;
    }
    return (
      <div>
        <Header hideTopLogo={hideTopLogo} />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});
