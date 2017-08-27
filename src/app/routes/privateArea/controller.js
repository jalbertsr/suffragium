'use strict'

function privateAreaController ($scope, dataService) {
  const modal = document.getElementById('info-modal')
  const btn = document.getElementById('info-activate')
  const btnClose = document.getElementById('btnClose')
  const addOption = document.getElementById('addOption')

  let optionNumber = 3

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
    const status = statusData.status
    const id = statusData.id
    dataService.updateStatus(id, status)
      .then(console.log)
      .catch(console.log)
  }

  $scope.deletePoll = function ($event) {
    console.log($event.currentTarget.parentNode)
    $event.currentTarget.parentNode.remove()
    // dataService.deletePoll(id)
    //   .then(console.log)
    //   .catch(console.log)
  }

  /* -------- FALSE DATA FOR TEST -------- */

  $scope.polls = [{
    question: 'Favourite frontend freamwork?',
    _id: '327462349237498724',
    status: true
  },
  {
    question: 'Favourite backend freamwork?',
    _id: '321111111137498724',
    status: false
  },
  {
    question: 'Favourite pizza?',
    _id: '327462123412312344',
    status: true
  }]
}

module.exports = privateAreaController
