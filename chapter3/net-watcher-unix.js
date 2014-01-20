/**
 * Watches a file taken from STDIN arguments and logs a message to
 * clients who connect over Unix socket /tmp/watcher.sock
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
  connection.write('Now watching ' + filename);

  let watcher = fs.watch(filename, function() {
    connection.write('File ' + filename + ' changed ' + Date.now());
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

var socket = '/tmp/wacher.sock';
server.listen(socket, function(err) {
  console.log('listenting for subscribers on Unix socket ' + socket);
});
