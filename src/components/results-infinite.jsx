import { Link } from 'react-router'
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import Loader from './loader.jsx';

export default React.createClass({
  propTypes: {
    /**
       [{
         "weight": 347,
         "gif": "20091019045002/http://www.geocities.com/jiffyjamz/StArTrEk/NeWtReKsPiNnA.gif",
         "checksum": "HUIJLTACP3HITNMU6GTNQVHE2WJLDAJ4",
         "page": "https://web.archive.org/web/20091022020929/http://geocities.com/mrjiffyjamz/BOSTON/NEPATRiOTS/FAMERPATZ.html",
         "url_text": "jiffy jamz star trek new trek spinna"
       },]
     */
    results: React.PropTypes.array,
  },
  getInitialState() {
    return {
      pageStart: 0,
      loadedIdx: 0,
      subset: [],
    };
  },
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.results) !== JSON.stringify(nextProps.results)) {
      this.setState(this.getInitialState());
    }
  },
  loadMore(pageToLoad) {
    console.log('loadMore', pageToLoad);
    var pageSize = 20;
    var doIt = () => {
      var last = pageToLoad * pageSize;
      var subset = this.props.results.slice(0, last);
      this.setState({
        subset: subset,
        loadedIdx: last,
        pageStart: pageToLoad,
      });
    };
    if (pageToLoad > 1) {
      setTimeout(doIt, 1250);
    } else {
      doIt();
    }
  },
  hasMore() {
    var r = this.state.loadedIdx < this.props.results.length;
    console.log('hasMore', r);
    return r;
  },
  render() {
    var children = this.state.subset.map((row, idx) => {
      var url = 'https://web.archive.org/web/' + row.gif;
      return (
        <div>
          <a key={idx} href={row.page}>
            <img src={url} title={row.url_text} />
          </a>
        </div>
      )
    });

    var loadingEl = (<Loader loaderIndex={1}></Loader>);
    return (
      <InfiniteScroll
          className={"results-infinite"}
          pageStart={this.state.pageStart}
          loadMore={this.loadMore}
          hasMore={this.hasMore()}
          loader={loadingEl}
          useWindow={true}>
        {children}
      </InfiniteScroll>
    );
  }
});
