import {failed} from '../../Response/response';

let mongoId = require('mongodb').ObjectID;

function ObjectID(id, callback) {
	try{
		return mongoId(id)
	}catch(exception){
		console.log("exception: ", exception);
		return failed(null, 400, "id is not valid", callback);
	}
}

module.exports = ObjectID; 