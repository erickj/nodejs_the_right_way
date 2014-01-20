/**
 * Reads a file from the file system and prints its contens.
 *
 * Usage:
 *     node --harmony <path/to/read-simple.js>
 */
const fs = require('fs');
fs.readFile('target.txt', function(err, data) {
  if (err) {
    throw err;
  }

  console.log(data.toString());
});
