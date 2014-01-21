/**
 * Client for net-watcher-service
 */
'use strict';
const net = require('net');
const client = net.connect({
  port: 2345
});

client.on('data', function(data) {
  let message = JSON.parse(data);
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
