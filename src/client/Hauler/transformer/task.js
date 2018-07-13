let model = function(taskObject){
	let currentDate = new Date();
	return {
		task_name: taskObject.taskName,
		description: taskObject.description,
		hauler_id: taskObject.haulerId,
		job_date: taskObject.jobDate,
		created_at: currentDate,
		updated_at: taskObject.jobDate,
		deleted_at: null
	}
}

let response = function(taskObject){
	return {
		id: taskObject._id,
		taskName: taskObject.task_name,
		description: taskObject.description,
		haulerId: taskObject.hauler_id,
		jobDate: taskObject.job_date,
		createdAt: taskObject.created_at,
		updatedAt: taskObject.updated_at,
		deletedAt: taskObject.deleted_at,
		status: taskObject.status,
		assigned: (taskObject.driverId? true: false)
	}
}

let arrayResponse = function(taskList){
	let responseTask = [];
	for(let i=0; i<taskList.length; i++){
		let taskObject = taskList[i];
		responseTask.push({
			id: taskObject._id,
			taskName: taskObject.task_name,
			description: taskObject.description,
			createdAt: taskObject.created_at,
			haulerId: taskObject.hauler_id,
			updatedAt: taskObject.updated_at,
			deletedAt: taskObject.deleted_at
		});
	}
	return responseTask;
}

module.exports = {
	model: model,
	response: response,
	arrayResponse: arrayResponse
}