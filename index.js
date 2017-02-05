// Load the required modules
var rp = require('request-promise')
var config = require('config')
var fs = require('fs')

// Web packages
var express = require('express')
var stylus = require('express-stylus')
var nib = require('nib')
var dashboard = express()

// Load configuration variables
confEvent = config.get('event')
confApp = config.get('app')

// Setup and configure web dashboard
dashboard.set('view engine', 'pug')
dashboard.locals.pretty = true
var publicDir = require('path').join(__dirname, '/', confApp.public)

dashboard.use(stylus({
    src: publicDir,
    use: [nib()],
    import: ['nib']
}))

dashboard.use(express.static(publicDir))

// Caching the results, updated every five minutes or unless called explicitely
function readEventPage(slug, per_page, page) {
    console.log("Reading event stream")
    // Build the URL
    var url = 'http://www.inaturalist.org/' + 
        'observations/project/' + slug + '.json' +
        '?page=' + page + '&per_page=' + per_page
    // Get the URL
    rp(url)
    .then(function(result) {
        console.log("Got results")
        var obs = JSON.parse(result)
        res.send(obs)

    })
    .catch(generic_error)
}


// Generic callbacks
function generic_error(err) {
    console.log(err)
}

dashboard.get('/map', function (req, res) {
    res.render('map', confEvent)
})

dashboard.get('/obs/:page', function (req, res) {
    // Build URL for project observations
    var projectObsURL = 'http://www.inaturalist.org/' + 'observations/project/' + confEvent.slug + '.json?page=' + req.params.page
    console.log('Getting request to update the observations')
    console.log(projectObsURL)
    rp(projectObsURL)
    .then(function (result) {
        var observations = JSON.parse(result)
        res.send(observations)
    })
    .catch(generic_error);
})

dashboard.listen(3000, function () {
  console.log('Listening on port 3000!')
})
