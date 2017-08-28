'use strict'

function homeController ($scope, dataService) {
  dataService.getPolls()
    .then((response) => {
      $scope.polls = response.data
      console.log(response)
    })
    .catch(console.log)
}

module.exports = homeController
