/**
 * Client for net-watcher-service. Parses newline delimited JSON data
 * from the server and prints resulsts to STDOUT.
 *
 * The purpose of the client is that it purposefully exposes a flaw in
 * the message protocol, assuming all message boundaries line up
 * exactly with data boundaries on \n, and will be encapsulated in a
 * single 'data' callback.
 *
 * Usage:
 *     node --harmony <path/to/net-watcher-json-client.js>
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
