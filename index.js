var express = require("express"),
		bodyParser = require('body-parser'),
		errorhandler = require('errorhandler');

var errModel = require('./app/model/error/error.model');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
var swaggerUi = require('swagger-ui-express'),
				swaggerDocument = require('./swagger.json');

var config = require('./app/config');
var isProduction = config.get('CONFIG_NODE_ENV') === true;
console.log('Is running in production environment:', isProduction);
var app = express();

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

if (!isProduction) {
	app.use(errorhandler());
}

// create a rotating write stream
var accessLogStream = rfs('access.log', {
	interval: '1d', // rotate daily
	path: path.join(__dirname, 'log')
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

var apiRouter = require('./app/api');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
		errModel.sendError(res, err);
	});
}
  
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	errModel.sendError(res, err);
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
