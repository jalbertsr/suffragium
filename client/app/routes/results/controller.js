/* global angular */

(function () {
  'use strict'

  var app = angular.module('suffragium')
  app.controller('resultsController', resultsController)

  function resultsController ($scope, $rootScope) {
    var myChart

    $scope.changeChart = function (chartType) {
      const ctx = document.getElementById('myChart')
      myChart.destroy()
      console.log(chartType)

      switch (chartType) {
        case 'line':
        case 'horizontalBar':
        case 'bar':
          let data = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
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

          myChart = new Chart (ctx, {
            type: chartType,
            data: data,
            options: options
          })
          break
        case 'doughnut':
        case 'pie':
          let pieData = {
            datasets: [{
              data: [10, 20, 30],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ]
            }],
          // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
              'Red',
              'Yellow',
              'Blue'
            ]
          }

          myChart = new Chart (ctx, {
            type: chartType,
            data: pieData
          })
      }
    }

    /* --------------- BAR CHART ---------------- */
    var initialGraph = setTimeout(function () {
      const ctx = document.getElementById('myChart')

      let data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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

      myChart = new Chart (ctx, {
        type: 'horizontalBar',
        data: data,
        options: options
      })
      clearTimeout(initialGraph)
    }, 200)

    /* --------------- DOUGHNUT CHART ---------------- */
    // data = {
    //   datasets: [{
    //     data: [10, 20, 30]
    //   }],

    //   // These labels appear in the legend and in the tooltips when hovering different arcs
    //   labels: [
    //     'Red',
    //     'Yellow',
    //     'Blue'
    //   ]
    // }

    // var myDoughnutChart = new Chart(ctx, {
    //   type: 'doughnut',
    //   data: data,
    //   options: options
    // })
  }
})()
