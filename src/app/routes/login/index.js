var fs = require('fs')
var htmlLogin = fs.readFileSync(__dirname + '/template.html', 'utf8');

function configLogin ($routeProvider) {
  $routeProvider
    .when('/login', {
      template: htmlLogin,
      controller: 'loginController'
    })
}

module.exports = configLogin
