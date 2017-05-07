'use strict';

angular.module('bobby')
    .controller('nav', ['$scope','$rootScope','$location','api', function($scope,$rootScope,$location,api) {

      $scope.isActive = function(viewLocation) {
          return viewLocation === $location.path();
      };

      $scope.refresh = function() {
        api.getAllPages().then(function(results) {
          $rootScope.data = results;
          console.log($rootScope.data);
        }, null, function(percentComplete) {
          $rootScope.progress = percentComplete;
          console.log($rootScope.progress);
        })
      };

    }]);
