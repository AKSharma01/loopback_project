'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _index = require('../Utility/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./transformer/index');

var _index4 = _interopRequireDefault(_index3);

var _response = require('../../Response/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectID = _index2.default.ObjectID;
var repository = _index2.default.repository;

var task = function task(Hauler, request, taskObject, callback) {
	Hauler.getDataSource().connector.connect(function (err, db) {
		if (err) {
			console.log("Connection Error");
			return (0, _response.failed)(null, httpConstant.connection_err.status, err.message, callback);
		}
		createNewtask(Hauler, db, request, taskObject, callback);
	});
};

function createNewtask(Hauler, db, request, taskObject, callback) {
	var additional = {
		haulerId: ObjectID(request.headers.userid, callback)
	};
	taskObject = (0, _assign2.default)(taskObject, additional);
	var taskTransformeredObject = _index4.default.task.model(taskObject);
	checkTaskCreatationDate(Hauler, db, request, taskTransformeredObject, callback);
}

function checkTaskCreatationDate(Hauler, db, request, taskTransformeredObject, callback) {
	var jobDate = new Date(request.body.jobDate);
	var today = new Date();
	today.setHours(0, 0, 0, 0);
	if (today <= jobDate) {
		var taskCollection = Hauler.app.models.task;
		repository.create(taskCollection, taskTransformeredObject, function (result) {
			result['_id'] = result.id;
			(0, _assign2.default)(result, {
				order_type: "task",
				status: "unassigned"
			});
			var taskTransformeredObject = _index4.default.task.response(result);
			(0, _response.success)(taskTransformeredObject, httpConstant.task_created.status, httpConstant.task_created.msg, callback);
		}, callback);
	} else (0, _response.failed)(null, httpConstant.create_task_failed.status, httpConstant.create_task_failed.msg, callback);
}

module.exports = task;