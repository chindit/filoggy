/**
 * Name: filoggy
 * Version: 1.0.3
 * Site: https://github.com/chindit/filoggy
 * Licence: AGPL v3
 * Author: David Lumaye
 */
/**
 * Copyright (c) 2018 David Lumaye

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */


const path = require('path'),
  util = require('util'),
  fs = require('fs');

class Filoggy {

  constructor (outputFile) {
    this.levels = ['fatal', 'error', 'warn', 'info', 'debug'];
    // default write is STDOUT
    this.write = util.print;
    this.defaultLogLevel = 'warning';

    if (outputFile === undefined) {
      this.write('[INFO] No output file provided.  Logging we be done on STDOUT only' + '\n');
    } else {
      // Write to a file
      let logFilePath = path.normalize(outputFile);

      fs.access(logFilePath, fs.constants.W_OK, function(err) {
        if (err) {
          console.error('Your destination path is not writable');
          process.exit(1);
        }
      });

      this.stream = fs.createWriteStream(logFilePath, {flags: 'a', encoding: 'utf8', mode: 666}).on('error', function (err) {
        console.error('Unable to write log.');
        console.error(err);
      });
      this.stream.write('\n');

      this.write = function (text) {
        this.stream.write(text);
      }
    }
  }

  static formatLog (level, message, context) {
    return [new Date(), ('[' + level.toUpperCase() + ']'), message, context].join(' ');
  }

  setDefaultLogLevel (level) {
    if (this.levels.indexOf(level) === -1) {
      this.write('[NOTICE] Provided level is not a valid log level');
      return false;
    }
    this.defaultLogLevel = level;
    return true;
  }

  getDefaultLogLevel () {
    return this.defaultLogLevel;
  }

  debug (message, context) {
    this.log('debug', message, context);
  }

  info (message, context) {
    this.log('info', message, context);
  }

  warning (message, context) {
    this.log('warn', message, context);
  }

  error (message, context) {
    this.log('error', message, context);
  }

  fatal (message, context) {
    this.log('fatal', message, context);
  }

  log (level, message, context) {
    let internalLevel = level;
    // Checking level
    if (this.levels.indexOf(internalLevel) === -1) {
      this.write('[NOTICE] Invalid level provided.  Using default logging level');
      internalLevel = this.defaultLogLevel;
    }

    // Checking message
    if (message === undefined) {
      this.write('[ERROR] No message provided!');
      return false;
    }
    if (typeof message === 'object') {
      message = JSON.stringify(message);
    } else {
      message = message.toString();
    }

    if (context !== undefined) {
      if (typeof context === 'object') {
        context = JSON.stringify(context);
      } else {
        context = context.toString();
      }
    } else {
      context = '[]';
    }

    const logLine = Filoggy.formatLog(internalLevel, message, context);
    this.write(logLine);
  }
}

module.exports = {
  class: Filoggy,
  createLogger: function (logFile) {
    return new Filoggy(logFile);
  }
};
