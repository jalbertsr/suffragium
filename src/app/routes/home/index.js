const path = require('path')
const fs = require('fs')
const htmlHome = fs.readFileSync(path.join(__dirname, '/template.html'), 'utf-8')

function configRouteHome ($routeProvider) {
  $routeProvider
    .when('/', {
      template: htmlHome,
      controller: 'homeController',
      controllerAs: 'vm'
    })
}

module.exports = configRouteHome
