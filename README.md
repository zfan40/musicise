musicise
========

Ultimate goal: a library building bridge between motions to sounds

!important: based on sensor feature, this works better on mobile, and of course it makes little sense to dance carrying a laptop or a PC
## Installation
	npm install musicise

## Usage

	var musicise = require('musicise');
	musicise.start();
	musicise.on('newtempo',function(tempo){			//this detects a new stable tempo based on a period of time
		console.log('new tempo is ' + tempo);
    });
    setInterval(function(){console.log(musicise.getSteps());},1000);		//this returns the accumulated steps instantly
    musicise.stop();


## Tests
	Currently no test, it is a very basic and subjective computation. The algorithms will be enriched in the future.
	But feel free to test physically, sorry I couldn't provide IRB approval or stipend for ya.

## Release History
	* 0.1.0 Initial release, start,stop,getSteps, getTempo, event listening on('newtempo')