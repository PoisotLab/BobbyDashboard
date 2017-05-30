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
        type: 'sunburstChart',
        height: 400,
        margin: {
          top: 5,
          right: 5,
          bottom: 5,
          left: 5
        },
        duration: 250,
        mode: "size",
        groupColorByParent: false
      },
      title: {
        enable: true,
        text: 'Number of species by taxonomic class',
        css: {
          'text-align': 'center',
          'font-weight': 'bold'
        }
      },
      subtitle: {
        enable: true,
        text: 'Click on center to reset the graph'
      }
    };

    $rootScope.$watch('data', function(data) {

      $scope.data = []

      if (typeof data != 'undefined') {
        var obs = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i].taxon != null){
            obs[i] = {
              sp: data[i].taxon.name,
              class:data[i].iconic_taxon.name,
              ancestry:data[i].taxon.ancestry,
              color: colors[data[i].iconic_taxon.name]
            };
          } else {
            obs[i] = {
              sp: null,
              class:null,
              ancestry:null
            };
          };
        };

        // Init data with all species
        var dat_chart = {
          name: 'All Observations',
          size: $rootScope.synthesis.n_spec,
          color: '#ffffff',
          children: []
        }

        // count by class
        var c_class = _.countBy(obs,'class');
        var c_sp = _
          .chain(obs)
          .groupBy('class')
          .map(function(item, itemId) {
            var obj = {};
            obj[itemId] = _.countBy(item, 'sp')
            return obj
          })
          .value();



        for (var c in c_class) {
          dat_chart.children.push({
            name: c,
            size: c_class[c],
            color: colors[c],
            children: []
          });
        };

        $scope.data = [dat_chart];

      };


    });
  }]);
