// output a list of Flickr Pandas

var defaults = {
  'host': 'api.flickr.com',
  'endpoint': '/services/rest/'
};
var sys = require('sys'),
    http = require('http'),
    querystring = require('querystring'),
    flickr_setup = require('../setup/flickr_keys').setup;
    
var params = {
      method: 'flickr.panda.getList',
      api_key: flickr_setup.key,
      format: 'json',
      nojsoncallback: 1
    },
    callback = function(res){
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
          console.log(response.pandas.panda);
        }
      });
    };
    
http.get({ 
  host: defaults.host, 
  path: defaults.endpoint+'?'+querystring.stringify(params)}, 
  callback
).on('error', function(e) {
  console.error(e);
});
