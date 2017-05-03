'use strict';
var path = require('path');
var assert = require('assert');
var Thread = require('../index.js');

var thread = new Thread();

var codeMain = `
function main(v){
	v = JSON.parse(v);
  return v.a + v.b;
}
`;

var codeMain_throw = `
function main(v){
  throw new Error('');
}
`;

var codeNoMain = `
function _main(v){
	v = JSON.parse(v);
  return v.a + v.b;
}
`;

describe('exports', function () {
  describe('.Thread', function () {
    it('test runCode, js codeMain', function (done) {
      thread.runCode(codeMain, JSON.stringify({
        a: 5,
        b: 100
      }), function(err, res){
        assert.ifError(err);
        assert.equal(res, 105);
        done();
      });
    });

    it('test runCode, js codeMain_throw', function (done) {
      thread.runCode(codeMain_throw, JSON.stringify({
        a: 5,
        b: 100
      }), function(err, res){
        assert.ok(err);
        done();
      });
    });

    it('test runCode, js codeNoMain', function (done) {
      thread.runCode(codeNoMain, 
      JSON.stringify({
        a: 5,
        b: 100
      }),
      function(err){
        assert.ok(err);
        done();
      });
    });
  });
});