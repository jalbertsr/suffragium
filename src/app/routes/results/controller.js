/* global angular */
'use strict'

const backgroundColor = require('./colors/backgroundColors.json')
const borderColor = require('./colors/borderColors.json')
const FileSaver = require('file-saver')
const Chart = require('chart.js')
const socket = require('socket.io-client').connect({'force new connection': true})

function resultsController ($scope, $rootScope, $routeParams, dataService) {
  const { id } = $routeParams
  let myChart
  let saveCount = 0
  let dataOptions
  $scope.allreadyVote = true
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

      console.log(response)
    })
    .catch(console.log)
    const ctx = document.getElementById('myChart')
    myChart.destroy()
    console.log($scope.currentChart)

    switch ($scope.currentChart) {
      case 'line':
      case 'horizontalBar':
      case 'bar':
        Chart.defaults.global.legend.display = false
        let data = {
          labels: $scope.chartOptions,
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

      console.log(response)
    })
    .catch(console.log)

  /* ------------ ON CLICK ACTIONS -------- */

  $scope.saveChart = () => {
    document.getElementById('myChart').toBlob((blob) => {
      saveCount++
      FileSaver.saveAs(blob, `chart_${saveCount}.png`)
    })
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
        .then(console.log)
        .catch(console.log)
    } else {
      dataService.vote(id, $scope.radioSelected)
        .then(console.log)
        .catch(console.log)
    }
    // emit vote
    socket.emit('newVote', {'voto': 'click'})
    $scope.allreadyVote = false
    console.log($scope.allreadyVote)
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
          labels: $scope.chartOptions,
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
    // const imgBase64 = setTimeout(function () {
    //   const graphUrl = ctx.toDataURL()
    //   console.log(graphUrl)
    // }, 1000)
  }

  /* --------------- DEFAULT BAR CHART ---------------- */
  var initialGraph = setTimeout(() => {
    const ctx = document.getElementById('myChart')
    Chart.defaults.global.legend.display = false

    let data = {
      labels: $scope.chartOptions,
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
  }, 500)
}

module.exports = resultsController
