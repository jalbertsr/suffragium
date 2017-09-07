const Chart = require('chart.js')
const backgroundColor = require('./colors/backgroundColors.json')
const borderColor = require('./colors/borderColors.json')

const ChartService = () => {
  const truncateString = (initialString) => {
    if (initialString.length > 12) {
      const shortString = initialString.substring(0, 12)
      return shortString + '...'
    }
    return initialString
  }

  const createBarChart = (chartType, chartOptions, chartVotes, ctx) => {
    Chart.defaults.global.legend.display = false
    const data = {
      labels: chartOptions.map((option) => {
        return truncateString(option)
      }),
      datasets: [{
        label: '',
        data: chartVotes,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    }

    const options = {
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

    return new Chart(ctx, {
      type: chartType,
      data: data,
      options: options
    })
  }

  const createPieChart = (chartType, chartOptions, chartVotes, ctx) => {
    Chart.defaults.global.legend.display = true
    const pieData = {
      datasets: [{
        data: chartVotes,
        backgroundColor: backgroundColor,
        borderColor: borderColor
      }],
      labels: chartOptions
    }

    return new Chart(ctx, {
      type: chartType,
      data: pieData
    })
  }

  return { createBarChart, createPieChart }
}

module.exports = ChartService
