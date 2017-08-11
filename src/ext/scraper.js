    var http = require('http');
    var cheerio = require('cheerio');
    var util = require('util');
    var EventEmitter = require('events').EventEmitter;
    var STATUS_CODES = http.STATUS_CODES;
    /*
     * Scraper Constructor
    **/
    function Scraper (url) {
        this.url = url;
        this.init();
    }
    /*
     * Make it an EventEmitter
    **/
    util.inherits(Scraper, EventEmitter);
	
	
	    /*
     * Initialize scraping
    **/
    Scraper.prototype.init = function () {
		console.log("Inside init");
        var model;
        var self = this;
        self.on('loaded', function (html) {
            model = self.parsePage(html);
            self.emit('complete', model);
        });
        self.loadWebPage();
    };
	
	
	    Scraper.prototype.loadWebPage = function () {
      var self = this;
      //console.log('\n\nLoading ' + website);
      http.get(self.url, function (res) {
        var body = '';
       
        if(res.statusCode !== 200) {
          return self.emit('error', STATUS_CODES[res.statusCode]);
        }
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', function () {
          self.emit('loaded', body);
        });
      })
      .on('error', function (err) {
        self.emit('error', err);
      });      
    };
    /*
     * Parse html and return an object
    **/
    Scraper.prototype.parsePage = function (html) {
      var $ = cheerio.load(html);
      
	  
	  var numbers = array();
	  $('div.telCntct cmawht > a. tel').each(function(eachNumber)
	  {
		  numbers.push(eachNumber);
		
	  });
      var tel = numbers.pop();
	  var cell = numbers.pop();
	  
	  /*
	  var address = $('#address').text();
      var fax = $('#fax').text();
      var email = $('#email').text();
      var website = $('#website').attr('href');
      var postal =  $('#postal').text();
	  */
	  
	  //Hardcoded values 
	  var address = "Address temp";
      var fax = 23587857280;
      var email = "sandeepan.nits@gmail.com";
      var website = "website.com";
      var postal =  436973486;
	  
	  console.log("See website "+website);
      var model = {
        title: address.trim().split('\n'),
        email: email.trim(),
        cell: cell.trim().split('\n'),
        telephone: tel.trim().split('\n'),
        fax: fax.trim().split('\n'),
        website: website || '',
        postalAddress: postal.trim().split('\n'),
        address: address.trim().split('\n'),
        url: this.url
      };
      return model;
    };
    module.exports = Scraper;