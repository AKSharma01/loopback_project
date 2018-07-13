'use strict';

var _response = require('../../Response/response');

var mongoId = require('mongodb').ObjectID;

function ObjectID(id, callback) {
	try {
		return mongoId(id);
	} catch (exception) {
		console.log("exception: ", exception);
		return (0, _response.failed)(null, 400, "id is not valid", callback);
	}
}

module.exports = ObjectID;