
    function getAvgTempoInIndex(buf,threshold) {
        //return an average length of one step in index(has no unit here ,since we need to know the device motion sample rate)
        var flag = 0;
        var index_record = [];
        var length = buf.length;
        for (var i = 0; i <= length - 1; i++) {
            if (flag == 0 && buf[i]<threshold) {
                flag = 1;
            }
            else if (flag == 1 && buf[i]>threshold) {
                flag = 0;
                index_record.push(i);
            }

        }
        if (index_record.length == 0) return 0;
        var result = (index_record[index_record.length-1]-index_record[0])/(index_record.length-1);//no need include all indexs, just get first and last and then avg
        return result;
    }

    function threeNumAreClose(a,b,c,tempo_thres) {
        // console.log(Math.abs(a-b)) ;
        return (Math.abs(a-b)<=tempo_thres && Math.abs(a-c)<=tempo_thres && Math.abs(c-b)<=tempo_thres);
    }
//dependency
//http://www.hacksparrow.com/node-js-eventemitter-tutorial.html
    var util = require('util');
    var EventEmitter = require('events').EventEmitter;

//tempo related
    var buffer = []; //create length of 50 buffer
    var BUF_LEN = 80;
    for (var i = 0; i<=BUF_LEN - 1; i++) {
      buffer.push(0);
    }
    var WINDOW_SIZE = BUF_LEN/2;
    var count = 0;
    var tempos = [0,0,0];
    var currentTempo = 0;
    var playState = 0;
//each step related
    var step_counter = 0;
    var string = '';
    var ramp_flag = 1;
    var Step = function() {
        var self = this;
        this.start = function(){
            var self = this;
            ramp_flag = 1;
            window.addEventListener('devicemotion', function(event) {
                      var x = event.accelerationIncludingGravity.x;
                      var y = event.accelerationIncludingGravity.y;
                      var z = event.accelerationIncludingGravity.z;
                      var sensor_value = x*x + y*y + z*z;
                      if (sensor_value >=140 && ramp_flag == 1) {
                          ramp_flag = 0;
                          step_counter += 1;
                      }
                      else if (sensor_value <140 && ramp_flag == 0) {
                          ramp_flag =1;
                      }
                        
                      buffer.shift();
                      buffer.push(sensor_value);
                      if (count==WINDOW_SIZE) {//at this time, process this frame of data
                          var tempo = 60/(getAvgTempoInIndex(buffer,140)*event.interval);
                          tempos.shift();
                          tempos.push(tempo);
                          console.log('tempo in this buffer is: ' + tempo);
                          if (threeNumAreClose(tempos[0],tempos[1],tempos[2],4)) {//only when stable, change state
                              if (Math.abs(tempos[2]-currentTempo)>5) {//new stable tempo not equal to current playing tempo
                                  playState = 1;
                                  currentTempo = tempos[2];
                                  self.emit('newtempo',currentTempo);//From Doc: emitter.emit(event[, arg1][, arg2][, ...])#
                              }
                          }
                          count = 0;
                      }
                      count++;  
            });  
        };
        this.stop = function(){
            removeEventListener('devicemotion');
            step_counter = 0;
        };
        this.getSteps = function(){
          return step_counter;
        };
        this.getTempo = function(){
            return currentTempo;
        };
    };

    util.inherits(Step, EventEmitter);
    // Step.prototype = Object.create(require('events').EventEmitter.prototype);
    //Step.prototype.__proto__ = EventEmitter.prototype;
    module.exports = Step;
