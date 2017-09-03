'use strict'

function homeController ($scope, dataService, AuthService, $location) {
  dataService.getPolls()
    .then((response) => {
      $scope.polls = response.data
      console.log(response)
    })
    .catch(console.log)

  $scope.logout = () => {
    AuthService.logout()
    $location.path('/')
  }
}

module.exports = homeController
