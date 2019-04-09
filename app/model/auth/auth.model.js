var jwt = require('jsonwebtoken');

var config = require('../../../app/config');
var utils = require('../../utils');
var userModel = require('../user/index.model');
var User = require('../user/user.class');

function _isAuthenticated(req, res, next) {
	//console.log('_isAuthenticated:' + req.isAuthenticated);
	//res.end('_isAuthenticated:' + JSON.stringify(req.headers));

    auth = req.headers['authorization'];
    //res.end('_isAuthenticated:auth:' + JSON.stringify(auth));
	if(!auth || auth === "") {
		//res.statusCode = '401';
        //return res.end('Access denied: Authorization required.');
        next({'message': 'Access denied: Authorization required.', 'code': 401});
	}
    
//console.log(JSON.stringify(auth));
	plain_auth = Buffer.from(auth.split(' ')[1], 'base64').toString();				
	creds = plain_auth.split(':');      
	username = creds[0];
	password = creds[1];
//res.end('_isAuthenticated:auth:' + JSON.stringify({'username': username, 'password': password}));
    userModel.validateUser(_mapData({'username': username, 'password': password}), function(err, result) {
        if(err) {
            //res.end('Authentication failed:' + err.message);
            //res.end('Authentication failed.');
            next(err);
        }

        //res.end(JSON.stringify(result));
        next(null, result);
    });
    
	//console.log(username + ':' + password);

}

function _validateToken(req, res, next) {
    var token = _getTokenFromHeader(req);
    if(!token) {
        next({message: 'Invalid Payload', status: 401});
    }
//console.log('_validateToken:', token);
    try {
    var decodedToken = _verifyToken(token);
    } catch (err) {
        next({message: 'Failed to verify token', status: 200});
    }
//console.log('decodedToken:', decodedToken);
    var exp = utils.getParam(decodedToken, 'exp');
    var cDate = new Date();
    cDate.setDate(cDate.getDate());
    var currentTime = parseInt(cDate.getTime() / 1000);
//console.log('currentTime:', currentTime);
//console.log('exp:', exp);
    if(currentTime > exp) {
        next({message: 'Invalid token', status: 200});
    }
    next(null, token);
}

function _getTokenFromHeader(req) {
//console.log('_getTokenFromHeader:req.headers:', req.headers);
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//console.log('token from header:', req.headers.authorization.split(' ')[1]);
      return req.headers.authorization.split(' ')[1];
    }
  
    return null;
}

function _validateTokenAndGetPayload(token) {
    var authJSON = jwt.verify(token, config.get('CONFIG_JWT_SECRET'));
    if(!authJSON) {
        return null;
    }
//console.log('_validateAndGetdecodedToken:authJSON', authJSON);
    var payload = utils.getParam(authJSON, 'payload');
//console.log('_validateAndGetdecodedToken:payload', payload);
    var exp = utils.getParam(authJSON, 'exp');
//console.log('_validateAndGetdecodedToken:exp', exp);
    return authJSON;
}

function _verifyToken(token) {
    return jwt.verify(token, config.get('CONFIG_JWT_SECRET'));
}

function _decodeToken(token) {
    return jwt.decode(token);
}

function _generateJWT(data) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate());
    var expiryTime = parseInt(exp.getTime() / 1000) + config.get('CONFIG_JWT_EXPIRES_IN');

    return jwt.sign(
        {payload: _getTokenPayload(data),exp: expiryTime},
        config.get('CONFIG_JWT_SECRET')
    );
}

function _toAuthJSON(data){
    return {
      username: utils.getParam(data, 'username'),
      payload: _getPayload(data),
      token: _generateJWT(data)
    };
}

function _getTokenPayload(data) {
    return {
        username: utils.getParam(data, 'username'),
        roleId: utils.getParam(data, 'roleId')
    };
}

function _getPayload(data) {
    return {
        id: utils.getParam(data, 'userId'),
        username: utils.getParam(data, 'username'),
        email: utils.getParam(data, 'emailId'),
        roleId: utils.getParam(data, 'roleId'),
        roleName: utils.getParam(data, 'roleName'),
    };
}

function _mapData(req) {
    var user = new User();

    user.setUsername(utils.getParam(req, 'username'));
    user.setPassword(utils.getParam(req, 'password'));

    return user;
}

var auth = {
    isAuthenticated: _isAuthenticated,
    validateToken: _validateToken,
    toAuthJSON: _toAuthJSON,
    validateTokenAndGetPayload: _validateTokenAndGetPayload,
    verifyToken: _verifyToken
}

module.exports = auth;