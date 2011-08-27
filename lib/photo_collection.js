var mongo = require('mongodb');

PhotoCollection = function(host, port, database, username, password) {
	if(username && password) {
		this.url = "mongodb://" + username + ":" + password + "@" +host + ":" + port + "/" + database;
	} else {
		this.url = "mongodb://" + host + ":" + port + "/" + database;
	}
	// require('mongodb').connect(url, function(error, conn){
		// if(error) {
		// 			console.log(error);
		// 		} else {
		// 			conn.collection('test', function(error, collection) {
		// 				if(error) {
		// 					console.log(error);
		// 				} else {
		// 					collection.find().toArray(function(error, results) {
		// 		        if( error ) callback(error);
		// 		        else {
		// 							results.forEach(function(item){
		// 								console.log(item);
		// 							});
		// 						}
		// 		      });
		// 				}
		// 			});
		// 		}
	// });
}

PhotoCollection.prototype.save = function(photo, callback) {
	mongo.connect(this.url, function(error, db){
		db.collection('panda_collection', function(error, collection){
			if(error) {
				console.log(error);
			} else {
				collection.insert(photo, function(){
					callback(null, photo);
				});
			}
		});
	});
}

PhotoCollection.prototype.all = function(callback) {
	mongo.connect(this.url, function(error, db){
		db.collection('panda_collection', function(error, collection) {
			if(error) {
				console.log(error);
			} else {
				collection.find().toArray(function(error, results) {
	        if( error ) callback(error);
	        else callback(null, results); 
	      });
			}
		});
	});
}

PhotoCollection.prototype.count = function(callback) {
	mongo.connect(this.url, function(error, db){
		db.collection('panda_collection', function(error, collection) {
			if(error) {
				console.log(error);
			} else {
				collection.count(function(error, results) {
	        if( error ) callback(error);
	        else callback(null, results); 
	      });
			}
		});
	});
}

exports.PhotoCollection = PhotoCollection;
