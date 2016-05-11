import { Link } from 'react-router'
import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});
