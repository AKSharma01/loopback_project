'use strict';

var ObjectID = require('mongodb').ObjectID;
var config = require('./config');

/* ================================================ Container Seeder =======================================
 *	This will migrate all the container size assigned in 'required_containers' variable. if Few are 
 * already there in 'orderstatusmaster' Collection then those are not in Collection will be seeder into it.
 * =========================================================================================================
 */
config.mongoClient.connect(config.dbURL, function (err, client) {
	if (err) {
		throw err;
	} else {
		var db = client.db(config.database);

		var orderStatusCollection = db.collection('orderstatusmaster');

		orderStatusCollection.find({}).toArray(function (err, containers) {
			if (err) {
				console.log("error: ", err);
				throw err;
			}

			// required_containers variable contains all the size of the container.
			var required_containers = ['In Use', 'Pending Delivery', 'Pending Removal', 'Complete'];

			// already_inserted variable use to get all the sizes already exist in Collection.
			var already_inserted = [];
			containers.forEach(function (container) {
				already_inserted.push(container.status);
			});

			// this for loop is used to get the name of container that used to be inserted into the Collection.
			var need_to_insert = [];
			required_containers.forEach(function (container) {
				if (already_inserted.indexOf(container) == -1) {
					need_to_insert.push({
						status: container,
						updatedat: new Date()
					});
				}
			});
			// console.log("new containers are: ", need_to_insert);
			if (need_to_insert.length) orderStatusCollection.insert(need_to_insert, function (err, data) {
				if (err) {
					console.log("error: ", err);
					return client.close();
				}
				console.log("No of new Inserted Items: ", data.insertedCount);
				console.log("inserted with new mongo Ids:  ", data.insertedIds);
				client.close();
			});else {
				console.log("Container collection is updated.");
				client.close();
			}
		});
	}
});