let ObjectID = require('mongodb').ObjectID;
let config = require('./config');

/* ================================================ Container Seeder =======================================
 *	This will migrate all the container size assigned in 'required_containers' variable. if Few are 
 * already there in 'containermaster' Collection then those are not in Collection will be seeder into it.
 * =========================================================================================================
 */

config.mongoClient.connect(config.dbURL, function (err, client) {
	if (err) {
		throw err;
	} else {
		let db = client.db(config.database);
		
		let counterCollection = db.collection('counters');

		counterCollection.find({}).toArray(function(err, counters){
			if(err){
				console.log("error: ", err);
				throw err;
			}

			// required_counter variable contains counter id.
			let required_counter = [{
					_id: "userid",
					prefix: "U",
					sequence_value: 1
				}, {
					_id: "customerid",
					prefix: "C",
					sequence_value: 1
				}, {
					_id: "haulerid",
					prefix: "H",
					sequence_value: 1
				}, {
					_id: "activityid",
					prefix: "A",
					sequence_value: 1
				}, {
					_id: "driverid",
					prefix: "D",
					sequence_value: 1
				}
			];
			
			
			let already_inserted = [];
			counters.forEach(function(counter){
				already_inserted.push(counter._id)
			});

			// this for loop is used to get the name of counterId that used to be inserted into the Collection.
			let need_to_insert = [];
			required_counter.forEach(function(counter){
				if(already_inserted.indexOf(counter._id) == -1){
					need_to_insert.push(counter);
				}
			});

			if(need_to_insert.length)
				counterCollection.insert(need_to_insert, function(err, data){
					if (err){
						console.log("error: ", err);
						return client.close();
					}
					console.log("No of new Inserted Items: ", data.insertedCount);
					console.log("inserted with new mongo Ids:  ", data.insertedIds);
					client.close();
				});
			else{
				console.log("Counter collection is updated.");
				client.close();
			}
		})
	}

});


