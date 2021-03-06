var PhotoCollection = require('../lib/photo_collection').PhotoCollection;

function connect(host, port, database, username, password) {
	this.photo_collection = new PhotoCollection(host, port, database, username, password);
}


function listMongoPictures() {
	this.photo_collection.all(function(error, results){
		if(error) console.log(error);
		else {
			results.forEach(function(photo){				
				console.log(PhotoCollection.getURL(photo));
				this.photo_collection.save(photo, function(error, item){
					if(error) {
						console.log(error);
					} else {
						console.log("Photo saved!");
					}
				});
			});
		}
	});
}

function count() {
	this.photo_collection.count(function(error, result) {
		if(error) console.log(error);
		else {
			console.log("Total pictures: %d", result);
		}
	});
}

function countWithTag() {
	this.photo_collection.withTag('girl', function(error, results) {
		if(error) console.log(error);
		else {
			console.log(results.length);
			results.forEach(function(photo){				
				console.log(PhotoCollection.getURL(photo));
			});
		}
	});
}


function run() {
	connect("staff.mongohq.com", 10034, "nodeko2011", "dqo", "nodeko2011");
	// listMongoPictures();	
	count();
	// countWithTag();
	// listAndUpdateMongoPictures();
	setTimeout(run, 60000);
}

run();
