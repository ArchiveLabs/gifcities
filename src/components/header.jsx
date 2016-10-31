import { Link } from 'react-router'
import React from 'react';

export default React.createClass({
  render: function() {
    var IaLogo;
    if (true || this.props.hideTopLogo) {
      IaLogo = (<div className="ia-logo">
        <a href="https://archive.org" target="_blank">
          <span>Internet</span>
          <img src="assets/internetarchive.svg"  width="40" height="40" />
          <span>Archive</span>
        </a>
      </div>);
    }
    return (
      <div className="header">
        <div className="links">
          <Link to={'/'}><span className="logo">Home</span></Link>
          <Link to={'/?about-gifcities'}>About</Link>
          <a className="donate" target="_blank" href="https://archive.org/donate/" title="Donate to Internet Archive">$$</a>
        </div>
        {IaLogo}

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
