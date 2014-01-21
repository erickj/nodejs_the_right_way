/**
 * A fake service class to test the net-watcher-json-client parses
 * messages correctly.
 */
'use strict';
const net = require('net');
const server = net.createServer(function(connection) {
  console.log('Subscriber connected');

  // send 1 chunk immmediately
  connection.write('{"type":"changed","file":"targ');

  // send the rest 1 second later
  let timer = setTimeout(function() {
    connection.write('et.txt","timestamp":1234567890123}' + '\n');
  }, 1000);

  // clear timer on connection end
  connection.on('end', function() {
    clearTimeout(timer);
    console.log('Subscriber disconnected');
  });
});


server.listen(2345, function() {
  console.log('Test server listenting for subscribers');
});
