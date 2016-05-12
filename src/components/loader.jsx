import React from 'react';

export default React.createClass({
  render() {
    var url;
    if (this.props.loaderIndex === 1) {
      url = "assets/loading3.gif";
    } else {
      url = "assets/loading1.gif";
    }
    return (<img className="loader" src={url} alt="Loading..."/>);
  }
});
