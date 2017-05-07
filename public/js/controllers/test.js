'use strict';

angular.module('bobby')
    .controller('test', ['$scope', 'api', function($scope, api) {

      api.getAllPages().then(function(results){
        $scope.data = results;
      },null,function(percentComplete){
        $scope.progress = percentComplete;
        console.log($scope.progress);
      });

    }]);
