import request from 'request';
import {failed} from '../../Response/response';

function get(url, optional={}, callback, fcallback){
	optional.headers['x-dispatcher-api'] = true;

	request.get(url, optional, function(err, data){
		if(err)
			return failed(null, 417, err.message, fcallback);
		callback({
			data: data,
			message: "success"
		});
	});
}

function post(url, optional={}, callback, fcallback){
	request.post({
		url: url,
		headers: optional.headers,
		body: optional.body
	}, function(err, data){
		if(err){
			return callback({
				data: null,
				message: err.message
			})
		}
		else{
			return callback({
				data: data,
				message: "success"
			});
		}
	});
}


let requestAPI = function (url, method, optional, callback, fcallback) {
	try{
		switch(method){
			case 'get':
			case 'GET': get(url, optional, callback, fcallback);
				break;
			case 'post':
			case 'POST': post(url, optional, callback, fcallback);
				break;
			case 'put': 
			case 'PUT': put(url, optional, callback, fcallback);
				break;
			default: throw "Yet get, post and put is defined"
		}
	}catch(exception){
		console.log("Exception: ", exception);

		callback({
			data: null, 
			message: exception.message
		});
	}
}

module.exports = requestAPI;