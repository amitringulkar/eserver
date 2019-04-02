var utils = require('../../utils');
var userModel = require('../user/index.model');
var User = require('../user/user.model');

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
	plain_auth = new Buffer(auth.split(' ')[1], 'base64').toString();				
	creds = plain_auth.split(':');      
	username = creds[0];
	password = creds[1];
//res.end('_isAuthenticated:auth:' + JSON.stringify({'username': username, 'password': password}));
    userModel.validateUser(_mapData({'username': username, 'password': password}), function(err, result){
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

function _mapData(req) {
    var user = new User();

    user.setUsername(utils.getParam(req, 'username'));
    user.setPassword(utils.getParam(req, 'password'));

    return user;
}

var auth = {
    isAuthenticated: _isAuthenticated
}

module.exports = auth;