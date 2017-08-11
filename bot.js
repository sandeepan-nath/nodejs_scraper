    var Model = require('./model');
    var Scraper = require('./scraper');
    var Pages = [];
    function generateUrls(limit) {
      var url = 'https://www.justdial.com/Pune/D-Mart-Near-Sadanand-Hotel-Amar-Mega-Plex-Baner/020PXX20-XX20-100811123323-U7B2_BZDET';
      var urls = [];
      var i;
      for (i=1; i < limit; i++) {
        //urls.push(url + i);
		urls.push(url);
      }
      return urls;
    }
    // store all urls in a global variable  
    Pages = generateUrls(500);
    function wizard() {
      // if the Pages array is empty, we are Done!!
      if (!Pages.length) {
        return console.log('Done!!!!');
      }
      var url = Pages.pop();
      var scraper = new Scraper(url);
      var model;
      console.log('Requests Left: ' + Pages.length);
      // if the error occurs we still want to create our
      // next request
      scraper.on('error', function (error) {
        console.log(error);
        wizard();
      });
      // if the request completed successfully
      // we want to store the results in our database
      scraper.on('complete', function (listing) {
        model = new Model(listing);
       
        model.save(function(err) {
          if (err) {
            console.log('Database err saving: ' + url);
          }
        });
        wizard();
      });
    }
	
	
	var numberOfParallelRequests = 20;
    for (var i = 0; i < numberOfParallelRequests; i++) {
      wizard();
    }