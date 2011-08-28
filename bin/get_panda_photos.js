// output a list of Flickr Pandas
var HOSTED_ON_JOYENT = /\/home\/node\/node\-service\/releases\/[^\/]*\/server.js/.test(__filename)
var FLICKR_KEY = HOSTED_ON_JOYENT ? '/home/node/flickr_keys' : '../setup/flickr_keys';
var defaults = {
  'host': 'api.flickr.com',
  'endpoint': '/services/rest/'
};
var http = require('http'),
    querystring = require('querystring'),
    flickr_setup = require(FLICKR_KEY).setup;
var PhotoCollection = require('../lib/photo_collection').PhotoCollection;

var panda_name = 'ling ling',
    extras = [
      'description',
      'license',
      'tags',
      'date_upload',
      'date_taken',
      'owner_name',
      'icon_server',
      'original_format',
      'last_update',
      'geo',
      'machine_tags',
      'o_dims',
      'views',
      'media',
      'path_alias',
      'url_sq',
      'url_t',
      'url_s',
      'url_m',
      'url_z',
      'url_l',
      'url_o'
    ].join(','),
    per_page = 500,
    page = 1,
    params = {
      method: 'flickr.panda.getPhotos',
      api_key: flickr_setup.key,
      panda_name: panda_name,
      extras: extras,
      per_page: per_page,
      page: page,
      format: 'json',
      nojsoncallback: 1
    };
    
function callback(){}

function connect(host, port, database, username, password) {
	this.photo_collection = new PhotoCollection(host, port, database, username, password);
}

function retrievePhotos(){
  http.get({ 
    host: defaults.host, 
    path: defaults.endpoint+'?'+querystring.stringify(params)}, 
    callback
  ).on('error', function(e) {
    console.error(e);
  });
}

function callback(res){
      res.setEncoding('utf8');
      res.on('data', function(d) {
        if(typeof this.data === 'undefined'){
          this.data = d;
        }else{
          this.data += d;
        }
      });
      res.on('end', function(d) {
        var response = JSON.parse(this.data);
        if (response.stat == 'ok'){
          response.photos.photo.forEach(function(item){
            //if (item.license > 0){ //creative commons photos
              console.log(item);
							this.photo_collection.save(item, function(error, item){
								if(error) {
									console.log(error);
								} else {
									console.log("Photo saved!"+item);
								}
							});
            //}
          });
          var delay =  Math.abs((1000 * (response.photos.lastupdate + response.photos.interval)) - new Date().getTime());
          console.log(delay);
          setTimeout(retrievePhotos, delay);
        }
      });
    }

// connect("localhost", 27017);
connect("staff.mongohq.com", 10034, "nodeko2011", "dqo", "nodeko2011");
retrievePhotos();