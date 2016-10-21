import React from 'react';
import { Link, withRouter } from 'react-router';
import jQuery from 'jquery';
import Results from './results.jsx';
import ResultsMasonry from './results-masonry.jsx';
import ResultsPackery from './results-packery.jsx';
import ResultsInfinite from './results-infinite.jsx';
import Loader from './loader.jsx';
import SearchResultsComponent from './search-results.jsx';


// history stuff
import { browserHistory, hashHistory } from 'react-router';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


// Note relies on this.props.params.id (set via react-router)
export default withRouter(
  React.createClass({
    componentWillMount() {
      this.loadMore = this.loadMore.bind(this);
      this.updateQueueIndex = this.updateQueueIndex.bind(this);
      this.initIntervals = this.initIntervals.bind(this);

      this.loadMore(this.updateQueueIndex);
      this.initIntervals();

      jQuery(document).keydown((key) => {
        // console.log(key.which);
        switch(key.which) {
          case 88: // x
            console.log('resetting');
            this.resetQueue();
            break;
          case 39: // right arrow
            console.log('skipping');
            this.initIntervals();
            this.updateQueueIndex();
            break;
          default:
            console.log('x: reset, right-arrow: skipping');
            break;
        }
      });
    },
    initIntervals() {
      if (this.loadMoreInterval) {
        clearInterval(this.loadMoreInterval);
      }
      if (this.updateQueueInterval) {
        clearInterval(this.updateQueueInterval);
      }
      this.loadMoreInterval = setInterval(this.loadMore, 10000);
      this.updateQueueInterval = setInterval(this.updateQueueIndex, 10000);
    },
    getInitialState() {
      this.time = null;
      this.count = 0;
      this.queue = ['snow globe'];
      this.mostRecent = [];
      this.mostRecentMax = 10;

      var inputValue;
      if (this.queue.length > 0) {
        inputValue = this.queue.shift();
      } else {
        inputValue = '';
      }
      return {
        inputValue: inputValue
      };
    },
    resetQueue() {
      this.queue = [];
      this.mostRecent = [];
      this.time = null;
      this.count = 0;
      this.initIntervals();
    },
    initQueueState(callback) {
      // get initial clock
      if (this.time === null) {
        var initUrl = 'http://vinay-dev.us.archive.org:8091/api/v1/manager?op=status';
        jQuery.getJSON(initUrl).then((data) => {
          this.time = data.time;
          this.count = data.count;
          callback(true);
        }, () => {
          callback(false);
        });
      }
    },
    loadMore(callback) {
      if (!callback) { callback = function(){}; }

      // Do Ajax
      if (this.time === null) {
        this.initQueueState((result) => {
          if (result === true) {
            this.loadMore(callback);
          } else {
            alert('There was an error accessing the API');
          }
        })
      } else {
        // live
        var moreUrl = 'http://vinay-dev.us.archive.org:8091/api/v1/manager?op=list&start=' + this.time;
        jQuery.getJSON(moreUrl).then((data) => {
          if (data.length > 0) {
            this.time = data[data.length - 1].split('|')[0];
            this.time = Number(this.time) + 1; // Note we add 1 to get results "after"
            data.forEach((row, index) => {
              var val = row.split('|')[1];
              if (this.mostRecent.indexOf(val) === -1) {
                this.queue.push(val);
                this.mostRecent.push(val);
                if (this.mostRecent.length > this.mostRecentMax) {
                  this.mostRecent.shift();
                }
              }
            });
            callback();
          }
        });
      }
    },

    updateQueueIndex() {
      if (this.queue.length > 0) {
        var inputValue = this.queue.shift();
        this.setState({inputValue: inputValue});
      }
    },

    // componentWillReceiveProps(nextProps) {
    //   if (this.props.query !== nextProps.query) {
    //     this.setState({inputValue: nextProps.query});
    //   }
    // },
    componentWillUnmount() {

    },
    render() {
      return (
        <div className="live-results">
          <h1>Live: "{this.state.inputValue}"</h1>
          <SearchResultsComponent
            query={this.state.inputValue}
            notrack={true}
            randomize={true} />
        </div>
      )
    }
  })
);
