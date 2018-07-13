'use strict';

var _index = require('../../client/Hauler/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (Hauler) {

	Hauler.login = function (haulerCredential, callback) {
		_index2.default.login(Hauler, haulerCredential, callback);
	};

	Hauler.remoteMethod('login', {
		accepts: {
			arg: 'haulerCredential',
			type: 'object',
			http: {
				source: 'body'
			}
		},
		returns: {
			type: 'object',
			root: true
		},
		http: {
			verb: 'post',
			status: 200
		}
	});

	Hauler.task = function (req, taskObject, callback) {
		_index2.default.task(Hauler, req, taskObject, callback);
	};

	Hauler.remoteMethod('task', {
		accepts: [{
			arg: "req",
			type: "object",
			http: {
				source: "req"
			}
		}, {
			arg: "taskObject",
			type: "object",
			http: {
				source: "body"
			}
		}],
		returns: {
			type: "object",
			root: true
		},
		http: {
			path: "/task",
			verb: "post",
			status: 200
		}
	});
};