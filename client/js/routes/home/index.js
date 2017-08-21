/* global angular */
angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'js/routes/home/template.html',
      controller: 'homeController'
    })
})
