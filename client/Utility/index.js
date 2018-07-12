import jwt from './jwtUtility';
import sendMail from './sendMail';
import ObjectID from './ObjectID';
import encryption from './encryption';
import repository from './repository';
import requestAPI from './requestAPI';
import otpGenerator from './generateOTP';
import slackWebhook from './slackWebhook';

module.exports = {
	jwt: jwt,
	sendMail: sendMail,
	ObjectID: ObjectID,
	encryption: encryption,
	repository: repository,
	requestAPI: requestAPI,
	otpGenerator: otpGenerator,
	slackPushNotification: slackWebhook
}