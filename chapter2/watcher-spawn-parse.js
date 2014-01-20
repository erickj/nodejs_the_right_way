/**
 * Watches a file from STDIN and launches a child process when it
 * changes. On 'data' events, data is added to a buffer. On 'close'
 * event, the data buffer is parsed and printed.
 *
 * Usage:
 *     nodejs --harmony <path/to/watcher-spawn-parse.js> <path/to/watch>
 */
// strict mode allows use of let keyword below
"use strict";
const fs = require('fs');
const spawn = require('child_process').spawn;

var filename = process.argv[2];

if (!filename) {
  throw Error('No file specified');
}

fs.watch(filename, function() {
  // let is the harmony builtin for block scope declarations
  // http://wiki.ecmascript.org/doku.php?id=harmony:block_scoped_bindings
  /** @see http://nodejs.org/api/child_process.html#child_process_class_childprocess */
  let ls = spawn('ls', ['-lh', filename]);
  let output = '';
  // ls is an EventEmitter
  // http://nodejs.org/api/events.html#events_class_events_eventemitter
  ls.stdout.on('data', function(chunk) {
    output += chunk.toString();
  });

  ls.on('close', function() {
    let parts = output.split(/\s+/);
    console.dir([parts[0], parts[4], parts[8]]);
  });
});
console.log('Now watching ' + filename);
