// Load the required modules
var express = require('express')
var stylus = require('express-stylus')
var nib = require('nib')
var join = require('path').join;
var publicDir = join(__dirname, '/public');

// init express app
var dashboard = express()

// setup static folders
dashboard.use('/bower_components', express.static(__dirname + '/bower_components'));
dashboard.use(express.static(publicDir));

// Setup static css/html generators (pug and stylus)
dashboard.set('view engine', 'pug')
dashboard.use(stylus({
    force: true,
    src: publicDir,
    use: [nib()],
    import: ['nib']
}))


// Manage route with ngRoutes
// Load head first
dashboard.get('/', function(req, res) {
    res.render('index');
});

// Load partial template
dashboard.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

// This route deals enables HTML5Mode by forwarding missing files to the index.html
dashboard.all('/*', function(req, res) {
  res.render('index');
});

dashboard.listen(3000, function () {
  console.log('Listening on port 3000!')
})
