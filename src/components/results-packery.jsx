import { Link } from 'react-router'
import React from 'react';
import Packery from './custom-packery.jsx';
// var Packery = require('react-packery-component')(React);
import VisibilitySensor from 'react-visibility-sensor';
import Loader from './loader.jsx';


var options = {
    transitionDuration: 0,
    gutter: 60,
    stamp: '.stamp',
};

var pageSize = 20;

export default React.createClass({
  /**
     results: [{
       "weight": 347,
       "gif": "20091019045002/http://www.geocities.com/jiffyjamz/StArTrEk/NeWtReKsPiNnA.gif",
       "checksum": "HUIJLTACP3HITNMU6GTNQVHE2WJLDAJ4",
       "page": "https://web.archive.org/web/20091022020929/http://geocities.com/mrjiffyjamz/BOSTON/NEPATRiOTS/FAMERPATZ.html",
       "url_text": "jiffy jamz star trek new trek spinna",
       "width: "..."
       height: "..."
     },]
   */
  // propTypes: {
  //   results: React.PropTypes.array,
  // },
  getInitialState() {
    return {
      offset: pageSize
    };
  },
  onVisibillityChange(isVisible) {
    // console.log('onVisibillityChange', isVisible);
    if (isVisible === true && this.state.offset < this.props.results.length) {
      this.setState({offset: this.state.offset + pageSize});
      // console.log(this.state.offset);
    }
  },

  render() {
    var children = this.props.results.slice(0, this.state.offset).map((row, idx) => {
      var url = 'https://web.archive.org/web/' + row.gif;
      var img = <img src={url} title={row.url_text} width={row.width} height={row.height} />;
      if (row.page !== 'https://web.archive.org/') {
        return (
          <div key={idx}>
            <a href={row.page} target="_blank">
              {img}
            </a>
          </div>
        )
      } else {
        return <div key={idx}>{img}</div>;
      }
    });
    var stampEl;
    if (children.length > 0) {
      stampEl = (<div ref="stamp" className="stamp"></div>);
    }
    var loader;
    if (this.state.offset < this.props.results.length) {
      loader = <Loader loaderIndex={1}></Loader>;
    }
    return (
      <div>
        <Packery
          elementType={'div'}
          options={options}
          disableImagesLoaded={false}
        >
          {stampEl}
          {children}
        </Packery>
        <div className="VisibilitySensor">
          {loader}
          <VisibilitySensor
            partialVisibility={false}
            onChange={this.onVisibillityChange} />
        </div>

      </div>
    );
  }
});
