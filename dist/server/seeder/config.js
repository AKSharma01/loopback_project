'use strict';

var config = require('../datasources').db;
var dbURL = config.connector + '://' + config.host + ':' + config.port;
var mongoClient = require(config.connector).MongoClient;
var database = config.database;

module.exports = {
	dbURL: dbURL,
	database: database,
	mongoClient: mongoClient
};