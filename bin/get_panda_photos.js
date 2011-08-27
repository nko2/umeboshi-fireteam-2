// output a list of Flickr Pandas

var defaults = {
  'host': 'api.flickr.com',
  'endpoint': '/services/rest/'
};
var http = require('http'),
    querystring = require('querystring'),
    flickr_setup = require('../setup/flickr_keys').setup;

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
            if (item.license > 0){ //creative commons photos
              console.log(item);
            }
          });
          var delay =  (1000 * (response.photos.lastupdate + response.photos.interval)) - new Date().getTime();
          console.log(delay);
          setTimeout(retrievePhotos, delay);
        }
      });
    }


retrievePhotos();