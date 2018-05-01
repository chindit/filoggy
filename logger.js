/**
 * Name: filoggy
 * Version: 1.0.0
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
  // Log levels
  static levels = ['fatal', 'error', 'warn', 'info', 'debug'];

  constructor (outputFile) {
    // default write is STDOUT
    this.write = util.print;
    this.defaultLogLevel = 'debug';

    if (outputFile === undefined) {
      this.write('[INFO] No output file provided.  Logging we be done on STDOUT only' + "\n");
    } else {
      // Write to a file
      let logFilePath = path.normalize(outputFile);
      this.stream = fs.createWriteStream(logFilePath, {flags: 'a', encoding: 'utf8', mode: 666});
      this.stream.write("\n");

      this.write = function (text) {
        this.stream.write(text);
      };
    }
  }

  setDefaultLogLevel(level) {
    if (Filoggy.levels.indexOf(level) === -1) {
      this.write('[NOTICE] Provided level is not a valid log level');
      return false;
    }
    this.defaultLogLevel = level;
    return true;
  }

  getDefaultLogLevel() {
    return this.defaultLogLevel;
  }

  debug(message, context) {
    this.log('debug', message, context);
  }

  info(message, context) {
    this.log('info', message, context);
  }

  warning(message, context) {
    this.log('warn', message, context);
  }

  error(message, context) {
    this.log('error', message, context);
  }

  fatal(message, context) {
    this.log('fatal', message, context);
  }

  log(level, message, context) {
    let internalLevel = level;
    // Checking level
    if (Filoggy.levels.indexOf(internalLevel) === -1) {
      this.write('[NOTICE] Invalid level provided.  Using default logging level');
      internalLevel = this.defaultLogLevel;
    }

    // Checking message
    if (message === undefined) {
      this.write('[ERROR] No message provided!');
      return false;
    }
    if (typeof message === 'object') {
      message = JSON.parse(message);
    } else {
      message = message.toString();
    }

    if (context !== undefined) {
      if (typeof context === 'object') {
        context = JSON.parse(context);
      } else {
        context = context.toString();
      }
    } else {
      context = '[]';
    }

    const logLine = Filoggy.formatLog(internalLevel, message, context)
    this.write(logLine);
  }

  static formatLog(level, message, context) {
    return [new Date(), ('[' + level + ']'), message, context].join(' ');
  }
}

export default Filoggy;

exports.createLogger = function(logfile) {
  return new Filoggy(logfile);
}
