'use strict'

function homeController ($scope, dataService, AuthService, $location) {
  dataService.getPolls()
    .then((response) => {
      $scope.polls = response.data
    })

  $scope.logout = () => {
    AuthService.logout()
    $location.path('/')
  }
}

module.exports = homeController
