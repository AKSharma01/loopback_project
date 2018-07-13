'use strict';
import hauler from '../../client/Hauler/index.js';


module.exports = function(Hauler) {

	Hauler.login = function(haulerCredential, callback){
		hauler.login(Hauler, haulerCredential, callback);
	}

	Hauler.remoteMethod('login', {
		accepts: {
			arg: 'haulerCredential',
			type: 'object',
			http:{
				source: 'body'
			},
		},
		returns: {
			type: 'object',
			root: true
		},
		http: {
			verb: 'post',
			status: 200
		}
	})

	Hauler.task = function(req, taskObject, callback){
		hauler.task(Hauler, req, taskObject, callback);
	}

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

	
}