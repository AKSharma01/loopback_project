'use strict';

var _index = require('../Utility/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./transformer/index');

var _index4 = _interopRequireDefault(_index3);

var _httpConstant = require('../../Response/httpConstant');

var _httpConstant2 = _interopRequireDefault(_httpConstant);

var _response = require('../../Response/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtUtility = _index2.default.jwt;
var repository = _index2.default.repository;
var encryption = _index2.default.encryption;

var credential = function credential(hauler, credentialObject, callback) {
	hauler.getDataSource().connector.connect(function (err, db) {
		if (err) {
			console.log("Connection Error");
			return (0, _response.failed)(null, _httpConstant2.default.connection_err.status, err.message, callback);
		}

		if (!credentialObject.username || !credentialObject.password) {
			console.log("hauler credential missing");
			return (0, _response.failed)(null, _httpConstant2.default.connection_err.status, _httpConstant2.default.connection_err.msg, callback);
		}
		var haulerCollection = db.collection('hauler');
		var query = {};
		var typeOfLogin = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

		if (typeOfLogin.test(credentialObject.username)) query = {
			company_email: credentialObject.username
		};else query = {
			user_name: credentialObject.username
		};

		repository.findOne(haulerCollection, query, function (haulerObject) {
			if (haulerObject == null) {
				console.log("username not found");
				return (0, _response.failed)(null, _httpConstant2.default.hauler_not_found.status, _httpConstant2.default.hauler_not_found.msg, callback);
			}
			validateCredential(db, credentialObject, haulerObject, callback);
		}, callback);
	});
};

function validateCredential(db, credentialObject, haulerObject, callback) {
	encryption.compare(credentialObject.password, haulerObject.password, function (err, res) {
		if (!res) {
			// Passwords don't match
			console.log("repeated password error");
			return (0, _response.failed)(null, _httpConstant2.default.hauler_invalid.status, _httpConstant2.default.hauler_invalid.msg, callback);
		}
		// Passwords match
		var userId = String(haulerObject._id);
		jwtUtility.jwtTokenGenerator(userId, function (token) {
			var responseTransformed = _index4.default.registerHauler.response(haulerObject);
			responseTransformed['token'] = token;
			(0, _response.success)(responseTransformed, _httpConstant2.default.hauler_login.status, _httpConstant2.default.hauler_login.msg, callback);
		}, callback);
	});
}

module.exports = credential;