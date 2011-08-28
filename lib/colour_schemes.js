var COLOUR_SCHEMES = {
	colour_schemes: {
		count: 6
		, colour_scheme1: [
		  'rgb(105,210,231)',
		  'rgb(167,219,216)',
		  'rgb(224,228,204)',
		  'rgb(243,134,48)',
		  'rgb(250,105,0)'
		]
		, colour_scheme2: [
		  'rgb(236,208,120)',
		  'rgb(217,91,67)',
		  'rgb(192,41,66)',
		  'rgb(84,36,55)',
		  'rgb(83,119,122)'
		]
		, colour_scheme3: [
		 'rgb(207,240,158)',
		 'rgb(168,219,168)',
		 'rgb(121,189,154)',
		 'rgb(59,134,134)',
		 'rgb(11,72,107)'
		]
		, colour_scheme4: [
		 'rgb(233,78,119)',
		 'rgb(244,234,213)',
		 'rgb(198,164,154)',
		 'rgb(198,229,217)',
		 'rgb(214,129,137)'
		]
		, colour_scheme5: [
		 'rgb(238,230,171)',
		 'rgb(197,188,142)',
		 'rgb(105,103,88)',
		 'rgb(69,72,75)',
		 'rgb(54,57,59)'
		]
		, colour_scheme6: [
 		 'rgb(173,192,180)',
		 'rgb(190,214,199)',
		 'rgb(138,126,102)',
		 'rgb(167,155,131)',
		 'rgb(187,178,161)'
		]
	}
}

ColourSchemes = function(){}

ColourSchemes.get = function(i) {
	return COLOUR_SCHEMES.colour_schemes['colour_scheme'+i];
}

ColourSchemes.count = function() {
	return COLOUR_SCHEMES.colour_schemes.count;
}

ColourSchemes.all = function() {
	return COLOUR_SCHEMES.colour_schemes;
}

exports.ColourSchemes = ColourSchemes;