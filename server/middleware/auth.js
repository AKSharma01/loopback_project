import jwtUtility from '../../client/Utility/jwtUtility';
import httpConstant from '../../Response/httpConstant';
import {failed} from '../../Response/response';
import routes from './routes.json';

let auth = function(req, res, next){
	
	/* req._parsedUrl.pathname will return the api url.
	 */
	let authRequired = req._parsedUrl.pathname;
	let allow = routes.allow;
	let regexUrl = routes.regex;
	let verified = false;

	// let setPasswordUrlRegex = new RegExp("/api/haulers/setpassword(/?|/\w+)"); 
	for(let i=0 ; i<allow.length; i++){
		if(allow[i].url === authRequired){
			console.log("auth not required");
			verified = true;
			next();
			break;
		}
	}
	if(!verified)
		for(let i=0 ; i<regexUrl.length; i++){
			let createRegexUrl = new RegExp(regexUrl[i].url+"(/?|/\w+)")
			if(createRegexUrl.test(authRequired)){
				console.log("auth not required for the specified regex");
				verified = true;
				next();
				break;
			}
		}

	if(req.headers['x-dispatcher-api']){
		console.log("3rd party api");
		verified = true;
		next();
	}

	if(!verified){
		verifyUserToken(req, function(err, verified){
			if(err){
				res.statusCode = err.statusCode
				res.json({
					data: null,
					message: err.message,
					statusCode: err.statusCode,
					type: "failed"
				})
			}else if(verified)
				next();
		});
	}
}

function verifyUserToken(request, callback){
	jwtUtility.jwtTokenVerify(request.headers.token, function(error, response){
		if(error){
			console.log("jwt token expire or not valid");
			return callback({
				statusCode: httpConstant.jwt_err.status,
				message: error.message
			}, null);
		}
		/* this process don't have any meaning */
		if(response.user_id !== request.headers.userid){
			console.log("token has not been verified");
			return callback({
				statusCode: httpConstant.token_id_mismatch.status,
				message: httpConstant.token_id_mismatch.msg
			}, null)
		}
		callback(null, true);
	}, callback)
}

module.exports = function () {
	return auth;
}