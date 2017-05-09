'use strict';

// Init and set dependancies
var bobby = angular.module('bobby', ['ngRoute','ui-leaflet','nvd3']);
// Config and create routes
bobby.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);

    $routeProvider.
    when("/", {
        templateUrl: 'partials/home',
        controller: 'applets'
    }).
    when("/taxon", {
        templateUrl: 'partials/taxon'
    }).
    when("/map", {
        templateUrl: 'partials/map',
        controller: 'map'
    });


}]);
