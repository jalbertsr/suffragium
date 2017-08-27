/* global angular */
'use strict'

const FileSaver = require('file-saver')
const Chart = require('chart.js')

function resultsController ($scope, $rootScope, $routeParams, dataService) {
  const { id } = $routeParams
  let myChart
  let saveCount = 0
  let dataOptions
  let chartOptions
  let chartVotes

  /* ------------ START API CALLS ------------ */

  dataService.getInfoPoll(id)
    .then((response) => {
      $scope.question = response.data.question
      $scope.status = response.data.pollInfo.status
      $scope.totalVotes = response.data.pollInfo.totalVotes
      $scope.options = response.data.options
      $scope.allowMoreThanOne = response.data.config.allowMoreThanOne

      dataOptions = response.data.options

      chartOptions = dataOptions.map((obj) => {
        return obj.option
      })

      chartVotes = dataOptions.map((obj) => {
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
  }

  /* ------------ ON CHANGE ACTIONS -------- */

  $scope.changeChart = (chartType) => {
    const ctx = document.getElementById('myChart')
    myChart.destroy()

    switch (chartType) {
      case 'line':
      case 'horizontalBar':
      case 'bar':
        let data = {
          labels: chartOptions,
          datasets: [{
            label: chartOptions, // mirar flata algo
            data: chartVotes,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
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
          type: chartType,
          data: data,
          options: options
        })
        break
      case 'doughnut':
      case 'pie':
        let pieData = {
          datasets: [{
            data: chartVotes,
            backgroundColor: [
              'rgba(54, 162, 235, 0.3)',
              'rgba(255, 99, 132, 0.3)',
              'rgba(255, 206, 86, 0.3)',
              'rgba(75, 192, 192, 0.3)',
              'rgba(153, 102, 255, 0.3)',
              'rgba(255, 159, 64, 0.3)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132,1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ]
          }],
          labels: chartOptions
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

    let data = {
      labels: chartOptions,
      datasets: [{
        label: '# of Votes',
        data: chartVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
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
  }, 200)
}

module.exports = resultsController
