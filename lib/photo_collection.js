var MongoDB = require('mongodb').Db
		, MongoServer = require('mongodb').Server;
		
PhotoCollection = function(host, port) {
	this.db = new MongoDB('panda_photos', new MongoServer(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
}

PhotoCollection.prototype.save = function(photo, callback) {
	this.db.collection('panda_collection', function(error, collection){
		if(error) {
			console.log(error);
		} else {
			collection.insert(photo, function(){
				callback(null, photo);
			});
		}
	});
}

PhotoCollection.prototype.all = function(callback) {
	this.db.collection('panda_collection', function(error, collection) {
		if(error) {
			console.log(error);
		} else {
			collection.find().toArray(function(error, results) {
        if( error ) callback(error);
        else callback(null, results);
      });
		}
	});
}

exports.PhotoCollection = PhotoCollection;
