const path = require('path')
const fs = require('fs')
const htmlRegister = fs.readFileSync(path.join(__dirname, '/template.html'), 'utf-8')

function registerConfig ($routeProvider) {
  $routeProvider
    .when('/register', {
      template: htmlRegister,
      controller: 'registerController',
      controllerAs: 'vm'
    })
}

module.exports = registerConfig
