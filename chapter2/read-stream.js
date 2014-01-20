/**
 * Reads data from a stream and listens to 'data' and 'error' events.
 *
 * Usage:
 *     node --harmony <path/to/read-stream.js> <file/to/read>
 */
const fs = require('fs');
const stream = fs.createReadStream(process.argv[2]);

stream.on('data', function(chunk) {
  process.stdout.write(chunk);
});

stream.on('close', function(chunk) {
  console.log(); // print trailing \n
});

stream.on('error', function(err) {
  process.stderr.write('Error: ' + err.message + '\n');
});
