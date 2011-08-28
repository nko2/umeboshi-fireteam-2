var FAYE_PORT       = 8888
		,BLURB_SIZE     = 8
		,BLURB_CHARS    = "abcdefghijklmnopqrstuvxywz"
		,URI            = '/quest'

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
	return "http://"+this.baseUrl(req)+":"+FAYE_PORT+URI
}

QuestUtils.getFayePort = function() {
	return FAYE_PORT;
}

QuestUtils.getURI = function() {
	return URI;
}


exports.QuestUtils = QuestUtils;