import bcrypt from 'bcrypt';
import {failed} from '../../Response/response';


let bcryption = function(originalString, callback, fcallback){ 
	bcrypt.hash(originalString, 10, function(err, hashString) {
		if(err){
			console.log("encryption error");
			return failed(null, 417, "encryption error", fcallback);
		}
		callback(hashString);
	});
}

let compare = function(stringToTest, hash, callback, fcallback){ 
	bcrypt.compare(stringToTest, hash, function(err, res) {
	    if(err){
			console.log("encryption error");
			return failed(null, 417, "encryption error", fcallback);
		}
		callback(res);
	});
}

module.exports = {
	bcryption: bcryption,
	compare: compare
}