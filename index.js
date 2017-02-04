var request = require('request');
var config = require('config');

// Load configuration
confEvent = config.get('event');
confINat = config.get('iNaturalist');

// URL for project observations
var projectObsURL = confINat.api + 'observations/project/' + confEvent.slug + '.json';

// Callback function for project observations
function observation_callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var project_observations = JSON.parse(body)
        console.log(project_observations)
    }
}

// Get the list of observations
request(projectObsURL, observation_callback)

