'use strict'

function privateAreaController ($scope, $routeParams, dataService) {
  const modal = document.getElementById('info-modal')
  const btn = document.getElementById('info-activate')
  const btnClose = document.getElementById('btnClose')
  const addOption = document.getElementById('addOption')

  let optionNumber = 3
  $scope.userID = $routeParams.id
  console.log($scope.userID)

  btn.onclick = function () {
    modal.style.display = 'block'
  }

  btnClose.onclick = function () {
    modal.style.display = 'none'
  }

  addOption.onclick = function () {
    let optionInput = `<div class="input-field col s8">
                          <input class="input-border-color" id="option${optionNumber}" type="text" name="option${optionNumber}">
                          <label for="option${optionNumber}">Option ${optionNumber}</label>
                      </div>`
    const element = document.getElementsByClassName('input-field')[optionNumber - 1]
    element.insertAdjacentHTML('afterend', optionInput)
    optionNumber++
  }

  $scope.updateStatus = (statusData) => {
    const status = statusData.pollInfo.status
    const id = statusData._id
    dataService.updateStatus(id, status)
      .then(console.log)
      .catch(console.log)
  }

  $scope.deletePoll = ($event) => {
    const pollIdToDelete = $event.currentTarget.parentNode.getAttribute('id')
    $event.currentTarget.parentNode.remove()
    dataService.deletePoll(pollIdToDelete)
      .then(console.log)
      .catch(console.log)
  }

  /* -------- LOAD USER POLLS API -------- */

  dataService.getUserPolls($scope.userID)
    .then((response) => {
      $scope.userPolls = response.data.ownedPolls
      console.log($scope.userPolls)
    })
    .catch(console.log)
}

module.exports = privateAreaController
