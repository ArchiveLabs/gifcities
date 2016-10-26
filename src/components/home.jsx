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
      return {
        inputValue: this.props.params.query || '',
      };
    },
    handleChange(event) {
      this.setState({inputValue: event.target.value});
    },
    handleSubmit(e) {
      console.log('handle submit');
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
        <div>
          <h1>GifCities<br/>
  The Geocities Animated GIF Search Engine</h1>
          <br/>
          A Project of<br/>
        <img src="https://web.archive.org/web/20090829162203/http://geocities.com/Athens/Forum/7243/Internet.gif" />
        <img src="https://web.archive.org/web/20090831021236/http://www.geocities.com/diabloiixpacfaq/archive.gif" />
          <p>GifCities is a special project of the Internet Archive to celebrate 20 years of preserving the web. Internet Archive is a non-profit digital library of millions of free books, movies, software, music, websites, and more. Please donate to help us in our efforts to provide “Universal Access to All Knowledge.”</p>
        </div>
      );
    },
    render() {
      var homeText;
      if (this.state.inputValue === '') {
        homeText = this.renderHomeText();
      }
      return (
        <div className="home">
          <form onSubmit={this.handleSubmit}>
            <div className="search-box-wrapper">
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
          {this.props.children}
        </div>
      )
    }
  })
);
