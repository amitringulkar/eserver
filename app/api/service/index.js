var express = require('express');

// authentication
var auth = require('../auth');

router = express.Router();

var _check = function(req, res){
	res.end('Service is running...');
};

var _kill = function(req, res){
	console.log('Service killed...');
	res.end('Service killed...');
	process.exit(1);
}

router.get('/check', _check);
router.get('/kill', auth.isAuthenticated, _kill);

module.exports = router;