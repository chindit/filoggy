# Filoggy

[https://github.com/chindit/filoggy](https://github.com/chindit/filoggy)

## SUMMARY

A simple logging library for Node.JS

## USAGE

A logger has 5 different levels of logging in a specific order:

    'fatal', 'error', 'warn', 'info', 'debug'
    
Each of these log levels has its own method on the logging instance. You can set the maximum log level on a logger at runtime. 

By default, a logger writes to STDOUT, but given a writeable file path, it will log directly to a file.

### Instantiation:

    // node/common.js style 
    var logger = require('./logger').createLogger(); // logs to STDOUT
    var logger = require('./logger').createLogger('development.log'); // logs to a file

### Logging:

Any of the logging methods take `n` arguments, which are each joined by ' ' (similar to `console.log()`). If an argument is not a string, it is stringified as JSON
    

## LICENSE

AGPL v3