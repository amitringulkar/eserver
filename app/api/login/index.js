var express = require('express');

var utils = require('../../utils');

var userModel = require('../../model/user/index.model');
var User = require('../../model/user/user.model');

router = express.Router();

router.post('/', _login);

module.exports = router;

function _login(req, res) {
    var user = _mapRequestData(req);

	userModel.validateUser(user, function(err, result) {
		if(err) {
			res.end('Invalid username/password.');
        }
        //generate token
        //return response with token
		res.end(JSON.stringify(result));
	});
}

function _mapRequestData(req) {
    var user = new User();

    user.setUsername(utils.getRequestParam(req, 'username'));
    user.setPassword(utils.getRequestParam(req, 'password'));

    return user;
}