'use strict';

angular.module('bobby')
  .service('api', ['$http', 'API_CONFIG', '$q', function($http, API_CONFIG, $q) {

    this.getAllPages = function() {
      var deferred = $q.defer();
      var pageNumber = 1;
      var data = [];

      _getPages(pageNumber,data,deferred);

      return deferred.promise;
    }

    function _getPages(pageNumber,data,deferred) {

      $http.get(API_CONFIG.baseURL + API_CONFIG.projectEndPoint + '?page=' + pageNumber + '&per_page=' + API_CONFIG.perPage, {
        cache: true
      })
        .then(function(response) {

          var tot_entries = Math.ceil(response.headers()['x-total-entries']);

          for (var i = response.data.length - 1; i >= 0; i--) {
            data.push(response.data[i]);
          };

          if (data.length < tot_entries) {
            
            var percentComplete = (data.length+1)/tot_entries * 100;
            deferred.notify(percentComplete);

            pageNumber++;
            _getPages(pageNumber,data,deferred);

          } else {
            var percentComplete = 100;
            deferred.notify(percentComplete);
            deferred.resolve(data);
          }

        });
    }
  }]);


  //   this.getData = function() {
  //
  //     var deferred = $q.defer();
  //     var data = [];
  //
  //     $http.get(API_CONFIG.baseURL + API_CONFIG.projectEndPoint + '?per_page=' + API_CONFIG.perPage).
  //     then(function(response) {
  //
  //       // Get number of page from response header
  //       var npages = Math.ceil(response.headers()['x-total-entries'] / response.headers()['x-per-page']);
  //
  //       // Loop over pages
  //       for (var i = 1; i <= npages; i++) {
  //         $http.get().
  //         // Loop over data within the page
  //         then(function(response) {
  //           response.data.forEach(function(item) {
  //             data.push(item);
  //           });
  //         });
  //
  //         if(data.length == npages * API_CONFIG.perPage){
  //             return deferred.resolve(data);
  //         } else {
  //             return deferred.reject(data);
  //         };
  //
  //       };
  //
  //     });
  //
  //     return deferred.promise;
  //
  //   };
  //
