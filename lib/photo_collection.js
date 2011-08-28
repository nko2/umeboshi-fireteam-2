var mongo = require('mongodb');

var BASE_COLLECTION_NAME = 'panda_collection';

PhotoCollection = function(host, port, database, username, password) {
	if(username && password) {
		this.url = "mongodb://" + username + ":" + password + "@" +host + ":" + port + "/" + database;
	} else {
		this.url = "mongodb://" + host + ":" + port + "/" + database;
	}
	var self = this;
}

PhotoCollection.prototype.save = function(photo, callback) {
	var self = this;
	mongo.connect(this.url, function(error, db){
		db.collection(BASE_COLLECTION_NAME, function(error, collection){
			if(error) {
				console.log(error);
			} else {
				photo.url = PhotoCollection.getURL(photo);
				if(typeof photo.tags == "string")
					photo.tags = photo.tags.split(" ");
				self.count(function(error, result){
					if(error) {
						console.log(error);
					} else {
						photo.counter = result;
						collection.insert(photo, function(){
							callback(null, photo);
						});
					}
				});
			}
		});
	});
}

PhotoCollection.prototype.all = function(callback) {
	mongo.connect(this.url, function(error, db){
		db.collection(BASE_COLLECTION_NAME, function(error, collection) {
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
		db.collection(BASE_COLLECTION_NAME, function(error, collection) {
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

PhotoCollection.prototype.withTag = function(myTag, callback) {
	mongo.connect(this.url, function(error, db){
		db.collection(BASE_COLLECTION_NAME, function(error, collection) {
			if(error) {
				console.log(error);
			} else {
				collection.find({tags: {$regex : myTag, $options: 'i'}}).toArray(function(error, results) {
	        if( error ) callback(error);
	        else callback(null, results); 
	      });
			}
		});
	});	
}

PhotoCollection.prototype.classify = function(photo, tag, callback) {
	photo.tags.push(tag);
	mongo.connect(this.url, function(error, db){
		db.collection(tag + "_" + BASE_COLLECTION_NAME, function(error, collection){
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

PhotoCollection.getURL = function(photo) {
	return "http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
}

exports.PhotoCollection = PhotoCollection;
