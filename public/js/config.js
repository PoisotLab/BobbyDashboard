'use strict';

angular.module('bobby')
       .constant('API_CONFIG',{
         baseURL: 'https://www.inaturalist.org/',
         projectEndPoint: 'observations/project/',
         defaultProjectName: 'gatineau-provincial-park-quebec',
         perPage:30
       });
