"use strict";

var _response = require("../../Response/response");

var find = function find(collection, query, callback, fcallback) {
	collection.find(query).toArray(function (err, result) {
		if (err) {
			console.log("Query Error: ", err.message);
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		callback(result);
	});
};

var findOne = function findOne(collection, query, callback, fcallback) {
	collection.findOne(query, function (err, result) {
		if (err) {
			console.log("Query Error");
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		callback(result);
	});
};

var insert = function insert(collection, query, callback, fcallback) {
	collection.insert(query, function (err, result) {
		if (err) {
			console.log("Query Error");
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		callback(result);
	});
};

var update = function update(collection, findQuery, updateQuery, callback, fcallback) {
	updateQuery = {
		$set: updateQuery
	};

	collection.update(findQuery, updateQuery, function (err, result) {
		if (err) {
			console.log("Query Error");
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		/** this findOne function will return corresponding response if find query entity would't
   * modified after update query
   */
		findOne(collection, findQuery, callback, fcallback);
	});
};

var updateAll = function updateAll(collection, findQuery, updateQuery, callback, fcallback) {
	updateQuery = {
		$set: updateQuery
	};

	collection.update(findQuery, updateQuery, { multi: true }, function (err, result) {
		if (err) {
			console.log("Query Error");
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		callback(result);
	});
};

var create = function create(collection, query, callback, fcallback) {
	collection.create(query, function (err, result) {
		if (err) {
			console.log("Query Error", err.message);
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		callback(result);
	});
};

var findOnlyField = function findOnlyField(collection, query, fields, callback, fcallback) {
	collection.find(query, fields).toArray(function (err, result) {
		if (err) {
			console.log("Query Error", err.message);
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		callback(result);
	});
};

var aggregate = function aggregate(collection, query, callback, fcallback) {
	collection.aggregate(query).toArray(function (err, result) {
		if (err) {
			console.log("Query Error", err.message);
			return (0, _response.failed)(null, 500, err.message, fcallback);
		}
		callback(result);
	});
};

// ========================================================================================================
/**
 * 	to call 
 * respository.find(Driver, query, function(result){
		//some logic
 * }, callback);
 */
// ========================================================================================================


module.exports = {
	find: find,
	findOne: findOne,
	insert: insert,
	create: create,
	update: update,
	aggregate: aggregate,
	updateAll: updateAll,
	findOnlyField: findOnlyField
};