/* global angular */
angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/routes/login/template.html',
      controller: 'loginController'
    })
})
