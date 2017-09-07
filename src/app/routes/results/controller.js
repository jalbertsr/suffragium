/* global angular, Materialize */
'use strict'

const FileSaver = require('file-saver')
const Chart = require('chart.js')
const socket = require('socket.io-client').connect({'force new connection': true})

function resultsController ($scope, $rootScope, $routeParams, dataService, AuthService, ChartService, $location) {
  const { id } = $routeParams
  let myChart
  let saveCount = 0
  let dataOptions
  $scope.currentChart = 'bar'

  /* -------- SOCKET UPDATE ALL ----------- */
  socket.on('updateInfo', (idPollUpdated) => {
    const url = $location.absUrl()
    const token = url.split('/').pop()
    if (idPollUpdated === token) {
      console.log(`update all clients in poll ${idPollUpdated}`)
      dataService.getInfoPoll(idPollUpdated)
        .then((response) => {
          $scope.question = response.data.question
          $scope.status = response.data.pollInfo.status
          $scope.totalVotes = response.data.pollInfo.totalVotes
          $scope.options = response.data.options
          $scope.allowMoreThanOne = response.data.config.allowMoreThanOne

          dataOptions = response.data.options

          $scope.chartOptions = dataOptions.map((obj) => {
            return obj.option
          })

          $scope.chartVotes = dataOptions.map((obj) => {
            return obj.votes
          })

          const ctx = document.getElementById('myChart')
          myChart.destroy()

          myChart = ChartService.createBarChart($scope.currentChart, $scope.chartOptions, $scope.chartVotes, ctx)
        })
    }
  })

  /* ------------ START API CALLS ------------ */

  dataService.getInfoPoll(id)
    .then((response) => {
      $scope.question = response.data.question
      $scope.status = response.data.pollInfo.status
      $scope.totalVotes = response.data.pollInfo.totalVotes
      $scope.options = response.data.options
      $scope.allowMoreThanOne = response.data.config.allowMoreThanOne
      $scope.duplicationChecking = response.data.config.duplicationChecking

      dataOptions = response.data.options

      $scope.chartOptions = dataOptions.map((obj) => {
        return obj.option
      })

      $scope.chartVotes = dataOptions.map((obj) => {
        return obj.votes
      })
    })

  /* ------------ CHECK USER LOGGED ------- */

  $scope.logged = AuthService.isLoggedIn()

  /* ------------ ON CLICK ACTIONS -------- */

  $scope.saveChart = () => {
    document.getElementById('myChart').toBlob((blob) => {
      saveCount++
      FileSaver.saveAs(blob, `${$scope.currentChart}Chart_${saveCount}.png`)
    })
  }

  $scope.logout = () => {
    AuthService.logout()
    $location.path('/')
  }

  $scope.getVal = (radioSelected) => {
    $scope.radioSelected = radioSelected
  }

  $scope.vote = (listOptions) => {
    if ($scope.allowMoreThanOne) {
      const optionsVoted = []
      angular.forEach(listOptions, (value, key) => {
        if (listOptions[key].selected === listOptions[key]._id) {
          optionsVoted.push(listOptions[key].selected)
        }
      })
      const idsVote = optionsVoted.join('_')

      dataService.vote(id, idsVote, $scope.logged, $scope.duplicationChecking)
        .then((msg) => {
          if (msg.status === 200) Materialize.toast('Voted!', 2000)
        })
        .catch((msg) => {
          if (msg.status === 401) Materialize.toast('Already Voted!', 2000)
          else if (msg.status === 403) Materialize.toast('Not logged!', 2000)
        })
    } else {
      dataService.vote(id, $scope.radioSelected, $scope.logged, $scope.duplicationChecking)
        .then((msg) => {
          if (msg.status === 200) Materialize.toast('Voted!', 2000)
        })
        .catch((msg) => {
          if (msg.status === 401) Materialize.toast('Already Voted!', 2000)
          else if (msg.status === 403) Materialize.toast('Not logged!', 2000)
        })
    }
    // emit vote
    socket.emit('newVote', {'voto': 'click'})
  }

  /* ------------ ON CHANGE ACTIONS -------- */

  $scope.changeChart = (chartType) => {
    $scope.currentChart = chartType
    const ctx = document.getElementById('myChart')
    myChart.destroy()
    switch (chartType) {
      case 'line':
      case 'horizontalBar':
      case 'bar':
        myChart = ChartService.createBarChart($scope.currentChart, $scope.chartOptions, $scope.chartVotes, ctx)
        break
      case 'doughnut':
      case 'pie':
        myChart = ChartService.createPieChart($scope.currentChart, $scope.chartOptions, $scope.chartVotes, ctx)
        break
    }
  }

  /* --------------- DEFAULT BAR CHART ---------------- */
  var initialGraph = setTimeout(() => {
    const ctx = document.getElementById('myChart')
    Chart.defaults.global.legend.display = false
    myChart = ChartService.createBarChart($scope.currentChart, $scope.chartOptions, $scope.chartVotes, ctx)

    clearTimeout(initialGraph)
    const imgBase64 = setTimeout(function () {
      const graphUrl = ctx.toDataURL()
      dataService.updateImage(id, graphUrl)
      clearTimeout(imgBase64)
    }, 500)
  }, 800)
}

module.exports = resultsController
