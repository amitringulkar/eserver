var express = require("express"),
		bodyParser = require('body-parser'),
		errorhandler = require('errorhandler');

var config = require('./app/config');
var isProduction = config.get('CONFIG_NODE_ENV') === true;
console.log('CONFIG_NODE_ENV:', isProduction);
var app = express();

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
	app.use(errorhandler());
}

var apiRouter = require('./app/api');

app.use('/api', apiRouter);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found.');
	err.status = 404;
	next(err);
});
  
/// error handlers
// development error handler
// will print stacktrace
if (!isProduction) {
	app.use(function(err, req, res, next) {
		//console.log(err.stack);//ARI

		res.status(err.status || 500);

		res.json({'errors': {
		message: err.message,
		error: err
		}});
	});
}
  
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
res.status(err.status || 500);
res.json({'errors': {
	message: err.message,
	error: {}
}});
});

var _closeServer = function() {
	console.log('close server ...');
	server.close();
};
// close server on process exit
process.on('exit', _closeServer);

// finally, let's start our server...
var server = app.listen(config.get('CONFIG_SERVER_PORT', 4040), function(req, res) {
	console.log('app server is running on port ' + server.address().port);
});
