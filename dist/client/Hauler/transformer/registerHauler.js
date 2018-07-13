"use strict";

var model = function model(haulerObject) {
	var currentDateTime = new Date();
	return {
		company_name: haulerObject.name,
		company_email: haulerObject.email,
		phone: haulerObject.phone,
		user_name: "",
		type: "h",
		active: false,
		created_at: currentDateTime,
		updated_at: currentDateTime,
		deleted_at: null,
		activated_at: null,
		hauler_id: "",
		password: ""
	};
};
var response = function response(haulerObject) {
	return {
		id: haulerObject._id,
		name: haulerObject.company_name,
		email: haulerObject.company_email,
		phone: haulerObject.phone,
		username: haulerObject.user_name,
		type: haulerObject.type,
		active: haulerObject.active,
		createdAt: haulerObject.created_at,
		updatedAt: haulerObject.updated_at,
		deletedAt: haulerObject.deleted_at,
		activatedAt: haulerObject.activated_at,
		haulerId: haulerObject.hauler_id
	};
};

module.exports = {
	model: model,
	response: response
};