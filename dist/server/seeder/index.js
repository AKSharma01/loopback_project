'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argV = process.argv;

/* ================================================== All Seeder Options ===========================================
 *
 *
 * ================================================================================================================
 */

if (argV.length > 3) {
	console.log("!!!! too many options");
	// return;
}

var seederOption = argV;

function seederFuntion(seederOption) {
	var option = {
		counter: function counter() {
			require('./counter.js');
			return;
		},
		orderstatusmaster: function orderstatusmaster() {
			require('./orderStatusMaster.js');
			return;
		},
		default: function _default() {
			console.log("!!!Please provide valid input!!!");
			return;
		}
	};
	if (seederOption.length < 3) {
		console.log("\n==========================================================================");
		console.log(' Seeder option := \n');
		for (var i = 0; i < (0, _keys2.default)(option).length - 1; i++) {
			if ((0, _keys2.default)(option)[i] !== 'default') console.log('\t', String(i + 1), ')', (0, _keys2.default)(option)[i]);
		}console.log("\n==========================================================================");
		return;
	}
	try {
		return option[seederOption[2]]();
	} catch (e) {
		console.log("error: ", e);
		option['default']();
		console.log("\n==========================================================================");
		console.log(' Seeder option := \n');
		for (var _i = 0; _i < (0, _keys2.default)(option).length - 1; _i++) {
			if ((0, _keys2.default)(option)[_i] !== 'default') console.log('\t', String(_i + 1), ')', (0, _keys2.default)(option)[_i]);
		}console.log("\n==========================================================================");
		return;
	}
}

seederFuntion(seederOption);