var pool = require('../../db/mysql/connectionPool');

var utils = require('../../Utils');

module.exports = {
    validateUser: _validateUser,
    getSrf: _getSrf,
    getHeadCount: _getHeadCount,
    getRevenue: _getRevenue,
    getPortfolioCost: _getPortfolioCost,
    getGameChangerCost: _getGameChangerCost
};


function _validateUser(user, callback) {
    if(user.getUsername() == 'undefinded' || user.getPassword() == 'undefined') {
        return callback({message: 'Error in validation.', status: 401});
    }
    
    pool.getConnection(function(err, connection) {
        if(err) {
            return callback({message: 'Error in db connection.', status: 200});
        }

        var sql = 'select id, username, firstname from users where username = "' + user.getUsername() + '"';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            if(utils.isEmpty(result)) {
                return callback({message: user.getUsername(), status: 200}, result);
            }
            return callback(null, result);
        });
    })
}

function _getSrf(callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            return callback({message: 'Failed to load users.', status: 200});
        }

        var sql = 'select * from srf';

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            return callback(null, result);
        });
    });
}

function _getHeadCount(userId, callback) {
    if(!userId) {
        return callback({message: 'User id is requied', status: 401});
    }

    pool.getConnection(function(err, connection) {
        if(err) {
            return callback({message: 'Failed to load users.', status: 200});
        }

        var sql = "select headcount.userId AS Id, firstName, lastName ,year, quarter, onsite, Offshore, actual   from headcount JOIN users On users.userId = headcount.userId where headcount.userId In ( select userId from (select * from users order by managerId , userId) products_sorted, (select @pv := "+userId+") initialisation where find_in_set(managerId , @pv) and length(@pv := concat(@pv, ',', userId)) ) ";
        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            return callback(null, result);
        });
    });
}

function _getRevenue(userId, callback) {

    if(!userId) {
        return callback({message: 'User id is requied', status: 401});
    }

    pool.getConnection(function(err, connection){
        if(err) {
            return callback({message: 'Failed to load users.', status: 200});
        }

        var sql = "select revenue.userId AS Id, firstName, lastName ,year, quarter, revenueOnsite , revenueoffshore , actual   from revenue JOIN users On users.userId = revenue.userId where revenue.userId In ( select userId from (select * from users order by managerId , userId) products_sorted, (select @pv := "+userId+") initialisation where find_in_set(managerId , @pv) and length(@pv := concat(@pv, ',', userId)) ) ";

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            return callback(null, result);
        });
    });
}

function _getPortfolioCost(callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            return callback({'message': 'Failed to load users.', 'code': 500});
        }

        var sql = "SELECT *, ( `dev_cost` + `devQA_cost` + `pc_cost` + `pm_cost`) AS total FROM `portfolio_cost` ";

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            return callback(null, result);
        });
    });
}

function _getGameChangerCost(callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            return callback({'message': 'Failed to load users.', 'code': 500});
        }

        var sql = "SELECT * FROM `gamechanger_cost` ";

        connection.query(sql, function(err, result) {
            if(err) {
                return callback(err);
            }
            return callback(null, result);
        });
    });
}