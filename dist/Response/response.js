"use strict";

var successResponse = function successResponse(data, statusCode, message, callback) {
	callback(null, {
		data: data,
		statusCode: statusCode,
		message: message,
		type: "success"
	});
};

var failedResponse = function failedResponse(data, statusCode, message, callback) {
	callback({
		data: data,
		statusCode: statusCode,
		message: message,
		type: "failure"
	}, null);
};

module.exports = {
	success: successResponse,
	failed: failedResponse
};