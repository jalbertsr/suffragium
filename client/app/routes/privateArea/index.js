/* global angular */

angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/username', { // add /:username
      templateUrl: 'app/routes/privateArea/template.html',
      controller: 'privateAreaController'
    })
})
