var fs = require('fs')
var htmlHome = fs.readFileSync(__dirname + '/template.html', 'utf8');

function configRouteHome ($routeProvider) {
  $routeProvider
    .when('/', {
      template: htmlHome,
      controller: 'homeController'
    })
}

module.exports = configRouteHome
