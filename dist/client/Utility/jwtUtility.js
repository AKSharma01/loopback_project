'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _env = require('../../server/env');

var _env2 = _interopRequireDefault(_env);

var _response = require('../../Response/response');

var _httpConstant = require('../../Response/httpConstant');

var _httpConstant2 = _interopRequireDefault(_httpConstant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jwtTokenGenerator(id, callback, fcallback) {
	var request = {
		user_id: id
	};
	var key = _env2.default.jwt.secret;
	var timeOut = {
		expiresIn: _env2.default.jwt.expiry_days
	};
	_jsonwebtoken2.default.sign(request, key, timeOut, function (err, token) {
		if (err) {
			console.log("JWT Error");
			return (0, _response.failed)(null, _httpConstant2.default.jwt_err.status, err.message, fcallback);
		}
		callback(token);
	});
}

function jwtTokenVerify(token, callback) {
	_jsonwebtoken2.default.verify(token, _env2.default.jwt.secret, function (err, decoded) {
		if (err) {
			console.log("JWT Token Verification Error");
			return callback({
				message: "JWT Token Verification Error"
			}, null);
		}
		callback(null, decoded);
	});
}

module.exports = {
	jwtTokenGenerator: jwtTokenGenerator,
	jwtTokenVerify: jwtTokenVerify
};