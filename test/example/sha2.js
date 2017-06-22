'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('assert');
var Thread = require('./../../index.js');
const Promise = require('bluebird');
const co = Promise.coroutine;

var thread = new Thread();
thread.set_encode('base64');

fs.readFile('../thread.js', function(err, data) {
  co(function*(){
    var r = yield thread.sha2({data, type: 256});
    console.log(r);
  })();
});
