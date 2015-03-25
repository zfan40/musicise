var Musicise = require('../index.js');
var musicise = new Musicise();
musicise.start();
musicise.on('newtempo',function(tempo){         //this detects a new stable tempo based on a period of time
    console.log('new tempo is ' + tempo);
});
setInterval(function(){console.log(musicise.getSteps());},1000);        //this returns the accumulated steps instantly
