import Slack from 'slack-node';
import config from '../../server/env';

let apiToken = config.slack['api-token'];
let slack = new Slack(apiToken);

let notification = function (object, callback) {
	slack.api('chat.postMessage', {
		text: "driver phoneno: "+object.phone+" otp: "+object.otp,
		channel: config.slack.channel
	}, function(err, response){
		if(err){
			console.log("notification error");
			return callback(err, {});
		}
		callback(null, response);
	});	
}

module.exports = notification;