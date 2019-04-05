var express = require('express');

var usersModel = require('../../model/user/index.model');
var errModel = require('../../model/error/error.model');

router = express.Router();

router.post('/head-count', _getHeadCounts);

module.exports = router;

function _getHeadCounts(req, res) {
	//var customers = [{"id":28,"Title":"Sweden"}, {"id":56,"Title":"USA"}, {"id":89,"Title":"England"}];
	//res.end(JSON.stringify(customers));
	usersModel.getUsers(function(err, result) {
		if(err) {
			errModel.sendError(res, err);
		}
		res.end(JSON.stringify(result));
	});
}
