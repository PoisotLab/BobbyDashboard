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
        height: 400,
        margin: {
          top: 5,
          right: 5,
          bottom: 5,
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
        legendPosition: "right",
        showLabels: true,
        showLegend: true,
        duration: 500,
        legend: {
          margin: {
            top: 50,
            right: 5,
            bottom: 15,
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
                  type: 'stackedAreaChart',
                  height: 400,
                  margin : {
                      top: 40,
                      right: 10,
                      bottom: 40,
                      left: 60
                  },
                  x: function(d){return d.x;},
                  y: function(d){return d.y;},
                  useVoronoi: false,
                  clipEdge: true,
                  duration: 100,
                  useInteractiveGuideline: true,
                  xAxis: {
                      axisLabel: 'Days',
                      showMaxMin: false,
                      tickFormat: function(d){
                          return d3.format(',f')(d);
                      }
                  },
                  yAxis: {
                      axisLabel: 'Number of species',
                      tickFormat: function(d){
                          return d3.format(',f')(d);
                      }
                  },
                  zoom: {
                      enabled: true,
                      scaleExtent: [1, 10],
                      useFixedDomain: false,
                      useNiceScale: false,
                      horizontalOff: false,
                      verticalOff: true,
                      unzoomEventType: 'dblclick.zoom'
                  }
              }
          };


    $rootScope.$watch('data', function(data) {

      if (typeof data != 'undefined') {

        // compute cumulative number of recorded species (x) and days (y)
        var res = data.map(function(d) {
          return {
            days: Number(moment(d.created_at).diff($rootScope.synthesis.min_time, 'days')),
            sp: d.taxon.name,
            class: d.iconic_taxon_name
          };
        });

        var classes = _.chain(res)
          .flatten()
          .pluck('class')
          .uniq()
          .value();

        var days = _.chain(res)
          .flatten()
          .pluck('days')
          .uniq()
          .max()
          .value();

        $scope.data = [];

        for (var c = 0; c < classes.length; c++) {

          var obj = {};
          obj.key = classes[c];
          obj.color = colors[classes[c]];
          var count = 0;
          obj.values = [];

          for (var d = 0; d < days; d++) {

            // init object and filter
            var value = {};
            var filter = {
              class: classes[c],
              days: d
            }

            value.x = d;
            var nsp = _.chain(res)
              .where(filter)
              .pluck('sp')
              .uniq()
              .size()
              .value();

            count += nsp;
            value.y = count;

            obj.values.push(value);

          };

          $scope.data.push(obj);

        };

        console.log($scope.data);
      };

    });


  }]);
