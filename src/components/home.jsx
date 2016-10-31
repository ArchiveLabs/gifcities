import React from 'react';
import { Link, withRouter } from 'react-router';
import jQuery from 'jquery';
import Loader from './loader.jsx';
import SearchResults from './search-results.jsx';
import About from './about.jsx';

export default withRouter(
  React.createClass({
    getInitialState() {
      var notrack = 0; // tracking on by default now
      var initialInputValue = '';
      if (this.props.location.query.q) {
        // Support better URL. eg gificities.org?q=snowglobe
        initialInputValue = this.props.location.query.q;
      }
      return {
        inputValue: initialInputValue,
        searchValue: initialInputValue,
        notrack: notrack,
        randomSeed: Math.random() * 1000,
      };
    },
    componentDidMount() {
      if (this.props.location.hash) {
       // Backwards compatible for old links (eg gifcities.org/#/snowglobe
       var initialInputValue = this.props.location.hash.replace('#/', '');
       //  history.replaceState({}, document.title, "/?q=" + initialInputValue);
       if (initialInputValue === 'about-gifcities') {
         this.props.history.push(Object.assign({}, this.props.location, {
           query: {'about-gifcities': null},
           hash: ''
         }));
       } else {
         this.props.history.push(Object.assign({}, this.props.location, {
           query: {q: decodeURIComponent(initialInputValue)},
           hash: ''
         }));
       }
     }
    },
    handleInputChange(e) {
      e.preventDefault();
      this.setState({inputValue: e.target.value});
    },
    handleSubmit(e) {
      if (e !== undefined) {
        e.preventDefault();
      }
      var val = this.state.inputValue || '';
      this.setState({
        searchValue: val,
        randomSeed: Math.random() * 1000
      });
      var query = {};
      if (val) {
        query.q = val;
      }
      this.props.history.push(Object.assign({}, this.props.location, {query: query}));
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location.query.q !== nextProps.location.query.q &&
          this.state.inputValue !== nextProps.location.query.q) {
        this.setState({
          inputValue: nextProps.location.query.q,
          searchValue: nextProps.location.query.q
        });
      }
    },
    renderHomeText() {
      return (
        <div className="home-text">
          <h1>GifCities</h1>
          <h2>The GeoCities Animated GIF Search Engine</h2>
          <span className="a-project-of">from the Internet Archive</span><br/>
          <a href="https://archive.org" target="_blank">
            <img className="ia-img" width="128" height="128" src="assets/spinning-internetarchive.gif" alt="Internet Archive"/>
          </a>
          <br/>
          <br/>
          <p>GifCities is a special project of the <a href="https://archive.org" target="_blank">Internet Archive</a> to celebrate 20 years of preserving the web. Internet Archive is a non-profit digital library of millions of free books, movies, software, music, websites, and more. Please <a href="https://archive.org/donate" target="_blank">donate</a> to help us in our efforts to provide “Universal Access to All Knowledge” including GIFs.</p>
          <br/>
          <a href="https://web.archive.org/web/20091027080430/http://www.geocities.com/lady_daisydew/CartoonCapers.html" target="_blank"><img width="140" height="104" src="assets/tomjerry.gif" /></a>
          <br/>
          <br/>
          <br/>
          Try <Link to={'?q=snowglobe'}>snowglobe</Link>, <Link to={'?q=butterfly'}>butterfly</Link>, <Link to={'?q=balloons'}>balloons</Link>, <Link to={'?q=star+wars'}>star wars</Link>
        </div>
      );
    },
    render() {
      if (this.props.location.query['about-gifcities'] !== undefined) {
        return <About />;
      }
      var homeText, searchResults;
      if (!this.state.searchValue) {
        homeText = this.renderHomeText();
      } else {
        searchResults = (
          <SearchResults
            notrack={this.state.notrack}
            randomize={false}
            randomSeed={this.state.randomSeed}
            query={this.state.searchValue}
          />
        );
      }

      return (
        <div className="home">
          <form onSubmit={this.handleSubmit}>
            <div className="search-box-wrapper">
              <div className="search-input-wrapper">
                <input
                  value={this.state.inputValue}
                  onChange={this.handleInputChange}
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
          {searchResults}
        </div>
      )
    }
  })
);
