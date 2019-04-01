var mysql = require('mysql');

var config = require('../../config');

var pool = mysql.createPool({
    connectionLimit: config.get('CONFIG_DB_CONNECTION_LIMIT'),
    host: config.get('CONFIG_DB_HOST'),
    user: config.get('CONFIG_DB_USER_NAME'),
    password: config.get('CONFIG_DB_PASSWORD'),
    database: config.get('CONFIG_DB_NAME')
});

module.exports = {'getConnection': _getConnection};

function _getConnection(callback) {
    pool.getConnection(function(err, connection) {
        if(err) {
            if(connection) {
                connection.release();
            }
            return callback({'message': 'Error in DB connection.', 'code': 100});
        }
        
        return callback(null, connection);
    });
}