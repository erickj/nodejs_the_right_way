/**
 * Watches a file taken from STDIN arguments and logs a message to the
 * console when it changes.
 *
 * Usage:
 *     nodejs --harmony <path/to/watcher-argv.js> <file/to/watch>
 */
const fs = require('fs');
var filename = process.argv[2];

if (!filename) {
  throw Error('No file specified');
}

fs.watch(filename, function() {
  console.log('File ' + filename + ' changed');
});
console.log('Now watching ' + filename);
