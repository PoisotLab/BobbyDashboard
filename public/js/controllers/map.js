// Controller portal

angular.module('bobby')
  .controller('map', ['$rootScope', '$scope', 'leafletData', '$location', function($rootScope, $scope, leafletData, $location) {

    // Config icons
    var icons = {
      Actinopterygii: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Actinopterygii',
        iconAnchor: [5, 5]
      },
      Amphibia: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Amphibia',
        iconAnchor: [5, 5]
      },
      Aves: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Aves',
        iconAnchor: [5, 5]
      },
      Insecta: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Insecta',
        iconAnchor: [5, 5]
      },
      Mammalia: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Mammalia',
        iconAnchor: [5, 5]
      },
      Plantea: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Plantae',
        iconAnchor: [5, 5]
      },
      Reptilia: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Reptilia ',
        iconAnchor: [5, 5]
      },
      Fungi: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Fungi',
        iconAnchor: [5, 5]
      },
      Animalia: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Animalia',
        iconAnchor: [5, 5]
      },
      Mollusca: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Mollusca',
        iconAnchor: [5, 5]
      },
      Chromista: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Chromista',
        iconAnchor: [5, 5]
      },
      Unidentified: {
        type: 'div',
        iconSize: [10, 10],
        className: 'Unidentified',
        iconAnchor: [5, 5]
      }
    };

    // init basemap
    angular.extend($rootScope, {
      defaults: {
        maxZoom: 20,
        minZoom: 4,
      },
      quebec: {
        lat: 48,
        lng: -73,
        zoom: 7
      },
      controls: {
        fullscreen: {
          position: 'topright'
        }
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
        },
        overlays: {
          Actinopterygii: {
            type: 'group',
            name: 'Actinopterygii',
            visible: true
          },
          Amphibia: {
            type: 'group',
            name: 'Amphibia',
            visible: true
          },
          Aves: {
            type: 'group',
            name: 'Aves',
            visible: true
          },
          Insecta: {
            type: 'group',
            name: 'Insecta',
            visible: true
          },
          Mammalia: {
            type: 'group',
            name: 'Mammalia',
            visible: true
          },
          Plantea: {
            type: 'group',
            name: 'Plantea',
            visible: true
          },
          Reptilia: {
            type: 'group',
            name: 'Reptilia',
            visible: true
          },
          Fungi: {
            type: 'group',
            name: 'Fungi',
            visible: true
          },
          Animalia: {
            type: 'group',
            name: 'Animalia',
            visible: true
          },
          Mollusca: {
            type: 'group',
            name: 'Mollusca',
            visible: true
          },
          Chromista: {
            type: 'group',
            name: 'Chromista',
            visible: true
          },
          Unidentified: {
            type: 'group',
            name: 'Unidentified',
            visible: true
          }
        }
      }
    });

    $rootScope.$watch('data', function(data) {

      if (typeof data != 'undefined') {
        // reinit markers
        $rootScope.markers = [];

        // loop over data to push marker
        data.forEach(function(item) {


          // // loop over icons
          for (var icon in icons) {
            if (item.iconic_taxon_name == icon) {
              var select_icon = icons[icon];
            } else if (item.iconic_taxon_name == null) {
              var select_icon = icons['Unidentified'];
            }
          }

          if (item.photos.length != 0) {
            var src = item.photos[0].large_url
          } else {
            var src = "https://static.inaturalist.org/sites/1-logo_square.png?1457659831"
          }

          if (item.taxon != null) {
            var popup =
              "<div class='thumbnail'>" +
              "<img src='" + src + "' width='100%'></img>" +
              "<div class='caption'>" +
              "<h3 style='font-weight:bold;margin-top:5px;'>" + item.taxon.name + "</h3>" +
              "<p style='margin:0px;'>" +
              "<strong>User ID: </strong>" + item.user_login + "<br>" +
              "<strong>Date: </strong>" + item.observed_on_string + "</p>" +
              "</div>" +
              "</div>"
          } else {
            var popup = null
          }



          // set marker
          marker = {
            layer: item.iconic_taxon_name,
            lat: Number(item.latitude),
            lng: Number(item.longitude),
            icon: select_icon,
            message: popup
          }


          // push marker to the map
          $rootScope.markers.push(marker);

        });

        leafletData.getMap("map").then(function(map) {
          map.fitBounds($rootScope.markers);
        });

      }
    });


  }]);
