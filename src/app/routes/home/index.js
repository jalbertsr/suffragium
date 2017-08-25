function configRouteHome ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/routes/home/template.html',
      controller: 'homeController'
    })
}

module.exports = configRouteHome
