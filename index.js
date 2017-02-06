// Load the required modules
var rp = require('request-promise-cache')
var config = require('config')
var fs = require('fs-then')

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

// Generic callbacks
function generic_error(err) {
    console.log(err)
}

dashboard.get('/', function (req, res) {
    res.render('home', confEvent)
})

dashboard.get('/map', function (req, res) {
    res.render('map', confEvent)
})

dashboard.get('/taxon', function (req, res) {
    res.render('taxon', confEvent)
})

dashboard.get('/obs/:page', function (req, res) {
    // Build URL for project observations
    var projectObsURL = 'http://www.inaturalist.org/' + 'observations/project/' + confEvent.slug + '.json?page=' + req.params.page
    console.log('Getting request to update the observations')
    console.log(projectObsURL)
    rp({
        url: projectObsURL,
        cacheKey: projectObsURL,
        cacheTTL: Number(confApp.cache)*60*1000,
        cacheLimit: 10
    })
    .then(function (returned) {
        var observations = JSON.parse(returned.body)
        res.send(observations)
    })
    .catch(generic_error);
})

dashboard.listen(3000, function () {
  console.log('Listening on port 3000!')
})
