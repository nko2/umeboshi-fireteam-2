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
var throbber_pulse_interval = 0;

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
  var svg_prefix = "<svg fill=\"none\" stroke=\"none\" width=\"2500\" height=\"5000\"><g><path transform=\"translate(0, 2500)\" d=\"M3.061616997868383e-13,-5000A5000,5000 0 0,1 ";
  var svg_paths = [
    "5000,0L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M5000,0A5000,5000 0 0,1 3.061616997868383e-13,5000L0,0Z\" fill=\""+ color_rnd +"\"",
    "4330.127018922193,-2500L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M4330.127018922193,-2500A5000,5000 0 0,1 4330.127018922193,2499.999999999999L0,0Z\" fill=\""+ config.colors[3] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M4330.127018922193,2499.999999999999A5000,5000 0 0,1 1.416384724411995e-12,5000L0,0Z\" fill=\""+ config.colors[2] +"\"",
    "3535.533905932738,-3535.5339059327375L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M3535.533905932738,-3535.5339059327375A5000,5000 0 0,1 5000,0L0,0Z\" fill=\""+ config.colors[3] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M5000,0A5000,5000 0 0,1 3535.533905932738,3535.5339059327375L0,0Z\" fill=\""+ config.colors[0] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M3535.533905932738,3535.5339059327375A5000,5000 0 0,1 3.061616997868383e-13,5000L0,0Z\" fill=\""+ config.colors[2] +"\"",
    "2938.9262614623663,-4045.0849718747368L0,0Z\" fill=\""+ config.colors[4] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M2938.9262614623663,-4045.0849718747368A5000,5000 0 0,1 4755.282581475768,-1545.084971874737L0,0Z\" fill=\""+ config.colors[0] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M4755.282581475768,-1545.084971874737A5000,5000 0 0,1 4755.282581475768,1545.084971874737L0,0Z\" fill=\""+ config.colors[3] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M4755.282581475768,1545.084971874737A5000,5000 0 0,1 2938.9262614623663,4045.0849718747368L0,0Z\" fill=\""+ config.colors[1] +"\" fill-rule=\"evenodd\"/><path transform=\"translate(0, 2500)\" d=\"M2938.9262614623663,4045.0849718747368A5000,5000 0 0,1 3.061616997868383e-13,5000L0,0Z\" fill=\""+ config.colors[2] +"\""
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
//dom ready
function pageLoaded(){
  windowResized();
  drawBuckets(config.slots);
  window.addEventListener('resize', windowResized, true);
}
