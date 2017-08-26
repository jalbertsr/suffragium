'use strict'

const getData = ($http) => {
  const getInfoPoll = (id) => {
    const url = `/api/infoPoll/${id}`
    return $http.get(url)
  }
  return { getInfoPoll }
}

module.exports = getData
