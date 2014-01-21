/**
 * Client to net-watcher-service-json resilient to message boundary
 * splits not on data boundaries. Uses the LDJ client for event
 * parsing.
 */
'use strict';
const net = require('net');
const ldj = require('./ldj-client.js');

var netClient = net.connect({
  port: 2345
});
var ldjClient = ldj.connect(netClient);

// Uses the 'message' event as a higher abstraction from the 'data'
// event for handling messages.
ldjClient.on('message', function(message) {
  switch (message.type) {
    case 'watching':
      console.log('Now watching: ' + message.file);
      break;
    case 'changed':
      console.log('File ' + message.file + ' changed at ' + new Date(message.timestamp));
      break;
    default:
      throw Error('Unknown message type ' + message.type);
  }
});
