'use strict';

angular.module('bobby')
  .service('api', ['$http', 'API_CONFIG', '$q', function($http, API_CONFIG, $q) {

    this.getAllPages = function(projectID) {
      var deferred = $q.defer();
      var pageNumber = 1;
      var data = [];

      _getPages(pageNumber,data,deferred,projectID);

      return deferred.promise;
    }

    function _getPages(pageNumber,data,deferred,projectID) {

      $http.get(API_CONFIG.baseURL + API_CONFIG.projectEndPoint + projectID + '.json?page=' + pageNumber + '&per_page=' + API_CONFIG.perPage, {
        cache: true
      })
        .then(function(response) {

          var tot_entries = Math.ceil(response.headers()['x-total-entries']);
          var percentComplete = 0;

          for (var i = response.data.length - 1; i >= 0; i--) {
            data.push(response.data[i]);
          };

          if (data.length < tot_entries) {

            percentComplete = (data.length+1)/tot_entries * 100;
            deferred.notify(percentComplete);

            pageNumber++;
            _getPages(pageNumber,data,deferred,projectID);

          } else {
            percentComplete = 100;
            deferred.notify(percentComplete);
            deferred.resolve(data);
          }

        });
    }
  }]);
