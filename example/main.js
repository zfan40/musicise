    var Jb = require('./index.js');
    jb = new Jb();
    jb.start();
    jb.on('newtempo',function(passin){
    	  console.log('new tempo is '+passin);
    });
    setInterval(function(){console.log(jb.getSteps());},1000);