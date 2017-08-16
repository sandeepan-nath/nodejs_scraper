//Will use revealing module pattern
if(0)
{
	
var botController = function(botService)	
{
	var scrape = function(req,res){
		res.send("Inside bot controller");
		console.log("Inside bot controller");
		
		/*
		var Model = require('../ext/model');
		var Scraper = require('../ext/scraper');
		var Pages = [];
		//all the code inside bot.js to be brought here
		
		// store all urls in a global variable  
		Pages = generateUrls(5);
		
		var numberOfParallelRequests = 20;
		for (var i = 0; i < numberOfParallelRequests; i++) {
		  wizard();
		}
		*/
	};
	
	return {
		scrape:scrape
	}
}

module.exports = botController;

}
else
{
	var Model = require('../ext/model');
	var Scraper = require('../ext/scraper');
	var Pages = [];
	var completed_requests = 0;
	var total_scheduled_requests = 0;
	
	function generateUrls(limit) {
      //var url = 'http://www.sentosaresortspune.com/contact-us.html';
	  var url = 'http://www.sentosaresortspune.com/contact-us.html?counter=';
      var urls = [];
      var i;
      for (i=1; i < limit; i++) {
        urls.push(url + i);
		//urls.push(url);
      }
      return urls;
    }
	
	function wizard(res) {
      // if the Pages array is empty, we are Done!!
	  console.log('Inside wizard with pages length: '+Pages.length);
      if (!Pages.length) {
        return; //console.log('Done!!!!');
      }
      var url = Pages.pop();
      var scraper = new Scraper(url);
      var model;
      //console.log('Requests Left: ' + Pages.length);
      // if the error occurs we still want to create our
      // next request
      scraper.on('error', function (error) {
        console.log('Error: '+error);
        wizard(res);
      });
      // if the request completed successfully
      // we want to store the results in our database
      scraper.on('complete', function (listing) {
		//console.log('Scraping Complete ');
        model = new Model(listing);
       
        model.save(function(err) {
          if (err) {
            console.log('Database err saving: ' + url);
			//res.send('Database err saving: ' + url);
          }
		  else
		  {
			  //res.send('Save to Database: ' + url);
			  console.log('Saved to Database: '+url);
		  }
		  
		  if (completed_requests++ == total_scheduled_requests - 1) {
			// All downloads are completed
			res.send("All requests completed ");
		  }     
		  
        });
        wizard(res);
      });
    }
	
	module.exports = {
		scrape : function(req, res){
			
			//all the code inside bot.js to be brought here
			
			// store all urls in a global variable  
			Pages = generateUrls(100);
			total_scheduled_requests = Pages.length;
			var numberOfParallelRequests = 40; //what does this actually do? Does it put a limit on the max number of urls that could be hit simultaneously?
			for (var i = 0; i < numberOfParallelRequests; i++) {
				//console.log("Wizard() called");
				wizard(res);
			}
			//console.log("End of processing");
		   //res.send("Inside bot controller");
		}
	}
}