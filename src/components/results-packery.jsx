import { Link } from 'react-router'
import React from 'react';
import Packery from './custom-packery.jsx';
// var Packery = require('react-packery-component')(React);
import VisibilitySensor from 'react-visibility-sensor';


var options = {
    transitionDuration: 0,
    gutter: 60,
    stamp: '.stamp',
};

export default React.createClass({
  propTypes: {
    /**
       [{
         "weight": 347,
         "gif": "20091019045002/http://www.geocities.com/jiffyjamz/StArTrEk/NeWtReKsPiNnA.gif",
         "checksum": "HUIJLTACP3HITNMU6GTNQVHE2WJLDAJ4",
         "page": "https://web.archive.org/web/20091022020929/http://geocities.com/mrjiffyjamz/BOSTON/NEPATRiOTS/FAMERPATZ.html",
         "url_text": "jiffy jamz star trek new trek spinna"
       },]
     */
    results: React.PropTypes.array,
  },
  getInitialState() {
    return {
      offset: 40
    };
  },
  onVisibillityChange(isVisible) {
    if (isVisible === true && this.state.offset < this.props.results.length) {
      this.setState({offset: this.state.offset + 40});
      console.log(this.state.offset);
    }
  },

  render() {
    var children = this.props.results.slice(0, this.state.offset).map((row, idx) => {
      if (row.page !== 'https://web.archive.org/') {
        var url = 'https://web.archive.org/web/' + row.gif;
        return (
          <div>
            <a key={idx} href={row.page}>
              <img src={url} title={row.url_text} />
            </a>
          </div>
        )
      } else {
        var url = 'https://web.archive.org/web/' + row.gif;
        return (
          <div>
            <img src={url} title={row.url_text} />
          </div>
        )
      }
    });
    var stampEl;
    if (children.length > 0) {
      stampEl = (<div ref="stamp" className="stamp"></div>);
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
        <VisibilitySensor
          className="VisibilitySensor"
          partialVisibility={true}
          onChange={this.onVisibillityChange} />
      </div>
    );
  }
});
