/**
 * Watches a file from STDIN and logs a message to console when it
 * changes.
 *
 * Usage:
 *     nodejs --harmony <path/to/watcher.js>
 */
// const is a harmony builtin for declaring constants
// http://wiki.ecmascript.org/doku.php?id=harmony:const
const fs = require('fs');
fs.watch('data/target.txt', function() {
  console.log('File \'target.txt\' changed.');
});
