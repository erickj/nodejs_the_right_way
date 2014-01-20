/**
 * Writes a file to the file system and prints a message.
 *
 * Usage:
 *     node --harmony <path/to/write-simple.js>
 */
const fs = require('fs');
fs.writeFile('data/target.txt', 'something worth saving', function(err) {
  if (err) {
    throw err;
  }

  console.log('File saved!');
});
