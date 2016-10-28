import React from 'react';
import { Link, withRouter } from 'react-router';
import jQuery from 'jquery';
import ResultsPackery from './results-packery.jsx';
import Loader from './loader.jsx';

// Note relies on this.props.params.id (set via react-router)
export default withRouter(
  React.createClass({
    getInitialState() {
      return {
        results: [],
        isLoading: false,
        isError: false,
      };
    },
    loadResults(query) {
      this.setState({isLoading: true, results: [], isError: false});

      var url = 'https://wbgrp-svc060.us.archive.org/api/v1/gifsearch?q=';
      url = url + encodeURIComponent(query);

      // pardon my verbose logic... it's late
      if (this.props.notrack !== undefined) {
        if (Number(this.props.notrack) === 1) {
          url = url + '&notrack=1';
        }
      }
      // console.log(data);
      if (this.props.randomize == true) {
        url = url + '&random=1';
      }
      // add random seed
      url = url + '&seed=' + this.props.randomSeed;

      jQuery.ajax({
        url: url,
      }).then((data) => {
        this.setState({results: data, isLoading: false});
      }, () => {
        // TODO display error to user
        console.log('error fetching data');
        this.setState({isLoading: false, isError: true});
      });
    },
    componentDidMount() {
      var query;
      if (this.props.query) {
        query = this.props.query;
      } else {
        query = this.props.params.query;
      }
      this.loadResults(query);
    },
    componentWillUnmount() {

    },
    componentWillReceiveProps(nextProps) {
      if (this.props.randomSeed === nextProps.randomSeed) {
        return;
      }
      if (nextProps.query !== undefined) {
        this.loadResults(nextProps.query);
      } else if (nextProps.params.query !== undefined) {
        this.loadResults(nextProps.params.query);
      }
    },
    render() {
      // loader is while ajax is waiting
      var loaderEl;
      if (this.state.isLoading) {
        loaderEl = (<Loader></Loader>);
      }
      var errorEl;
      if (this.state.isError) {
        errorEl = (<div>There was a server error :(</div>)
      }
      return (
        <div className="results-wrapper">
          {loaderEl}
          <ResultsPackery results={this.state.results} />
        </div>
      )
    }
  })
);
