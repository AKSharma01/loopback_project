'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _response = require('../../Response/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(url) {
	var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var callback = arguments[2];
	var fcallback = arguments[3];

	optional.headers['x-dispatcher-api'] = true;

	_request2.default.get(url, optional, function (err, data) {
		if (err) return (0, _response.failed)(null, 417, err.message, fcallback);
		callback({
			data: data,
			message: "success"
		});
	});
}

function post(url) {
	var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var callback = arguments[2];
	var fcallback = arguments[3];

	_request2.default.post({
		url: url,
		headers: optional.headers,
		body: optional.body
	}, function (err, data) {
		if (err) {
			return callback({
				data: null,
				message: err.message
			});
		} else {
			return callback({
				data: data,
				message: "success"
			});
		}
	});
}

var requestAPI = function requestAPI(url, method, optional, callback, fcallback) {
	try {
		switch (method) {
			case 'get':
			case 'GET':
				get(url, optional, callback, fcallback);
				break;
			case 'post':
			case 'POST':
				post(url, optional, callback, fcallback);
				break;
			case 'put':
			case 'PUT':
				put(url, optional, callback, fcallback);
				break;
			default:
				throw "Yet get, post and put is defined";
		}
	} catch (exception) {
		console.log("Exception: ", exception);

		callback({
			data: null,
			message: exception.message
		});
	}
};

module.exports = requestAPI;