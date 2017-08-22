/* global angular */
angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'js/routes/login/template.html',
      controller: 'loginController'
    })
})
