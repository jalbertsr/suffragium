const path = require('path')
const fs = require('fs')
const htmlPrivateArea = fs.readFileSync(path.join(__dirname, '/template.html'), 'utf-8')

function privateAreaConfig ($routeProvider) {
  $routeProvider
    .when('/username/:id', {
      template: htmlPrivateArea,
      controller: 'privateAreaController'
    })
}

module.exports = privateAreaConfig
