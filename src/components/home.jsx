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
    render() {
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
          {this.props.children}
        </div>
      )
    }
  })
);
