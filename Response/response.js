let successResponse = function (data, statusCode, message, callback) {
	callback(null, {
		data: data,
		statusCode: statusCode,
		message: message,
		type: "success"
	});
}

let failedResponse = function(data, statusCode, message, callback){
	callback({
		data: data,
		statusCode: statusCode,
		message: message,
		type: "failure"
	}, null);
}

module.exports = {
	success: successResponse,
	failed: failedResponse
}