'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _response = require('../../Response/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcryption = function bcryption(originalString, callback, fcallback) {
	_bcrypt2.default.hash(originalString, 10, function (err, hashString) {
		if (err) {
			console.log("encryption error");
			return (0, _response.failed)(null, 417, "encryption error", fcallback);
		}
		callback(hashString);
	});
};

var compare = function compare(stringToTest, hash, callback, fcallback) {
	_bcrypt2.default.compare(stringToTest, hash, function (err, res) {
		if (err) {
			console.log("encryption error");
			return (0, _response.failed)(null, 417, "encryption error", fcallback);
		}
		callback(res);
	});
};

module.exports = {
	bcryption: bcryption,
	compare: compare
};