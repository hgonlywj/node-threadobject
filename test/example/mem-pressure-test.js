'use strict';

const fs = require('fs');
const Thread = require('./../../index.js');
const Promise = require('bluebird');
const co = Promise.coroutine;

const thread = new Thread();
thread.set_encode('base64');

var fData = null;
function callback(err, data) {
  if(err) return console.error(err);
  console.log(data);
  setImmediate(function(){
    thread.sha2({data: fData, type: 256}, callback);
  });
}

fs.readFile('./mem-pressure-test', function(err, data){
  fData = data
  thread.sha2({data: fData, type: 256}, callback);
});
