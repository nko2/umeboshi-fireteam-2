// Setup

var  HOSTED_ON_JOYENT = /\/home\/node\/node\-service\/releases\/[^\/]*\/server.js/.test(__filename)
		,WEBSERVER_PORT = HOSTED_ON_JOYENT ? 80 : 8080

/**
 * Module dependencies.
 */
var NKO_KEY = HOSTED_ON_JOYENT ? '/home/node/nko' : './setup/nko';
var nko_setup = require(NKO_KEY).setup;
var express = require('express')
		, nko = require('nko')(nko_setup.secret)
		, string = require('./lib/string').String
		, PhotoCollection = require('./lib/photo_collection').PhotoCollection;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
var host = "staff.mongohq.com"
	, port = 10034 
	, database = "nodeko2011"
	, username = "dqo"
	, password = "nodeko2011";
var photo_collection = new PhotoCollection(host, port, database, username, password);

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/pictures', function(req, res){
	var message = 'All pictures ({count})';
	photo_collection.all(function(error, results) {
		if(error) console.log(error);
		else {
			console.log("Results for tag '%s': %d", req.params.tag, results.length);
			res.render('pictures', {
				title: message.interpolate({count:results.length})
				, pictures : results
			});
		}
	});
});

app.get('/pictures/:tag', function(req, res){
	var message = 'Pictures tagged as {tag} ({count})';
	photo_collection.withTag(req.params.tag, function(error, results) {
		if(error) console.log(error);
		else {
			console.log("Results for tag '%s': %d", req.params.tag, results.length);
			res.render('pictures', {
				title: message.interpolate({tag:req.params.tag, count:results.length})
				, pictures : results
			});
		}
	});
});

app.post('/pictures/:id/classify/:tag', function(req, res){
	photo_collection.findByID(req.params.id, function(error, photo){
		if(error) {
			console.log(error);
		} else {
			photo_collection.classify(photo, req.params.tag, function(error, photo){
				if(error) {
					console.log(error);
				} else {
					console.log("CLASSIFIED");
				}
			});
		}
	});
});

app.listen(WEBSERVER_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
