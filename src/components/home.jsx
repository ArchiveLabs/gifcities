import React from 'react';
import { Link, withRouter } from 'react-router';
import jQuery from 'jquery';
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
      var notrack = 0; // tracking on by default now
      return {
        inputValue: this.props.params.query || '',
        notrack: notrack,
        randomSeed: Math.random() * 1000
      };
    },
    handleChange(event) {
      this.setState({inputValue: event.target.value || ''});
    },
    handleSubmit(e) {
      if (e !== undefined) {
        e.preventDefault();
      }
      var val = this.state.inputValue || '';
      this.setState({
        inputValue: val,
        randomSeed: Math.random() * 1000
      });
      appHistory.push(val);
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.params.query !== nextProps.params.query &&
          this.state.inputValue !== nextProps.params.query) {
        this.setState({inputValue: nextProps.params.query});
      }
    },
    renderHomeText() {
      return (
        <div className="home-text">
          <h1>GifCities</h1>
          <h2>The Geocities Animated GIF Search Engine</h2>
          <span className="a-project-of">from the Internet Archive</span><br/>
          <a href="https://archive.org" target="_blank">
            <img className="ia-img" width="128" height="128" src="assets/spinning-internetarchive.gif" alt="Internet Archive"/>
          </a>
          <br/>
          <br/>
          <p>GifCities is a special project of the <a href="https://archive.org" target="_blank">Internet Archive</a> to celebrate 20 years of preserving the web. Internet Archive is a non-profit digital library of millions of free books, movies, software, music, websites, and more. Please <a href="https://archive.org/donate" target="_blank">donate</a> to help us in our efforts to provide “Universal Access to All Knowledge.”</p>
          <br/>
          <a href="https://web.archive.org/web/20091027080430/http://www.geocities.com/lady_daisydew/CartoonCapers.html" target="_blank"><img width="140" height="104" src="assets/tomjerry.gif" /></a>
          <br/>
          <br/>
          <br/>
          Try <Link to={'snowglobe'}>snowglobe</Link>, <Link to={'butterfly'}>butterfly</Link>, <Link to={'balloons'}>balloons</Link>, <Link to={'star wars'}>star wars</Link>
        </div>
      );
    },
    render() {
      var homeText;
      if (!this.props.params.query) {
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
          {this.props.children && React.cloneElement(this.props.children, {
            notrack: this.state.notrack,
            randomize: true,
            randomSeed: this.state.randomSeed,
            query: this.state.inputValue,
          })}
        </div>
      )
    }
  })
);
