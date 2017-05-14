'use strict';

// Init and set dependancies
var bobby = angular.module('bobby', ['ngRoute','ui-leaflet','nvd3','angularMoment','angular-underscore']);
// Config and create routes
bobby.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);

    $routeProvider.
    when("/bobby/:project", {
        templateUrl: 'partials/home',
        controller: 'nav'
    }).
    when("/bobby/:project/taxon", {
        templateUrl: 'partials/taxon',
    }).
    when("/bobby/:project/map", {
        templateUrl: 'partials/map',
        controller: 'map'
    }).
    otherwise({redirectTo:'/'});


}]);
