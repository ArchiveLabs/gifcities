import React from 'react';
import { Link, withRouter } from 'react-router';
import Results from './results.jsx';
import jQuery from 'jquery';

// Note relies on this.props.params.id (set via react-router)
export default withRouter(
  React.createClass({
    getInitialState: function() {
      return {inputValue: '', results: []};
    },
    handleChange(event) {
      this.setState({inputValue: event.target.value});
    },
    handleSubmit() {
      console.log('handle submit');
      // TODO change route
      // TODO do ajax and display results
      jQuery.ajax({
        url: 'mock_data.json',
      }).then((data) => {
        console.log(data);
        this.setState({results: data});
      }, () => {
        // TODO display error to user
        console.log('error fetching data');
      });
    },
    render() {
      return (
        <div className="home">
          <h1>GIF Search</h1>
          <div className="search-box-wrapper">
            <img
              className="search-icon"
              src="assets/search-blue.svg"
            />
            <input
              value={this.state.inputValue}
              onChange={this.handleChange}
              className="search-input"
              type="text"
            />
            <button
              className="search-button"
              onClick={this.handleSubmit}>
              Search
            </button>
          </div>
          <div>{this.state.inputValue}</div>
          <div>
            <Results results={this.state.results}></Results>
          </div>
        </div>
      )
    }
  })
);
