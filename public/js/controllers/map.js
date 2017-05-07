// Controller portal

angular.module('bobby')
.controller('map', ['$rootScope', '$scope', 'leafletData','$location', function($rootScope, $scope, leafletData, $location) {


  // CONFIG: init basemap
  angular.extend($rootScope, {
    defaults: {
      maxZoom: 10,
      minZoom: 4,
    },
    quebec: {
      lat: 48,
      lng: -73,
      zoom: 7
    },
    markers: {

    },
    layers: {
      baselayers: {
        googleTerrain: {
          name: 'Vue terrain',
          layerType: 'TERRAIN',
          type: 'google'
        },
        googleHybrid: {
          name: 'Vue satellitaire',
          layerType: 'HYBRID',
          type: 'google'
        },
        googleRoadmap: {
          name: 'Vue cartographique',
          layerType: 'ROADMAP',
          type: 'google'
        }
      }
    }
  });


}]);
