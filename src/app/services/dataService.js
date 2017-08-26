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
  return {
    getInfoPoll,
    vote
  }
}

module.exports = getData
