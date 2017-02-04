// Load the required modules
var rp = require('request-promise')
var config = require('config')

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

// Build URL for project observations
var projectObsURL = 'http://www.inaturalist.org/' + 'observations/project/' + confEvent.slug + '.json'

// Generic callbacks
function generic_error(err) {
    console.log(err)
}

dashboard.get('/map', function (req, res) {
    res.render('map')
})

dashboard.get('/obs', function (req, res) {
    console.log('Getting request to update the observations')
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
