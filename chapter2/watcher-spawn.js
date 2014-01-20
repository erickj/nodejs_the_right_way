/**
 * Watches a file from STDIN and launches a child process when it
 * changes.
 *
 * Usage:
 *     nodejs --harmony <path/to/watcher-spawn.js> <path/to/watch>
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
  // The call to {@code #pipe} creates a Stream object.
  // http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
  ls.stdout.pipe(process.stdout);
});
console.log('Now watching ' + filename);
