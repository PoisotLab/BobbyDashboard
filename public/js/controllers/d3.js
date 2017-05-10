angular.module('bobby')
  .controller('donut', ['$scope', '$rootScope', function($scope, $rootScope) {

    colors = {
      Actinopterygii: "#d32f2f",
      Amphibia: "#c2185b",
      Aves: "#1976d2",
      Insecta: "#689f38",
      Mammalia: "#afb42b",
      Plantae: "#00796b",
      Reptilia: "#5d4037",
      Fungi: "#0097a7",
      Animalia: "#7b1fa2",
      Mollusca: "#ffa000",
      Chromista: "#0288d1"
    };


    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 350,
        margin: {
          top: 5,
          right: 5,
          bottom: -150,
          left: 5
        },
        donut: true,
        labelsOutside: true,
        x: function(d) {
          return d.taxa;
        },
        y: function(d) {
          return d.count;
        },
        showLabels: true,
        showLegend: true,
        legendPosition: 'right',
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
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
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
        console.log(taxa);
        $scope.data.push({
          taxa: taxa,
          count: taxons[taxa],
          color: colors[taxa]
        });
      };
    });
  }]);

angular.module('bobby')
  .controller('chart', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.options = {
           chart: {
               type: 'multiBarChart',
               height: 350,
               margin : {
                   top: 20,
                   right: 20,
                   bottom: 45,
                   left: 45
               },
               clipEdge: true,
               duration: 500,
               stacked: true,
               xAxis: {
                   axisLabel: 'Time (ms)',
                   showMaxMin: false,
                   tickFormat: function(d){
                       return d3.format(',f')(d);
                   }
               },
               yAxis: {
                   axisLabel: 'Y Axis',
                   axisLabelDistance: -20,
                   tickFormat: function(d){
                       return d3.format(',.1f')(d);
                   }
               }
           }
       };

       $scope.data = generateData();

       /* Random Data Generator (took from nvd3.org) */
       function generateData() {
           return stream_layers(3,50+Math.random()*50,.1).map(function(data, i) {
               return {
                   key: 'Stream' + i,
                   values: data
               };
           });
       }

       /* Inspired by Lee Byron's test data generator. */
       function stream_layers(n, m, o) {
           if (arguments.length < 3) o = 0;
           function bump(a) {
               var x = 1 / (.1 + Math.random()),
                   y = 2 * Math.random() - .5,
                   z = 10 / (.1 + Math.random());
               for (var i = 0; i < m; i++) {
                   var w = (i / m - y) * z;
                   a[i] += x * Math.exp(-w * w);
               }
           }
           return d3.range(n).map(function() {
               var a = [], i;
               for (i = 0; i < m; i++) a[i] = o + o * Math.random();
               for (i = 0; i < 5; i++) bump(a);
               return a.map(stream_index);
           });
       }

       /* Another layer generator using gamma distributions. */
       function stream_waves(n, m) {
           return d3.range(n).map(function(i) {
               return d3.range(m).map(function(j) {
                   var x = 20 * j / m - i / 3;
                   return 2 * x * Math.exp(-.5 * x);
               }).map(stream_index);
           });
       }

       function stream_index(d, i) {
           return {x: i, y: Math.max(0, d)};
       }

}]);
