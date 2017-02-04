// Load the required modules
var request = require('request')
var config = require('config')

// Load configuration variables
confEvent = config.get('event')
confINat = config.get('iNaturalist')

// Build URL for project observations
var projectObsURL = confINat.api + 'observations/project/' + confEvent.slug + '.json'

// Callback function for project observations
function observation_callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        // read the response as JSON object
        var projectObservations = JSON.parse(body)

        // then we loop through the observations
        for(var i in projectObservations) {

            // extract the observation and print the latitude and longitude
            var singleObservation = projectObservations[i]
            console.log(singleObservation.latitude, singleObservation.longitude)
        }
    }
}

// Get the list of observations and test the callback
request(projectObsURL, observation_callback)

