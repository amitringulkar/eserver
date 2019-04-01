var user = require('../user/index.model');

function _isAuthenticated(req, res, next) {
	//console.log('_isAuthenticated:' + req.isAuthenticated);
	//res.end('_isAuthenticated:' + JSON.stringify(req.headers));

    auth = req.headers['authorization'];
    //res.end('_isAuthenticated:auth:' + JSON.stringify(auth));
	if(!auth || auth === "") {
		res.statusCode = '401';
		return res.end('Access denied: Authorization required.');
	}
    
//console.log(JSON.stringify(auth));
	plain_auth = new Buffer(auth.split(' ')[1], 'base64').toString();				
	creds = plain_auth.split(':');      
	username = creds[0];
	password = creds[1];
//res.end('_isAuthenticated:auth:' + JSON.stringify({'username': username, 'password': password}));
    user.validate({'username': username, 'password': password}, function(err, result){
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

var auth = {
    isAuthenticated: _isAuthenticated
}

module.exports = auth;