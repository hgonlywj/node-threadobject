'use strict';
var path = require('path');
var fs = require('fs');
var assert = require('assert');
var Thread = require('./../../index.js');
var crypto = require('crypto');
var thread = new Thread();
var key = '_random_key_';

fs.readFile('../thread.js', function(err, data) {
  thread.hmac({data: data, type: 512, key: key}, function(err, data){
    if(err) return console.error(err);
    console.log(data);
  });
  var hmac = crypto.createHmac('sha512', key);
  hmac.update(data);
  console.log(hmac.digest('hex'));
});
