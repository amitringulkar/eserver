var express = require('express');

// authentication
var auth = require('./auth');

// api routers
var loginRouter = require('./login');
var serviceRouter = require('./service');
var usersRouter = require('./users');

var router = express.Router();
// authenticate all routes
//router.all('*', auth.isAuthenticated);

router.use('/login', loginRouter);
router.use('/service', serviceRouter);
router.use('/users', auth.isAuthenticated, usersRouter);

router.get('/', function(req, res){
	res.send('/api is running...');
});

module.exports = router;
