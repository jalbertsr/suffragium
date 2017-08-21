/* global angular */

angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/register', {
      templateUrl: 'js/routes/register/template.html',
      controller: 'registerController'
    })
})
