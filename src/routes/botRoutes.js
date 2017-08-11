var express = require('express');
var botRouter = express.Router();

var router = function()
{ //is nav necessary?
	var botController = require('../controllers/botController')(null);
	botRouter.route('/scrape').get(botController.scrape);
	
	return botRouter;
};


module.exports = router;