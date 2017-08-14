var express = require('express');
var botRouter = express.Router();

//var botController = require('../controllers/botController')(null);
var botController = require('../controllers/botController');
botRouter.get('/scrape',botController.scrape);

/*
var router = function()
{ //is nav necessary?
	var botController = require('../controllers/botController')(null);
	botRouter.route('/scrape').get(botController.scrape);
	
	return botRouter;
};

module.exports = router;
*/


module.exports = botRouter;