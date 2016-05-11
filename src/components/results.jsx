import { Link } from 'react-router'
import React from 'react';

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
  render: function() {
    var children = this.props.results.slice(0, 10).map((row, idx) => {
      var url = 'https://web.archive.org/web/' + row.gif;
      return (
        <a key={idx} href={row.page}>
          <img src={url} title={row.url_text} />
        </a>
      )
    });

    return (
      <div>
        {children}
      </div>
    );
  }
});
