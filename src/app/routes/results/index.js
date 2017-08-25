var fs = require('fs')
var htmlResults = fs.readFileSync(__dirname + '/template.html', 'utf8');

function resultsConfig ($routeProvider) {
  $routeProvider
    .when('/results', { // add /results/:id
      template: htmlResults,
      controller: 'resultsController'
    })
}

module.exports = resultsConfig
