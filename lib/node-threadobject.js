"use strict";

var rcib = require('../build/Release/node-threadobject.node');
var assert = require('assert');
var THREAD = rcib.THREAD;

process.on('exit', () => {
  rcib.terminate();
});

var Thread =  function () {
  var maintain = function(){
    return arguments.length;
  }

  var o = {
    close() {
      thread_.close();
    }
    ,isRunning() {
      return thread_.isRunning();
    }
    ,delayByMil(mils, cb) {
      return thread_.delayByMil_i(mils, function(err){
        setImmediate(() => cb(err));
      });
    }
    ,delayBySec(secs, cb) {
       return thread_.delayBySec_i(secs, function(err){
         setImmediate(() => cb(err));
      });
    }
    ,delayByMin(mins, cb) {
       return thread_.delayByMin_i(mins, function(err){
         setImmediate(() => cb(err));
      });
    }
    , delayByHour(hours, cb) {
        return thread_.delayByHour_i(hours, function(err){
          setImmediate(() => cb(err));
      });
    }
    , initPrint(path, cb) {
        return thread_.initPrint_i(path, function(err, data){
          setImmediate(() => cb(err, data));
      });
    }
    ,printLog(cont, cb) {
      return thread_.printLog_i(cont, function(err, data){
        setImmediate(() => cb(err, data));
      });
    }
    ,bytes(cb) {
      return thread_.bytes_i(function(err, data){
        setImmediate(() => cb(err, data));
      });
    }
    ,closeLog() {
      thread_.closeLog();
    }
    ,set_delay(delta) {
      delta = delta - 0;
      if(delta > 0)
        thread_.bysec = delta;
    }
    ,sha2(parm, cb) {
      var type = parm.type,
          data = parm.data;
      if(256 == type || 384 == type || 512 == type){
        type = type - 0;
        return thread_.sha2(type, data, function(err, rets){
          assert.equal(maintain(parm.data), 1);
          setImmediate(() => cb(err, rets));
        });
      }
      setImmediate(() => cb(new Error('type should be one of {256,384,512}')) );
      return false;
    }
    ,hmac(parm, cb) {
      var type = parm.type, 
          key = parm.key, 
          data = parm.data;
      if(256 == type || 384 == type || 512 == type) {
        type = type - 0;
        return thread_.hmac(type, key, data, function(err, rets){
          assert.equal(maintain(parm.key, parm.data), 2);
          setImmediate(() => cb(err, rets));
        });
      }
      setImmediate(() => cb(new Error('type should be one of {256,384,512}')));
      return false;
    }
    ,set_encode(str){
      if(str == 'utf8'){
        thread_.encoding = 1;
      }else if(str == 'hex'){
        thread_.encoding = 2;
      }else if(str == 'base64'){
        thread_.encoding = 3;
      }else if(str == 'buffer'){
        thread_.encoding = 4;
      }else thread_.encoding = 0;
    }
    ,numOfTasks(){
      return thread_.quen();
    }
    ,makeKeypair(seed, type){
      if(typeof seed === 'string') seed = new Buffer(seed, 'hex');
      return thread_.makeKeypair(seed);
    }
    ,Sign(message, key, cb){
      if(typeof key === 'string') key = new Buffer(key, 'hex');
      return thread_.sign(message, key, function(err, rets){
        assert.equal(maintain(message, key), 2);
        setImmediate(() => cb(err, rets));
      });
    }
    ,Verify(message, signature, pubkey, cb){
      if(typeof signature === 'string') signature = new Buffer(signature, 'hex');
      if(typeof pubkey === 'string') pubkey = new Buffer(pubkey, 'hex');
      return thread_.verify(message, signature, pubkey, function(err, rets){
        assert.equal(maintain(message, signature, pubkey), 3);
        setImmediate(() => cb(err, rets));
      });
    },
    runCode(code, param, cb) {
      return thread_.runCode(code, param, function(err, ret){
        setImmediate(() => cb(err, ret));
      });
    }
  };

  var thread_ =  new THREAD();
  return o;
}

module.exports = Thread;
