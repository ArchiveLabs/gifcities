import React from 'react';
import { Link, withRouter } from 'react-router';
import jQuery from 'jquery';
import Results from './results.jsx';
import ResultsMasonry from './results-masonry.jsx';
import ResultsPackery from './results-packery.jsx';
import ResultsInfinite from './results-infinite.jsx';
import Loader from './loader.jsx';

// Note relies on this.props.params.id (set via react-router)
export default withRouter(
  React.createClass({
    getInitialState: function() {
      return {
        inputValue: '',
        results: [],
        isLoading: false,
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
      this.setState({isLoading: true, results: []});

      // TODO change route
      var url;

      // mock
      // url = 'mock_data.json';
      // live
      url = '//vinay-dev.us.archive.org:8091/api/v1/gifsearch?q=';
      url = url + encodeURIComponent(this.state.inputValue);

      jQuery.ajax({
        url: url,
      }).then((data) => {
        // console.log(data);
        this.setState({results: data, isLoading: false});
      }, () => {
        // TODO display error to user
        console.log('error fetching data');
        this.setState({isLoading: false});
      });
    },
    render() {
      // loader is while ajax is waiting
      var loaderEl;
      if (this.state.isLoading) {
        loaderEl = (<Loader></Loader>);
      }
      return (
        <div className="home">
          <form onSubmit={this.handleSubmit}>
            <div className="search-box-wrapper">
              {/*<img
                className="search-icon"
                src="assets/search-blue.svg"
              />*/}
              <input
                value={this.state.inputValue}
                onChange={this.handleChange}
                className="search-input"
                type="text"
              />
              <img src="assets/search.gif" onClick={this.handleSubmit} />
            </div>
          </form>
          {loaderEl}
          <div className="results-wrapper">
            <ResultsPackery results={this.state.results} />
          </div>
        </div>
      )
    }
  })
);
