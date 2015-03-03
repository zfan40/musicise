musicise
========

Ultimate goal: a library building bridge between motions to sounds

!important: this can only be used on mobile, and of course it makes little sense to dance carrying a laptop or a PC
## Installation
	npm install musicise --save

## Usage

	var musicise = require('musicise');
	musicise.start();
	musicise.on(newtempo)
	musicise.on('newtempo',function(newtempo){
		console.log('new tempo is ' + newtempo);
    });
    setInterval(function(){console.log(jb.getSteps());},1000);
    musicise.stop();


## Tests
	Currently no test, it is a very basic and subjective computation. The algorithms will be enriched in the future.
	But feel free to test physically, sorry I couldn't provide IRB approval or stipend for ya.

## Release History
	* 0.1.0 Initial release, start,stop,getSteps, getTempo, event listening on('newtempo')