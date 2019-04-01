# yarn install

# add .env file as below
// environment level configurations here
var config = {
    CONFIG_NODE_ENV: 'development', // envoronment - development / production
    CONFIG_SERVER_PORT: 4040, // default 4040 can be added here

    CONFIG_JWT_SECRET: 'jwt secret here',

    CONFIG_DB_CONNECTION_LIMIT: 100, // default 100 can be added here
    CONFIG_DB_HOST: 'db host name',
    CONFIG_DB_NAME: 'db name',
    CONFIG_DB_USER_NAME: 'db user name',
    CONFIG_DB_PASSWORD: 'db user password'
};

module.exports = config;

# yarn start
