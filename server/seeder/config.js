let config = require('../datasources').db;
let dbURL = config.connector + '://' + config.host + ':' + config.port;
let mongoClient = require(config.connector).MongoClient;
let database = config.database;

module.exports = {
	dbURL: dbURL,
	database: database,
	mongoClient: mongoClient
}