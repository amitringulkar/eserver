var express = require('express');

// authentication
var authModel = require('./auth');

// api routers
var loginRouter = require('./login');
var serviceRouter = require('./service');
var usersRouter = require('./users');
var reportsRouter = require('./reports');

var router = express.Router();
// authenticate all routes
//router.all('*', authModel.isAuthenticated);

router.use('/login', loginRouter);
router.use('/service', serviceRouter);
router.use('/users', authModel.isAuthenticated, usersRouter);
router.use('/reports', authModel.validateToken, reportsRouter);

router.get('/', function(req, res){
	res.send('/api is running...');
});

module.exports = router;
