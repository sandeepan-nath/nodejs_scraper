var express = require('express');
var testRouter = express.Router();
var testController = require('../controllers/testController');

//testRouter.get('/world',testController.hello); //Calling controller is not working.
testRouter.get('/world',function(req,res){res.send("From router"); }); 
module.exports = testRouter;