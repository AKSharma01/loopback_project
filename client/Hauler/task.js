import utility from '../Utility/index';
import transformer from './transformer/index';
import {success, failed} from '../../Response/response';
import taskTransformer from '../Task/transformer/index';

let ObjectID = utility.ObjectID;
let repository = utility.repository;

let task = function (Hauler, request, taskObject, callback) {
	Hauler.getDataSource().connector.connect(function(err, db){
		if(err){
			console.log("Connection Error");
			return failed(null, httpConstant.connection_err.status, err.message, callback);
		}
		createNewtask(Hauler, db, request, taskObject, callback);
	})
}

function createNewtask(Hauler, db, request, taskObject, callback){
	let additional = {
		haulerId: ObjectID(request.headers.userid, callback)
	}
	taskObject = Object.assign(taskObject, additional);
	let taskTransformeredObject = transformer.task.model(taskObject);
	checkTaskCreatationDate(Hauler, db, request, taskTransformeredObject, callback);
}

function checkTaskCreatationDate(Hauler, db, request, taskTransformeredObject, callback){
	let jobDate = new Date(request.body.jobDate);
	let today = new Date();
	today.setHours(0, 0, 0, 0);
	if(today <= jobDate){
		let taskCollection = Hauler.app.models.task;
		repository.create(taskCollection, taskTransformeredObject, function(result){
			result['_id'] = result.id;
			Object.assign(result, {
				order_type: "task",
				status: "unassigned"
			})
			let taskTransformeredObject = transformer.task.response(result);
			success(taskTransformeredObject, httpConstant.task_created.status, httpConstant.task_created.msg, callback);
		}, callback)
	}else 
		failed(null, httpConstant.create_task_failed.status, httpConstant.create_task_failed.msg, callback);
}


module.exports = task;
