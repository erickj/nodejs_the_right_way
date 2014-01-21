/**
 * Watches a file taken from STDIN arguments and sends a JSON message to
 * clients who connect over TCP to port 2345.
 *
 * Usage:
 *     node --harmony <path/to/net-watcher.js> <file/to/watch>
 */
"use strict";
const fs = require('fs');
const net = require('net');

var filename = process.argv[2];

var server = net.createServer(function(connection) {
  console.log('client connected.')
  connection.write(JSON.stringify({
    type: 'watching',
    file: filename
  }));

  let watcher = fs.watch(filename, function() {
    connection.write(JSON.stringify({
      type: 'changed',
      file: filename,
      timestampe: Date.now()
    }));
  });

  connection.on('close', function() {
    console.log('client closed connection.');
    watcher.close();
  });
});


if (!filename) {
  throw Error('No file specified');
}

// http://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback
server.on('error', function (e) {
  if (e.code == 'EADDRINUSE') {
    console.log('Address in use');
  }
});

server.listen(2345, function(err) {
  console.log('listenting for subscribers');
});
