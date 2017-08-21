/* global angular */

angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/username', { // add /:username
      templateUrl: 'js/routes/home/template.html',
      controller: 'privateAreaController'
    })
})
