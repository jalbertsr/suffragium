function resultsConfig ($routeProvider) {
  $routeProvider
    .when('/results', { // add /results/:id
      templateUrl: 'app/routes/results/template.html',
      controller: 'resultsController'
    })
}

module.exports = resultsConfig
