var request = require('request')
var config = require('config')

// Load configuration
confEvent = config.get('event')
confINat = config.get('iNaturalist')

// URL for project observations
var projectObsURL = confINat.api + 'observations/project/' + confEvent.slug + '.json'

// Callback function for project observations
function observation_callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var projectObservations = JSON.parse(body)
        for(var i in projectObservations) {
            var singleObservation = projectObservations[i]
            console.log(singleObservation.latitude, singleObservation.longitude)
        }
    }
}

// Get the list of observations
request(projectObsURL, observation_callback)

