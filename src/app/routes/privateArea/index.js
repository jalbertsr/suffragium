function privateAreaConfig ($routeProvider) {
  $routeProvider
    .when('/username', { // add /:username
      templateUrl: 'app/routes/privateArea/template.html',
      controller: 'privateAreaController'
    })
}

module.exports = privateAreaConfig
