'use strict'

const getData = ($http) => {
  const getInfoPoll = (id) => {
    const url = `/api/infoPoll/${id}`
    return $http.get(url)
  }

  const vote = (idPoll, idsVote) => {
    const url = `/api/poll/${idPoll}/vote/${idsVote}`
    return $http.put(url)
  }

  const getPolls = () => {
    const url = `/api/getPolls/`
    return $http.get(url)
  }

  const updateStatus = (id, status) => {
    const url = `/api/privateArea/${id}/${status}`
    return $http.put(url)
  }
  return {
    getInfoPoll,
    vote,
    getPolls,
    updateStatus
  }
}

module.exports = getData
