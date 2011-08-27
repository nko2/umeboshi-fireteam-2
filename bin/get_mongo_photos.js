var PhotoCollection = require('../lib/photo_collection').PhotoCollection;

function connect(host, port) {
	this.photo_collection = new PhotoCollection(host, port);
}


function listMongoPictures() {
	this.photo_collection.all(function(error, results){
		if(error) console.log(error);
		else {
			results.forEach(function(photo){
				console.log(photo);
			});
		}
	});
}


connect("localhost", 27017);
listMongoPictures();