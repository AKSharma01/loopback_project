'use strict';

var _jwtUtility = require('../../client/Utility/jwtUtility');

var _jwtUtility2 = _interopRequireDefault(_jwtUtility);

var _httpConstant = require('../../Response/httpConstant');

var _httpConstant2 = _interopRequireDefault(_httpConstant);

var _response = require('../../Response/response');

var _routes = require('./routes.json');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {

	/* req._parsedUrl.pathname will return the api url.
  */
	var authRequired = req._parsedUrl.pathname;
	var allow = _routes2.default.allow;
	var regexUrl = _routes2.default.regex;
	var verified = false;

	// let setPasswordUrlRegex = new RegExp("/api/haulers/setpassword(/?|/\w+)"); 
	for (var i = 0; i < allow.length; i++) {
		if (allow[i].url === authRequired) {
			console.log("auth not required");
			verified = true;
			next();
			break;
		}
	}
	if (!verified) for (var _i = 0; _i < regexUrl.length; _i++) {
		var createRegexUrl = new RegExp(regexUrl[_i].url + "(/?|/\w+)");
		if (createRegexUrl.test(authRequired)) {
			console.log("auth not required for the specified regex");
			verified = true;
			next();
			break;
		}
	}

	if (req.headers['x-dispatcher-api']) {
		console.log("3rd party api");
		verified = true;
		next();
	}

	if (!verified) {
		verifyUserToken(req, function (err, verified) {
			if (err) {
				res.statusCode = err.statusCode;
				res.json({
					data: null,
					message: err.message,
					statusCode: err.statusCode,
					type: "failed"
				});
			} else if (verified) next();
		});
	}
};

function verifyUserToken(request, callback) {
	_jwtUtility2.default.jwtTokenVerify(request.headers.token, function (error, response) {
		if (error) {
			console.log("jwt token expire or not valid");
			return callback({
				statusCode: _httpConstant2.default.jwt_err.status,
				message: error.message
			}, null);
		}
		/* this process don't have any meaning */
		if (response.user_id !== request.headers.userid) {
			console.log("token has not been verified");
			return callback({
				statusCode: _httpConstant2.default.token_id_mismatch.status,
				message: _httpConstant2.default.token_id_mismatch.msg
			}, null);
		}
		callback(null, true);
	}, callback);
}

module.exports = function () {
	return auth;
};