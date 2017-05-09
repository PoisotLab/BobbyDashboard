'use strict';

angular.module('bobby')
       .constant('API_CONFIG',{
         baseURL: 'http://www.inaturalist.org/',
         projectEndPoint: 'observations/project/gatineau-provincial-park-quebec.json',
         perPage:30
       });
