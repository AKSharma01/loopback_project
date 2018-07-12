import utility from '../Utility/index';
import transformer from './transformer/index';
import httpConstant from '../../Response/httpConstant';
import {success, failed} from '../../Response/response';

let jwtUtility = utility.jwt;
let repository = utility.repository;
let encryption = utility.encryption;

let credential = function(hauler, credentialObject, callback){
	hauler.getDataSource().connector.connect((err, db)=>{
		if(err){
			console.log("Connection Error");
			return failed(null, httpConstant.connection_err.status, err.message, callback);
		}

		if(!credentialObject.username || !credentialObject.password){
			console.log("hauler credential missing");
			return failed(null, httpConstant.connection_err.status, httpConstant.connection_err.msg, callback);
		}
		let haulerCollection = db.collection('hauler');
		let query = {};
		let typeOfLogin = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
		
		if(typeOfLogin.test(credentialObject.username))
			query = {
				company_email: credentialObject.username
			}
		else
			query = {
				user_name: credentialObject.username
			}
			
		repository.findOne(haulerCollection, query, function(haulerObject){
			if(haulerObject == null){
				console.log("username not found");
				return failed(null, httpConstant.hauler_not_found.status, httpConstant.hauler_not_found.msg, callback);
			}
			validateCredential(db, credentialObject, haulerObject, callback);
		}, callback);
	});
}

function validateCredential(db, credentialObject, haulerObject, callback){
	encryption.compare(credentialObject.password, haulerObject.password, function(err, res) {
		if(!res) {
		// Passwords don't match
			console.log("repeated password error");
			return failed(null, httpConstant.hauler_invalid.status, httpConstant.hauler_invalid.msg, callback);
		}
		// Passwords match
		let userId = String(haulerObject._id);
		jwtUtility.jwtTokenGenerator(userId, function(token){
			let responseTransformed = transformer.registerHauler.response(haulerObject);
			responseTransformed['token'] = token;
			success(responseTransformed, httpConstant.hauler_login.status, httpConstant.hauler_login.msg callback);
		}, callback)

	});
}

module.exports = credential;
