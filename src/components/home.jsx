import React from 'react';
import { Link, withRouter } from 'react-router';
import jQuery from 'jquery';
import Results from './results.jsx';
import ResultsMasonry from './results-masonry.jsx';
import ResultsPackery from './results-packery.jsx';
import ResultsInfinite from './results-infinite.jsx';
import Loader from './loader.jsx';

// history stuff
import { browserHistory, hashHistory } from 'react-router';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


// Note relies on this.props.params.id (set via react-router)
export default withRouter(
  React.createClass({
    getInitialState() {
      // Look at cookies...
      var notrack;
      if (document.cookie.indexOf('happybirthday') >= 0) {
        notrack = 0;
      } else {
        notrack = 1;
      }
      return {
        inputValue: this.props.params.query || '',
        notrack: notrack
      };
    },
    handleChange(event) {
      this.setState({inputValue: event.target.value});
    },
    handleSubmit(e) {
      if (e !== undefined) {
        e.preventDefault();
      }
      appHistory.push(this.state.inputValue);
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.params.query !== nextProps.params.query) {
        this.setState({inputValue: nextProps.params.query});
      }
    },
    renderHomeText() {
      return (
        <div className="home-text">
          <h1>GifCities</h1>
          <h2>The Geocities Animated GIF Search Engine</h2>
          <br/>
          <span className="a-project-of">A Project of</span><br/>
          <img className="ia-img" width="50" height="50" src="assets/internetarchive.svg" />
          <img width="430" height="77" src="assets/Internet.gif" />
          <img width="193" height="74" src="assets/archive.gif" />
          <br/>
          <br/>
          <p>GifCities is a special project of the <a href="https://archive.org" target="_blank">Internet Archive</a> to celebrate 20 years of preserving the web. Internet Archive is a non-profit digital library of millions of free books, movies, software, music, websites, and more. Please <a href="https://archive.org/donate" target="_blank">donate</a> to help us in our efforts to provide “Universal Access to All Knowledge.”</p>
          <br/>
          <img width="140" height="104" src="assets/tomjerry.gif" />
        </div>
      );
    },
    render() {
      var homeText;
      if (!this.props.params.query) {
        homeText = this.renderHomeText();
      }
      var extraGif;
      if (this.state.notrack === 0) {
        extraGif = <img
          src="assets/YELLOW_BLINK_0.GIF"
          width="28"
          height="28"
          title="Your queries will be fed into the projection"
          onClick={()=>{
            document.cookie = "happybirthday=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            this.setState({notrack: 1});
          }}
        />;
      }
      return (
        <div className="home">
          <form onSubmit={this.handleSubmit}>
            <div className="search-box-wrapper">
              {extraGif}
              <div className="search-input-wrapper">
                <input
                  value={this.state.inputValue}
                  onChange={this.handleChange}
                  className="search-input"
                  type="text"
                />
              </div>
              <div className="search-img-wrapper">
                <img src="assets/search.gif" onClick={this.handleSubmit} />
              </div>
            </div>
          </form>
          {homeText}
          {this.props.children && React.cloneElement(this.props.children, {
            notrack: this.state.notrack
          })}
        </div>
      )
    }
  })
);
