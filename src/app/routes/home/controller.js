'use strict'

function homeController ($scope, dataService) {
  dataService.getPolls()
    .then(console.log)
    .catch(console.log)
}

module.exports = homeController
