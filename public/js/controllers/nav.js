'use strict';

angular.module('bobby')
    .controller('nav', ['$scope','$location', function($scope,$location) {

      $scope.isActive = function(viewLocation) {
          return viewLocation === $location.path();
      };

    }]);
