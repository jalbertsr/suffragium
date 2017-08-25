var fs = require('fs')
var htmlPrivateArea = fs.readFileSync(__dirname + '/template.html', 'utf8');

function privateAreaConfig ($routeProvider) {
  $routeProvider
    .when('/username', { // add /:username
      template: htmlPrivateArea,
      controller: 'privateAreaController'
    })
}

module.exports = privateAreaConfig
