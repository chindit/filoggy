# Filoggy

[https://github.com/chindit/filoggy](https://github.com/chindit/filoggy)

## SUMMARY

A simple logging library for Node.JS

## USAGE

Filoggy has 5 different levels of logging in a specific order:

```javascript
['fatal', 'error', 'warning', 'info', 'debug']
```
    
Each of these log levels has its own method on the logging instance. 

For example:

```javascript
logger.warning('Hello world!')
logger.error('Damn!')
logger.fatal('That\'s an error!')
logger.info('Oh, by the way, an info')
logger.debug('Dear developer, I\'m a debug log')
```
    
By default, a logger writes to STDOUT, but given a writable file path, it will log directly to a file.

If not file is provided or if file is not writable, `NOTICE` will be triggered in the console.

You can also provide some context as a second param.  This context can be whatever you want: string, numbers or objects.  Scalar variables will be converted to string and objects will be stringified as JSON.

Example:

```javascript
logger.error('Oh, no!  It failed!', {my: 'ym', object: 'tcejbo'})
```

### Instantiation:

```javascript
const logger = require('filoggy').createLogger(); // logs to STDOUT
const logger = require('filoggy').createLogger('development.log'); // logs to a file
```

### Ouput:

For example, this log:

```javascript
logger.error('Hello!')
```

Will produce following output:

```composer log
Tue May 01 2018 19:29:20 GMT+0200 (CEST) [ERROR] Hello! []
```

## LICENSE

AGPL v3