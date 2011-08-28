var config = {
  slots: 5,
  // //http://www.colourlovers.com/palette/92095/Giant_Goldfish
  // colors: [
  //   'rgb(105,210,231)',
  //   'rgb(167,219,216)',
  //   'rgb(224,228,204)',
  //   'rgb(243,134,48)',
  //   'rgb(250,105,0)'
  // ]
  // //http://www.colourlovers.com/palette/694737/Thought_Provoking
  // colors: [
  //   'rgb(236,208,120)',
  //   'rgb(217,91,67)',
  //   'rgb(192,41,66)',
  //   'rgb(84,36,55)',
  //   'rgb(83,119,122)'
  // ]
  // //http://www.colourlovers.com/palette/580974/Adrift_in_Dreams
  // colors: [
  //  'rgb(207,240,158)',
  //  'rgb(168,219,168)',
  //  'rgb(121,189,154)',
  //  'rgb(59,134,134)',
  //  'rgb(11,72,107)'
  // ]
  // //http://www.colourlovers.com/palette/867235/LoversInJapan
  // colors: [
  //  'rgb(233,78,119)',
  //  'rgb(244,234,213)',
  //  'rgb(198,164,154)',
  //  'rgb(198,229,217)',
  //  'rgb(214,129,137)'
  // ]
  // //http://www.colourlovers.com/palette/90734/Newly_Risen_Moon
  // colors: [
  //  'rgb(238,230,171)',
  //  'rgb(197,188,142)',
  //  'rgb(105,103,88)',
  //  'rgb(69,72,75)',
  //  'rgb(54,57,59)'
  // ]
  //http://www.colourlovers.com/palette/69661/The_Sketch
  colors: [
  'rgb(173,192,180)',
   'rgb(190,214,199)',
   'rgb(138,126,102)',
   'rgb(167,155,131)',
   'rgb(187,178,161)'
  ]
  };
var throbber_pulse_interval = 0,
    touch_startX = 0,
    touch_startY = 0,
    touch_lastX = 0,
    touch_lastY = 0,
    touch_oneFingerOnly = false,
    wedgeColors = [];

function resetaCoresFatias(){
  for (i=0; i<config.slots; i++){
    document.getElementById('wedge'+i).setAttribute('fill', 'rgb('+wedgeColors[i][0]+','+wedgeColors[i][1]+','+wedgeColors[i][2]+')');  
  }
}
function extractRGB(s){
  var r,g,b,
      rgbstring = s.replace(/ /g,'').toLowerCase(),
      pattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      matches = pattern.exec(rgbstring);
      return [parseInt(matches[1],10), parseInt(matches[2],10), parseInt(matches[3],10)];
}
function overWedge(el){
  var rgb = extractRGB(el.getAttribute('fill')),
      boost = 20;
  rgb[0] = Math.min(255,rgb[0]+boost);
  rgb[1] = Math.min(255,rgb[1]+boost);
  rgb[2] = Math.min(255,rgb[2]+boost);
  el.setAttribute('fill', 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')');
}
function touchstart(event){
	event.preventDefault();
	if(event.touches.length == 1){ // Only deal with one finger
		touch_oneFingerOnly = true;
    var touch = event.touches[0]; // Get the information for finger #1
		//atualiza as variaveis iniciais
		touch_startX = touch.pageX;
		touch_startY = touch.pageY;
		console.log('start: ' + touch_startX + "/" + touch_startX);
  } else {
	touch_oneFingerOnly = false;
}
}
function touchmove(event){
	if(event.touches.length == 1){ // Only deal with one finger
    var touch = event.touches[0]; // Get the information for finger #1
		//atualiza as variaveis enquanto mudar
		touch_lastX = touch.pageX;
		touch_lastY = touch.pageY;

		var deltaX = touch_lastX - touch_startX;
		var deltaY = touch_lastY - touch_startY;
		var angle = Math.atan2(deltaY,deltaX)/(Math.PI/180);
		var step = 180/config.slots;
		var fatia = Math.ceil(angle / step);
		resetaCoresFatias();
		overWedge(document.getElementById('wedge'+(fatia-1)));
		document.getElementById('score-left').innerHTML = fatia;
  }
}
function touchend(event){
	if(touch_oneFingerOnly){
    // var deltaX = touch_lastX - touch_startX;
    // var deltaY = touch_lastY - touch_startY;
    // var angle = Math.atan2(deltaY,deltaX)/(Math.PI/180);
    // console.log('ended with deltaX: ' + deltaX + " and deltaY: " + deltaY + " atan2: " + angle);
    // document.getElementById('score-left').innerHTML = Math.round(angle);
	}
}
function touchcancel(event){
	console.log('cancel');
}


function throbberPulse(){
  if (document.getElementById('photo-throbber').className.length > 0){
    document.getElementById('photo-throbber').className = '';
  }else{
    document.getElementById('photo-throbber').className = 'pulse';
  }
}

function playPhotoThrobber(){
  document.getElementById('photo-throbber').style.display = 'block';
  throbber_pulse_interval = setInterval(throbberPulse,1000);
}

function stopPhotoThrobber(){
  clearInterval(throbber_pulse_interval);
  document.getElementById('photo-throbber').style.display = 'none';
}

function resizeScore(ww, wh){
  var score_left = document.getElementById('score-left'),
      score_right = document.getElementById('score-right'),
      length_left = score_left.innerHTML.length,
      length_right = score_right.innerHTML.length,
      scaleHeight = wh / 768,
      scaleWidth = ww / 1024,
      novaAltura = 768 * 0.34 * scaleHeight,
      meiaLargura = (ww/2)/length_left,
      fontSizesLeft = [
        Math.round(Math.min(meiaLargura, novaAltura) * 1.53),
        Math.round(Math.min(meiaLargura, novaAltura) * 1.53),
        Math.round(Math.min(meiaLargura, novaAltura) * 1.53),
        Math.round(Math.min(meiaLargura, novaAltura) * 1.53),
        Math.round(Math.min(meiaLargura, novaAltura) * 1.53),
        Math.round(Math.min(meiaLargura, novaAltura) * 1.53)
      ];
      fontLineHeightsLeft = [
        Math.round(novaAltura * 1.53),
        Math.round(novaAltura * 1.53),
        Math.round(novaAltura * 1.53),
        Math.round(novaAltura * 1.53),
        Math.round(novaAltura * 1.53),
        Math.round(novaAltura * 1.53)
      ];
      console.log(novaAltura);
      fontLettersSpacing = [
        Math.round(novaAltura * - 0.07),
        Math.round(novaAltura * - 0.07),
        Math.round(novaAltura * - 0.07),
        Math.round(novaAltura * - 0.07),
        Math.round(novaAltura * - 0.07),
        Math.round(novaAltura * - 0.07)
      ];
  // var fontSizesLeft = [
  //   768 / 
  // ];
  // score_left.style.height = fontLineHeightsLeft[length_left-1] + 'px';
  score_left.style.fontSize = fontSizesLeft[length_left-1] + 'px';
  // score_left.style.letterSpacing = fontLettersSpacing[length_left-1] + 'px';
  console.log(fontLettersSpacing[length_left-1]);
  
  // font-size:400px;
  // line-height:400px;
  // letter-spacing:-20px;
  // margin-top:-24px;
  
}
function windowResized(){
  var new_h = window.innerHeight;
  var new_w = window.innerWidth;
  document.body.style.height = new_h+'px';
  document.getElementById('main').style.height = new_h+'px';
  resizeScore(new_w, new_h);
}
function updateScoreSize(){
  var length_left = document.getElementById('score-left').innerHTML.length,
      length_right = document.getElementById('score-right').innerHTML.length;
  document.getElementById('score-left').className = 'n-digits-'+length_left;
  document.getElementById('score-right').className = 'n-digits-'+length_right;
}
function drawBuckets(slots){
  var color_rnd = config.colors[Math.round(Math.random())+2];
  var svg_prefix = "<svg id=\"base\" fill=\"none\" stroke=\"none\" width=\"2500\" height=\"5000\"><g><path transform=\"translate(0, 2500)\" d=\"M3.061616997868383e-13,-5000A5000,5000 0 0,1 ";
  var svg_paths = [
    "5000,0L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\"  id=\"wedge0\"/><path id=\"wedge1\" transform=\"translate(0, 2500)\" d=\"M5000,0A5000,5000 0 0,1 3.061616997868383e-13,5000L0,0Z\" fill=\""+ color_rnd +"\"",
    "4330.127018922193,-2500L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\" id=\"wedge0\"/><path id=\"wedge1\" transform=\"translate(0, 2500)\" d=\"M4330.127018922193,-2500A5000,5000 0 0,1 4330.127018922193,2499.999999999999L0,0Z\" fill=\""+ config.colors[3] +"\" fill-rule=\"evenodd\"/><path id=\"wedge2\" transform=\"translate(0, 2500)\" d=\"M4330.127018922193,2499.999999999999A5000,5000 0 0,1 1.416384724411995e-12,5000L0,0Z\" fill=\""+ config.colors[2] +"\"",
    "3535.533905932738,-3535.5339059327375L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\" id=\"wedge0\"/><path id=\"wedge1\" transform=\"translate(0, 2500)\" d=\"M3535.533905932738,-3535.5339059327375A5000,5000 0 0,1 5000,0L0,0Z\" fill=\""+ config.colors[3] +"\" fill-rule=\"evenodd\"/><path id=\"wedge2\" transform=\"translate(0, 2500)\" d=\"M5000,0A5000,5000 0 0,1 3535.533905932738,3535.5339059327375L0,0Z\" fill=\""+ config.colors[0] +"\" fill-rule=\"evenodd\"/><path id=\"wedge3\" transform=\"translate(0, 2500)\" d=\"M3535.533905932738,3535.5339059327375A5000,5000 0 0,1 3.061616997868383e-13,5000L0,0Z\" fill=\""+ config.colors[2] +"\"",
    "2938.9262614623663,-4045.0849718747368L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\" id=\"wedge0\"/><path id=\"wedge1\" transform=\"translate(0, 2500)\" d=\"M2938.9262614623663,-4045.0849718747368A5000,5000 0 0,1 4755.282581475768,-1545.084971874737L0,0Z\" fill=\""+ config.colors[0] +"\" fill-rule=\"evenodd\"/><path id=\"wedge2\" transform=\"translate(0, 2500)\" d=\"M4755.282581475768,-1545.084971874737A5000,5000 0 0,1 4755.282581475768,1545.084971874737L0,0Z\" fill=\""+ config.colors[3] +"\" fill-rule=\"evenodd\"/><path id=\"wedge3\" transform=\"translate(0, 2500)\" d=\"M4755.282581475768,1545.084971874737A5000,5000 0 0,1 2938.9262614623663,4045.0849718747368L0,0Z\" fill=\""+ config.colors[1] +"\" fill-rule=\"evenodd\"/><path id=\"wedge4\" transform=\"translate(0, 2500)\" d=\"M2938.9262614623663,4045.0849718747368A5000,5000 0 0,1 3.061616997868383e-13,5000L0,0Z\" fill=\""+ config.colors[2] +"\""
  ];
  var svg_sufix = " fill-rule=\"evenodd\"/></g></svg>";
  document.getElementById('bucket-background').innerHTML = svg_prefix + svg_paths[slots-2] + svg_sufix;
  document.getElementById('top-strip').style.backgroundColor = config.colors[0];
  document.getElementById('score').style.backgroundColor = config.colors[1];
  if (slots == 2) {
    document.getElementById('score-left').style.color = color_rnd;
  } else{
    document.getElementById('score-left').style.color = config.colors[2];
  }
  document.getElementById('score-right').style.color = config.colors[4];
}
function wedgeHover(ev){
  overWedge(ev.target);
}
function wedgeOut(ev){
  var wedge_index = parseInt(ev.target.id.charAt(ev.target.id.length-1),10);
  ev.target.setAttribute('fill', 'rgb('+wedgeColors[wedge_index][0]+','+wedgeColors[wedge_index][1]+','+wedgeColors[wedge_index][2]+')');  
}
//dom ready
function pageLoaded(){
  windowResized();
  drawBuckets(config.slots);
  window.addEventListener('resize', windowResized, true);
  console.log(config.slots);
  for (i=0; i<config.slots; i++){
    console.log(document.getElementById('wedge'+i));
    var wedge = document.getElementById('wedge'+i);
    wedgeColors.push(extractRGB(wedge.getAttribute('fill')));
    wedge.addEventListener('mouseover', wedgeHover, true);
    wedge.addEventListener('mouseout', wedgeOut, true);
  }
  console.log(wedgeColors);
}
