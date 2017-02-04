var request = require('request');
var config = require('config');

// Load configuration
eventConfig = config.get('event');

console.log(eventConfig.slug);
