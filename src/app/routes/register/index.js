var fs = require('fs')
var htmlRegister = fs.readFileSync(__dirname + '/template.html', 'utf8');

function registerConfig ($routeProvider) {
  $routeProvider
    .when('/register', {
      template: htmlRegister,
      controller: 'registerController'
    })
}

module.exports = registerConfig
