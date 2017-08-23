/* global angular */

angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/register', {
      templateUrl: 'app/routes/register/template.html',
      controller: 'registerController'
    })
})
