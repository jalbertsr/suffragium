function registerConfig ($routeProvider) {
  $routeProvider
    .when('/register', {
      templateUrl: 'app/routes/register/template.html',
      controller: 'registerController'
    })
}

module.exports = registerConfig
