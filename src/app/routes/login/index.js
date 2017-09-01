const path = require('path')
const fs = require('fs')
const htmlLogin = fs.readFileSync(path.join(__dirname, '/template.html'), 'utf-8')

function configLogin ($routeProvider) {
  $routeProvider
    .when('/login', {
      template: htmlLogin,
      controller: 'loginController',
      controllerAs: 'vm'
    })
}

module.exports = configLogin
