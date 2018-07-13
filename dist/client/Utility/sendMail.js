'use strict';

var _ses = require('aws-sdk/clients/ses');

var _ses2 = _interopRequireDefault(_ses);

var _mailcomposer = require('mailcomposer');

var _mailcomposer2 = _interopRequireDefault(_mailcomposer);

var _response = require('../../Response/response');

var _httpConstant = require('../../Response/httpConstant');

var _httpConstant2 = _interopRequireDefault(_httpConstant);

var _env = require('../../server/env.json');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMail = function sendMail(to, emailObject, attachment) {
	var ses = new _ses2.default(_env2.default.aws);
	var mail = (0, _mailcomposer2.default)({
		from: 'akashkr.sharma369@gmail.com',
		to: to,
		subject: emailObject.subject,
		html: emailObject.body,
		attachments: attachment
	});
	mail.build(function (err, message) {
		if (err) {
			console.log("error in building mail: ", err);
			return;
		}
		ses.sendRawEmail({
			RawMessage: {
				Data: message
			}
		}, function (err, data) {
			if (err) console.log("error: ", err);else console.log("mail send: ", data);
		});
	});
};

module.exports = sendMail;