'use strict';

// Init and set dependancies
var bobby = angular.module('bobby', ['ngRoute']);
// Config and create routes
bobby.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);

    $routeProvider.
    when("/", {
        templateUrl: 'partials/home',
        controller: 'test'
    }).
    when("/taxon", {
        templateUrl: 'partials/taxon'
    }).
    when("/map", {
        templateUrl: 'partials/map'
    });


}]);
