'use strict';

angular.module('bobby')
  .controller('nav', ['$scope', '$rootScope', '$location', 'api', '$routeParams', function($scope, $rootScope, $location, api, $routeParams) {

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $rootScope.synthesis = [];
    $rootScope.synthesis.projectID = $routeParams.project;

    $scope.refresh = function() {
      api.getAllPages($routeParams.project).then(function(results) {
        $rootScope.data = results;
        $rootScope.dataUpdate = moment();

        // Compute some stats

        // Number of records
        $rootScope.synthesis.n_spec = $rootScope.data.length;

        // Count by species
        $rootScope.synthesis.c_sp = results.map(function(r) {
          return r.taxon.name
        }).reduce(function(sums, sp) {
          sums[sp] = (sums[sp] || 0) + 1;
          return sums;
        }, {});

        // number of species
        var count_sp = 0;
        for (var sp in $rootScope.synthesis.c_sp) {
          count_sp += 1;
        };

        $rootScope.synthesis.n_sp = count_sp;

        // Count by user
        $rootScope.synthesis.c_users = results.map(function(r) {
          return r.user_id
        }).reduce(function(sums, user) {
          sums[user] = (sums[user] || 0) + 1;
          return sums;
        }, {});

        // number of users
        var count_users = 0;
        for (var sp in $rootScope.synthesis.c_users) {
          count_users += 1;
        };

        $rootScope.synthesis.n_user = count_users;

        // time periode
        $rootScope.synthesis.timeline = results.map(function(t) {
          return t.created_at;
        });

      }, null, function(percentComplete) {
        $rootScope.progress = percentComplete;
      })
    };

  }]);
