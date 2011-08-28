var HOSTED_ON_JOYENT = /\/home\/node\/node\-service\/releases\/[^\/]*\/lib\/quest_utils.js/.test(__filename)
		,FAYE_PORT       = HOSTED_ON_JOYENT ? 80 : 8080 
		,BLURB_SIZE      = 8
		,BLURB_CHARS     = "abcdefghijklmnopqrstuvxywz"
		,URI             = '/quest'
		
console.log("Hosted on joyent? %s", HOSTED_ON_JOYENT)

QuestUtils = function() {}
	
QuestUtils.baseUrl = function(req) {
	return req.headers['host'].split(":")[0];
}
	
QuestUtils.generateBlurb = function() {
	var blurb = '';
  for (i=0;i<BLURB_SIZE;i++){
    blurb += BLURB_CHARS[Math.floor(Math.random()*BLURB_CHARS.length)]
  }
  return blurb;
}
	
QuestUtils.getPubSubServerURL = function(req) {
	url = "http://"+this.baseUrl(req)
	if(HOSTED_ON_JOYENT) {
		url += URI
	} else {
		url += ":"+FAYE_PORT+URI
	}
	return url
}

QuestUtils.getFayePort = function() {
	return FAYE_PORT;
}

QuestUtils.getURI = function() {
	return URI;
}


exports.QuestUtils = QuestUtils;