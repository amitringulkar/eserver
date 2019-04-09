var express = require('express');

var utils = require('../../utils');

var userModel = require('../../model/user/index.model');
var authModel = require('../../model/auth/auth.model');
var errModel = require('../../model/error/error.model');
var User = require('../../model/user/user.class');

router = express.Router();

router.post('/', _login);

module.exports = router;

function _login(req, res) {
    var user = _mapRequestData(req);
	userModel.validateUser(user, function(err, result) {
		if(err) {
            errModel.sendError(res, err);
        }
        user = _mapUserData(result);
        userModel.getUserByUsername(user, function(err, userUpdated) {
            if(err) {
                errModel.sendError(res, err);
            }

            //generate token
            var responsePayload = authModel.toAuthJSON(userUpdated);
            //console.log('login:responsePayload', responsePayload);

            //var authJSON = authModel.validateTokenAndGetPayload(utils.getParam(responsePayload, 'token'));
            //console.log('login:authJSON', authJSON);
            //var isValidToken = authModel.verifyToken(utils.getParam(responsePayload, 'token'));
            //console.log('login:isValidToken', isValidToken);
            //var decodeedToken = authModel.decodeToken(utils.getParam(responsePayload, 'token'));
            //console.log('login:decodeedToken', decodeedToken);

            //return response with token
            res.end(JSON.stringify(responsePayload));
        });
	});
}

function _mapRequestData(req) {
    var user = new User();
    user.setUsername(utils.getRequestParam(req, 'username'));
    user.setEmail(utils.getRequestParam(req, 'email'));
    user.setPassword(utils.getRequestParam(req, 'password'));
    return user;
}

function _mapUserData(res) {
    var user = new User();
    user.setUsername(utils.getParam(res, 'username'));
    user.setEmail(utils.getParam(res, 'emailId'));
    user.setPassword(utils.getParam(res, 'password'));
    return user;
}