/* global angular */

angular.module('suffragium')
.config(function ($routeProvider) {
  $routeProvider
    .when('/results', { // add /results/:id
      templateUrl: 'js/routes/results/template.html',
      controller: 'resultsController'
    })
})
