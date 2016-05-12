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
    getInitialState() {
      return {
        results: [],
        isLoading: false,
      };
    },
    loadResults(query) {
      this.setState({isLoading: true, results: []});

      // mock
      // var url = 'mock_data.json';

      // live
      var url = '//vinay-dev.us.archive.org:8091/api/v1/gifsearch?q=';
      url = url + encodeURIComponent(query);

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
    componentDidMount() {
      this.loadResults(this.props.params.query);
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.params.query !== nextProps.params.query) {
        this.loadResults(nextProps.params.query);
      }
    },
    render() {
      // loader is while ajax is waiting
      var loaderEl;
      if (this.state.isLoading) {
        loaderEl = (<Loader></Loader>);
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
