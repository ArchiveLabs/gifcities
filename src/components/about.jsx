import { Link } from 'react-router'
import React from 'react';

export default React.createClass({
  componentWillMount: function() {
    document.body.style.background = 'white';
  },
  componentWillUnmount: function() {
    document.body.style.background = null;
  },
  render: function() {
    return (
      <div className="about">
        GifCities: The GeoCities Animated Gif Search Engine was a special project of the Internet Archive done as part of our 20th Anniversary to highlight and celebrate fun aspects of the amazing history of the web as represented in the web archive and the Wayback Machine.
        <br/>
        <br/>
        GeoCities was an early web hosting service, started in 1994 and acquired by Yahoo in 1999, with which users could create their own custom websites. The platform hosted over 38 million user-built pages and was at one time the third most visited site on the web. In 2009, Yahoo announced it was closing down the service, at which point the Internet Archive attempted to archive as much of the content as possible. More information on GeoCities can be found on the related Wikipedia page: <a href="https://en.wikipedia.org/wiki/Yahoo!_GeoCities">https://en.wikipedia.org/wiki/Yahoo!_GeoCities</a>. For the Gifcities project, we used the Internet Archive’s GeoCities Closing Crawl (<a href="https://archive.org/details/geocities&tab=about">https://archive.org/details/geocities&tab=about</a>). More about the project is at <a href="https://archive.org/web/geocities.php">https://archive.org/web/geocities.php</a>.
        <br/>
        <br/>
        Mining this collection, we extracted over 4,500,000 animated GIFs (1,600,000 unique images) and then used the filenames and directory path text to build a best-effort “full text” search engine. Each GIF also links back to the original GeoCities page on which it was embedded (and some of these pages are even more awesome than the GIFs).
        <br/>
        <br/>
        The GeoCities web archive has been explored by other projects. The Internet Archive’s own Jason Scott has highlighted “Under Construction” GeoCities GIFs (<a href="http://www.textfiles.com/underconstruction/">http://www.textfiles.com/underconstruction/</a>), librarians at North Carolina State University had been interested in GeoCities GIFs for use in their data visualization lab (see the demo at <a href="https://archive.org/details/HallofGifs">https://archive.org/details/HallofGifs</a>) featured in creative projects such as Greg Niemeyer's "GifCollider" (<a href="http://www.bampfa.org/program/gif-collider-10">http://www.bampfa.org/program/gif-collider-10</a>), and researchers such as Ian Milligan had been data mining the full GeoCities web archive to explore community formation (<a href="https://ianmilligan.ca/?s=geocities">https://ianmilligan.ca/?s=geocities</a>).
        <br/>
        <br/>
        The resulting corpus of GeoCities materials have been re-staged and studied by Dragan Espenschied and Olia Lialina of the GeoCities Research Institute, describing the important role of GeoCities vernacular &ndash; templates, background, MIDIs and of course GIFs &ndash; in the formation of Digital Folklore (<a href="http://blog.geocities.institute/">http://blog.geocities.institute/</a>). Their tumblr blog One Terabyte of Kilobyte Age Photo Op chronologically delivers a new screen shots of  GeoCities home pages every 20 minutes, created with historically accurate operating systems and browsers (<a href="http://oneterabyteofkilobyteage.tumblr.com/">http://oneterabyteofkilobyteage.tumblr.com/</a>).
        <br/>
        <br/>
        Thanks for the project go first and foremost to the millions of everyday citizens that built such incredible pages and GIFs in GeoCities. We also owe special thanks to Yahoo for their guidance and open communication about the GeoCities closure. We also thank the independent volunteer team of archivers at <a href="http://archiveteam.org/">Archive Team</a> for their efforts to <a href="http://archiveteam.org/index.php?title=Geocities">preserve GeoCities</a> and <a href="http://archiveteam.org/index.php?title=Geocities_URL_Lists">contribute URL surveys</a> to the project. Thanks go as well to the efforts of the tireless Internet Archive staff that work to archive and make accessible our ongoing work to preserve the web for both today’s users and for posterity.
        <br/>
        <br/>
        The Internet Archive GifCities project team: Vinay Goel (Senior Data Engineer), Jefferson Bailey (Director, Web Archiving), and Richard Caceres (Software Engineer).
        <br/>
        <br/>
        GifCities is part of <a href="https://archivelab.org" target="_blank">Archive Lab</a>. Send inquiries, props, rants, and any questions to <a href="mailto:gifcities@archive.org">gifcities@archive.org</a>.
        <br/>
        <br/>
        Now go look at some awesome early web GIFs!
      </div>
    );
  }
});
