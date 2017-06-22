'use strict';

var rcib = require('../build/Release/node-threadobject.node');
var assert = require('assert');
var Promise = require('bluebird');
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
    },
    isRunning() {
      return thread_.isRunning();
    },
    delayByMil(mils, cb) {
      return thread_.delayByMil(mils, function(err){
        setImmediate(() => cb(err));
      });
    },
    delayBySec(secs, cb) {
       return thread_.delayBySec(secs, function(err){
         setImmediate(() => cb(err));
      });
    },
    delayByMin(mins, cb) {
       return thread_.delayByMin(mins, function(err){
         setImmediate(() => cb(err));
      });
    },
    delayByHour(hours, cb) {
        return thread_.delayByHour(hours, function(err){
          setImmediate(() => cb(err));
      });
    },
    initPrint(path, cb) {
        return thread_.initPrint(path, function(err, data){
          setImmediate(() => cb(err, data));
      });
    },
    printLog(cont, cb) {
      return thread_.printLog(cont, function(err, data){
        setImmediate(() => cb(err, data));
      });
    },
    bytes(cb) {
      return thread_.bytes(function(err, data){
        setImmediate(() => cb(err, data));
      });
    },
    closeLog() {
      thread_.closeLog();
    },
    set_delay(delta) {
      delta = delta - 0;
      if(delta > 0)
        thread_.bysec = delta;
    },
    sha2(param, cb) {
      var type = param.type,
          data = param.data;
      if(256 == type || 384 == type || 512 == type){
        type = type - 0;
        return thread_.sha2(type, data, function(err, rets){
          assert.equal(maintain(param.data), 1);
          setImmediate(() => cb(err, rets));
        });
      }
      setImmediate(() => cb(new Error('type should be one of {256,384,512}')) );
      return false;
    },
    hmac(param, cb) {
      var type = param.type, 
          key = param.key, 
          data = param.data;
      if((256 == type || 384 == type || 512 == type)) {
        type = type - 0;
        return thread_.hmac(type, key, data, function(err, rets){
          assert.equal(maintain(param.key, param.data), 2);
          setImmediate(() => cb(err, rets));
        });
      }
      setImmediate(() => cb(new Error('type should be one of {256,384,512}')));
      return false;
    },
    set_encode(str){
      if(str == 'utf8'){
        thread_.encoding = 1;
      }else if(str == 'hex'){
        thread_.encoding = 2;
      }else if(str == 'base64'){
        thread_.encoding = 3;
      }else if(str == 'buffer'){
        thread_.encoding = 4;
      }else thread_.encoding = 0;
    },
    numOfTasks(){
      return thread_.queNum();
    },
    makeKeypair(seed, type){
      if(typeof seed === 'string') seed = new Buffer(seed, 'hex');
      return thread_.makeKeypair(seed);
    },
    sign(message, key, cb){
      if(typeof key === 'string') key = new Buffer(key, 'hex');
      return thread_.sign(message, key, function(err, rets){
        assert.equal(maintain(message, key), 2);
        setImmediate(() => cb(err, rets));
      });
    },
    verify(message, signature, pubkey, cb){
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
  o = Promise.promisifyAll(o, {suffix: 'Async'});

  return {
    close() {
      o.close();
    },
    isRunning() {
      return o.isRunning();
    },
    delayByMil(mils, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.delayByMil(mils, cb);
      }else{
        return o.delayByMilAsync(mils);
      }
    },
    delayBySec(secs, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.delayBySec(secs, cb);
      }else{
        return o.delayBySecAsync(secs);
      }
    },
    delayByMin(mins, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.delayByMin(mins, cb);
      }else{
        return o.delayByMinAsync(mins);
      }
    },
    delayByHour(hours, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.delayByHour(hours, cb);
      }else{
        return o.delayByHourAsync(hours);
      }
    },
    initPrint(path, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.initPrint(path, cb);
      }else{
        return o.initPrintAsync(path);
      }
    },
    printLog(cont, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.printLog(cont, cb);
      }else{
        return o.printLogAsync(cont);
      }
    },
    bytes(cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.bytes(cb);
      }else{
        return o.bytesAsync();
      }
    },
    closeLog() {
      o.closeLog();
    },
    set_delay(delta) {
      o.set_delay(delta);
    },
    sha2(param, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.sha2(param, cb);
      }else{
        return o.sha2Async(param);
      }
    },
    hmac(param, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.hmac(param, cb);
      }else{
        return o.hmacAsync(param);
      }
    },
    set_encode(str){
      o.set_encode(str);
    },
    numOfTasks(){
      return o.numOfTasks();
    },
    makeKeypair(seed, type){
      return o.makeKeypair(seed, type);
    },
    sign(message, key, cb){
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.sign(message, key, cb);
      }else{
        return o.signAsync(message, key);
      }
    },
    verify(message, signature, pubkey, cb){
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.verify(message, signature, pubkey, cb);
      }else{
        return o.verifyAsync(message, signature, pubkey);
      }
    },
    runCode(code, param, cb) {
      if(cb && typeof cb === 'function' && cb.constructor.name === 'Function'){
        return o.runCode(code, param, cb);
      }else{
        return o.runCodeAsync(code, param);
      }
    }
  };
}

module.exports = Thread;