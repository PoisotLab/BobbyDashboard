// Load the required modules
var rp = require('request-promise')
var config = require('config')

// Web packages
var express = require('express')
var stylus = require('express-stylus')
var nib = require('nib')
var app = express()

// Load configuration variables
confEvent = config.get('event')
confApp = config.get('app')

// Setup and configure web app
app.set('view engine', 'pug')
app.locals.pretty = true
var publicDir = require('path').join(__dirname, '/', confApp.public)

app.use(stylus({
    src: publicDir,
    use: [nib()],
    import: ['nib']
}))

app.use(express.static(publicDir))

// Build URL for project observations
var projectObsURL = 'http://www.inaturalist.org/' + 'observations/project/' + confEvent.slug + '.json'

// Generic callbacks
function generic_error(err) {
    console.log(err)
}

app.get('/map', function (req, res) {
    res.render('map')
})

app.get('/obs', function (req, res) {
    console.log('getting request')
    rp(projectObsURL)
    .then(function (result) {
        var observations = JSON.parse(result)
        res.send(observations)
    })
    .catch(generic_error);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
