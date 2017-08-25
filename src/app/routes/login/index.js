function configLogin ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/routes/login/template.html',
      controller: 'loginController'
    })
}

module.exports = configLogin
