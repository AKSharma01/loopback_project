'use strict';

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

var _env = require('../../server/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiToken = _env2.default.slack['api-token'];
var slack = new _slackNode2.default(apiToken);

var notification = function notification(object, callback) {
	slack.api('chat.postMessage', {
		text: "driver phoneno: " + object.phone + " otp: " + object.otp,
		channel: _env2.default.slack.channel
	}, function (err, response) {
		if (err) {
			console.log("notification error");
			return callback(err, {});
		}
		callback(null, response);
	});
};

module.exports = notification;