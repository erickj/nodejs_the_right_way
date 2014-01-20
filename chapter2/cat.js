#!/usr/bin/env node
/**
 * Reads from the stream and pipes data to STDOUT.
 */
require('fs').
  createReadStream(process.argv[2]).
  pipe(process.stdout);
