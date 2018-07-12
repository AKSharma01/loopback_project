import SES from 'aws-sdk/clients/ses';
import mailcomposer from 'mailcomposer';
import {failed} from '../../Response/response';
import httpConstant from '../../Response/httpConstant';
import env from '../../server/env.json';

let sendMail = (to, emailObject, attachment) => {
	var ses = new SES(env.aws);
	const mail = mailcomposer({
		from: 'akashkr.sharma369@gmail.com',
		to: to,
		subject: emailObject.subject,
		html: emailObject.body,
		attachments: attachment
	});
	mail.build(function(err, message) {
		if (err) {
			console.log("error in building mail: ", err);
			return ;
		}
		ses.sendRawEmail({
			RawMessage: {
				Data: message
			}
		}, function(err, data){
			if(err)
				console.log("error: ", err);
			else
				console.log("mail send: ", data);
		});
	});
}

module.exports = sendMail;