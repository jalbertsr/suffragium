/* global angular */
angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/routes/home/template.html',
      controller: 'homeController'
    })
})
