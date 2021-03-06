import React from 'react';
import { Link, withRouter } from 'react-router';
import jQuery from 'jquery';
import ResultsPackery from './results-packery.jsx';
import Loader from './loader.jsx';
import SearchResultsComponent from './search-results.jsx';
import TitleText from './title-text.jsx';



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
    componentWillUnmount() {
      if (this.loadMoreInterval) {
        clearInterval(this.loadMoreInterval);
      }
      if (this.updateQueueInterval) {
        clearInterval(this.updateQueueInterval);
      }
    },
    initIntervals() {
      if (this.loadMoreInterval) {
        clearInterval(this.loadMoreInterval);
      }
      if (this.updateQueueInterval) {
        clearInterval(this.updateQueueInterval);
      }
      this.loadMoreInterval = setInterval(() => {
        var prevQueueLength = this.queue.length;
        this.loadMore(() => {
          if (prevQueueLength === 0 && this.queue.length > 0) {
            this.immediatelyShowQueue();
          }
        });
      }, 4500);
      this.updateQueueInterval = setInterval(this.updateQueueIndex, 10000);
    },
    getInitialState() {
      this.time = null;
      this.count = 0;
      this.queue = [];
      this.mostRecent = [];
      this.mostRecentMax = 10;
      this.idleQueue = [];
      this.popularIndex = 0;
      this.popularQueue = ['birthday',];
      return this.getQueueIndexState();
    },
    resetQueue() {
      this.queue = [];
      this.mostRecent = [];
      this.time = null;
      this.count = 0;
      this.initIntervals();
    },
    immediatelyShowQueue() {
      this.updateQueueIndex();
      this.initIntervals();
    },

    initQueueState(callback) {
      // get initial clock
      var initUrl = 'https://gifcities.archive.org/api/v1/manager?op=status';
      jQuery.getJSON(initUrl).then((data) => {
        this.time = data.time;
        this.count = data.count;
        callback(true);
      }, () => {
        callback(false);
      });
      // Fetch popular queries
      var popularUrl = 'https://gifcities.archive.org/api/v1/manager?op=popular&num=100';
      jQuery.getJSON(popularUrl).then((data) => {
        data.forEach((row, idx) => {
          if (this.popularQueue.indexOf(row[0] === -1)) {
            this.popularQueue.push(row[0]);
          }
        });
      });
    },
    /**
     * Load more from the API
     */
    loadMore(callback) {
      if (!callback) { callback = function(){}; }

      // Do Ajax
      if (this.time === null) {
        this.initQueueState((result) => {
          if (result === true) {
            this.loadMore(callback);
          } else {
            console.log('There was an error accessing the API');
          }
        })
      } else {
        // download latest live results
        var moreUrl = 'https://gifcities.archive.org/api/v1/manager?op=list&start=' + this.time;
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

    getQueueIndexState() {
      var inputValue, isUsingPopluar = false;
      if (this.queue.length > 0) {
        inputValue = this.queue.shift();
      } else if (this.idleQueue > 0) {
        inputValue = this.idleQueue.shift();
      } else {
        this.popularIndex = (this.popularIndex + 1) % this.popularQueue.length;
        inputValue = this.popularQueue[this.popularIndex];
        isUsingPopluar = true;
      }
      return {
        inputValue: inputValue,
        isUsingPopluar: isUsingPopluar
      };
    },

    updateQueueIndex() {
      this.setState(this.getQueueIndexState());
    },

    componentWillUnmount() {

    },
    render() {
      return (
        <div className="live-results">
          <h1 className="live-h1">
            <img
              src="assets/discolp.gif"
              alt="popular"
              style={{
                display: this.state.isUsingPopluar ? 'inline-block' : 'none'
              }}
            />
            <img
              src="assets/pgonair.gif"
              alt="on air"
              style={{
                display: this.state.isUsingPopluar ? 'none' : 'inline-block'
              }}
            />
            <span className="title-text-wrapper">
              <TitleText value={this.state.inputValue} />
            </span>
          </h1>

          <SearchResultsComponent
            query={this.state.inputValue}
            notrack={true}
            randomize={true} />
        </div>
      )
    }
  })
);
