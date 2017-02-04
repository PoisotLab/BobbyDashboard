// Load the required modules
var rp = require('request-promise')
var config = require('config')
var express = require('express')
var app = express()
app.set('view engine', 'pug')

// Load configuration variables
confEvent = config.get('event')
confINat = config.get('iNaturalist')

// Build URL for project observations
var projectObsURL = confINat.api + 'observations/project/' + confEvent.slug + '.json'

function generic_fetch_error (err) {
    console.log(err)
}

app.get('/', function (req, res) {
    rp(projectObsURL)
    .then(function (result) {
        var observations = JSON.parse(result)
        res.render('index', {o: observations})
    })
    .catch(generic_fetch_error);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
