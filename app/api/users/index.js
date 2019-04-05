var express = require('express');

var usersModel = require('../../model/user/index.model');
var errModel = require('../../model/error/error.model');

router = express.Router();

router.get('/fetch-all', _getUsers);

module.exports = router;

function _getUsers(req, res) {
	//var customers = [{"id":28,"Title":"Sweden"}, {"id":56,"Title":"USA"}, {"id":89,"Title":"England"}];
	//res.end(JSON.stringify(customers));
	usersModel.getUsers(function(err, result) {
		if(err) {
			//res.status(500);
			//res.end('Failed to get users.');
			//res.status(err.status);
			//res.end(JSON.stringify(err));
			errModel.sendError(res, err);
		}
		res.end(JSON.stringify(result));
	});
}
