/* global angular, Materialize */
'use strict'

const backgroundColor = require('./colors/backgroundColors.json')
const borderColor = require('./colors/borderColors.json')
const FileSaver = require('file-saver')
const Chart = require('chart.js')
const socket = require('socket.io-client').connect({'force new connection': true})

function resultsController ($scope, $rootScope, $routeParams, dataService, AuthService, $location) {
  const { id } = $routeParams
  let myChart
  let saveCount = 0
  let dataOptions
  $scope.currentChart = 'bar'

  /* -------- SOCKET UPDATE ALL ----------- */
  socket.on('updateInfo', (idPollUpdated) => {
    console.log(idPollUpdated, 'update all clients')
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

      switch ($scope.currentChart) {
        case 'line':
        case 'horizontalBar':
        case 'bar':
          Chart.defaults.global.legend.display = false
          let data = {
            labels: $scope.chartOptions.map((option) => {
              return truncateString(option)
            }),
            datasets: [{
              label: '',
              data: $scope.chartVotes,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1
            }]
          }

          let options = {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }

          myChart = new Chart(ctx, {
            type: $scope.currentChart,
            data: data,
            options: options
          })
          break
        case 'doughnut':
        case 'pie':
          Chart.defaults.global.legend.display = true
          let pieData = {
            datasets: [{
              data: $scope.chartVotes,
              backgroundColor: backgroundColor,
              borderColor: borderColor
            }],
            labels: $scope.chartOptions
          }

          myChart = new Chart(ctx, {
            type: $scope.currentChart,
            data: pieData
          })
      }
    })
    .catch(console.log)
  })

  /* ------------ START API CALLS ------------ */

  dataService.getInfoPoll(id)
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
    })
    .catch(console.log)

  /* ------------ ON CLICK ACTIONS -------- */

  $scope.saveChart = () => {
    document.getElementById('myChart').toBlob((blob) => {
      saveCount++
      FileSaver.saveAs(blob, `chart_${saveCount}.png`)
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

      dataService.vote(id, idsVote)
        .then((msg) => {
          if (msg.status === 200) Materialize.toast('Voted!', 2000)
        })
        .catch(console.log)
    } else {
      dataService.vote(id, $scope.radioSelected)
        .then((msg) => {
          if (msg.status === 200) Materialize.toast('Voted!', 2000)
        })
        .catch(Materialize.toast('Allready Voted!', 2000))
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
        Chart.defaults.global.legend.display = false
        let data = {
          labels: $scope.chartOptions.map((option) => {
            return truncateString(option)
          }),
          datasets: [{
            label: '',
            data: $scope.chartVotes,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
          }]
        }

        let options = {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }

        myChart = new Chart(ctx, {
          type: chartType,
          data: data,
          options: options
        })
        break
      case 'doughnut':
      case 'pie':
        Chart.defaults.global.legend.display = true
        let pieData = {
          datasets: [{
            data: $scope.chartVotes,
            backgroundColor: backgroundColor,
            borderColor: borderColor
          }],
          labels: $scope.chartOptions
        }

        myChart = new Chart(ctx, {
          type: chartType,
          data: pieData
        })
    }
  }

  /* --------------- DEFAULT BAR CHART ---------------- */
  var initialGraph = setTimeout(() => {
    const ctx = document.getElementById('myChart')
    Chart.defaults.global.legend.display = false

    let data = {
      labels: $scope.chartOptions.map((option) => {
        return truncateString(option)
      }),
      datasets: [{
        label: '',
        data: $scope.chartVotes,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    }

    let options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    })
    clearTimeout(initialGraph)
    const imgBase64 = setTimeout(function () {
      const graphUrl = ctx.toDataURL()
      dataService.updateImage(id, graphUrl)
        .then(console.log)
      clearTimeout(imgBase64)
    }, 500)
  }, 800)
}

const truncateString = (initialString) => {
  if (initialString.length > 12) {
    const shortString = initialString.substring(0, 12)
    return shortString + '...'
  }
  return initialString
}

module.exports = resultsController
