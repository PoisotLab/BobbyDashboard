angular.module('bobby')
  .controller('applets', ['$scope', '$rootScope', function($scope,$rootScope) {
    $scope.options = {
      chart: {
        type: 'pieChart',
        donut: true,
        x: function(d) {
          return d.taxa;
        },
        y: function(d) {
          return d.count;
        },
        showLabels: true,
        pie: {
          startAngle: function(d) {
            return d.startAngle / 2 - Math.PI / 2
          },
          endAngle: function(d) {
            return d.endAngle / 2 - Math.PI / 2
          }
        },
        duration: 500,
        legend: {
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }
    };

    $rootScope.$watch('data', function(data) {

      $scope.data = []

      if (typeof data != 'undefined') {
        var taxons = data.map(function(d) {
          return d.iconic_taxon_name;
        }).reduce(function(sums, taxons) {
          sums[taxons] = (sums[taxons] || 0) + 1;
          return sums;
        }, {});
      };

      for (var taxa in taxons) {
        $scope.data.push({
          taxa: taxa,
          count: taxons[taxa]
        });
      };
    });
  }]);
