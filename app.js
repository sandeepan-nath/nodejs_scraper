/*additional stuff to make it accessible from browser*/
var express = require('express');
var app = express();
var port = 5000;

var testRouter = require('./src/routes/testRoutes');
app.use('/Test',testRouter);


var botRouter = require('./src/routes/botRoutes');
app.use('/Bot',botRouter);

app.get('/',function(req,res){
	res.send("Hello world");
});

app.listen(port,function(err){
    console.log("Running port on "+port);
});

