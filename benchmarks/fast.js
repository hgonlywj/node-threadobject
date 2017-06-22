'use strict';

const fs = require('fs');
const Thread = require('../index.js');
const Promise = require('bluebird');
const co = Promise.coroutine;

const thread1 = new Thread();
const thread2 = new Thread();

thread1.set_encode('base64');
thread2.set_encode('base64');

const key = '_random_key_';

fs.readFile('./data', function(err, data){
  co(function*(){
    const loop = 200;
    var begin = new Date();
    for(var i = 0; i < loop; ++i){
      var r = yield Promise.all([
        thread1.hmac({data, type: 384, key}),
        thread2.hmac({data, type: 512, key})
      ]);
      //console.log(r);
    }
    console.log(new Date() - begin);
  })().catch(function(err){
    console.error(err);
  });
});
