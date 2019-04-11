var express = require('express');

var reportModel = require('../../model/reports/index.model');
var errModel = require('../../model/error/error.model');

var utils = require('../../Utils');

router = express.Router();

router.post('/srf', _getSrf);
router.post('/headcount', _getHeadCount);
router.post('/revenue', _getRevenue);
router.post('/portfolio', _getPortfolioCost);
router.post('/gamechanger', _getGameChangerCost);
router.post('/testing', _getTesting);

module.exports = router;

function _getSrf(req, res) {
	//var customers = [{"id":28,"Title":"Sweden"}, {"id":56,"Title":"USA"}, {"id":89,"Title":"England"}];
	//res.end(JSON.stringify(customers));
	reportModel.getSrf(function(err, result) {
		if(err) {
			//res.end('Failed to get users.');
			errModel.sendError(res, err);
		}
		res.end(JSON.stringify(result));
	});
}

function _getHeadCount(req, res) {
	var userId = utils.getRequestParam(req, 'userId');

	reportModel.getHeadCount(userId, function(err, result) {
		if(err) {
			res.end(err.message);
			//errModel.sendError(res, err);
		}
		res.end(JSON.stringify(result));
	});
}

function _getRevenue(req, res) {
	var userId = utils.getRequestParam(req, 'userId');

	reportModel.getRevenue(userId, function(err, result) {
		if(err) {
			//res.end(err.message);
			errModel.sendError(res, err);
		}
		res.end(JSON.stringify(result));
	});
}

function _getPortfolioCost(req, res) {

	reportModel.getPortfolioCost(function(err, result) {
		if(err) {
			res.end(err.message);
		}
		res.end(JSON.stringify(result));
	});
}

function _getGameChangerCost(req, res) {

	reportModel.getGameChangerCost(function(err, result) {
		if(err) {
			res.end(err.message);
		}
		res.end(JSON.stringify(result));
	});
}

function _getTesting(req, res) {

	reportModel.getTesting(function(err, result) {
		if(err) {
			res.end(err.message);
		}
		res.end(JSON.stringify(result));
	});
}
