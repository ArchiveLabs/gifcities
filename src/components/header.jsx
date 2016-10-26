import { Link } from 'react-router'
import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="header">
        <div className="links">
          <Link to={'/'}><span className="logo">GifCities</span></Link>
          <Link to={'/about-gifcities'}>About</Link>

          <a className="donate" target="_blank" href="https://archive.org/donate/" title="Donate to Internet Archive">$$</a>
        </div>
        <div className="ia-logo"></div>
        <div className="floating-link">
          <a href="https://archive.org/donate/" target="_blank">
            <img
              src="https://web.archive.org/web/20090804113154/http://geocities.com/SunsetStrip/Lounge/7650/dollarspindownd.gif"
              alt="donate"
              title="Donate to the Internet Archive"
            />
          </a>
        </div>
      </div>
    );
  }
});
