const path = require('path')
const fs = require('fs')
const htmlResults = fs.readFileSync(path.join(__dirname, '/template.html'), 'utf-8')

function resultsConfig ($routeProvider) {
  $routeProvider
    .when('/results', { // add /results/:id
      template: htmlResults,
      controller: 'resultsController'
    })
}

module.exports = resultsConfig
