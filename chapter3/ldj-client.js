/**
 * A client designed to be resilient against splits in message
 * boundaries. The 'LDJ' client, (line delimeted JSON).
 */
'use strict';
const events = require('events');
const util = require('util');

/**
 * @param {!Object} stream
 * @constructor
 */
var LDJClient = function(stream) {
  events.EventEmitter.call(this);

  this.buffer_ = '';

  let self = this;
  stream.on('data', function (data) {
    self.handleData_(data);
  });
};
util.inherits(LDJClient, events.EventEmitter);

/**
 * @param {string} data
 * @private
 */
LDJClient.prototype.handleData_ = function(data) {
  this.buffer_ += data;
  let boundary = this.buffer_.indexOf('\n');
  while (boundary != -1) {
    let input = this.buffer_.substr(0, boundary);
    this.buffer_ = this.buffer_.substr(boundary + 1);
    // emit a 'message' event
    this.emit('message', JSON.parse(input));
    boundary = this.buffer_.indexOf('\n');
  }
};

// expose the module
exports.LDJClient = LDJClient;
exports.connect = function(stream) {
  return new LDJClient(stream);
};
