/*additional stuff to make it accessible from browser*/
var express = require('express');
var app = express();
var port = 5000;

var botRouter = require('./src/routes/botRoutes');
app.use('/Bot',botRouter);

//Actually tryiing to put this tutorial app inside an express js format app - https://blog.ragingflame.co.za/2014/6/27/using-cheerio-and-mongodb-to-scrape-a-large-website

app.get('/',function(req,res){
		res.send("Hello world");
});

app.get('/bot',function(req,res){
		//res.send("Bot.js");
});

app.listen(port,function(err){
	console.log("Running port on "+port);
});

