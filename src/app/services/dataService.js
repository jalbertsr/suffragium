'use strict'
const getData = ($http) => {
  const getInfoPoll = (id) => {
    const url = `/api/infoPoll/${id}`
    return $http.get(url)
  }

  const vote = (idPoll, idsVote, logged, duplicationChecking) => {
    const url = `/api/poll/${idPoll}/vote/${idsVote}`
    const data = { logged, duplicationChecking }
    return $http.put(url, data)
  }

  const getPolls = () => {
    const url = `/api/getPolls/`
    return $http.get(url)
  }

  const updateStatus = (id, status) => {
    const url = `/api/privateArea/${id}/${status}`
    return $http.put(url)
  }

  const getUserPolls = (id) => {
    const url = `/api/infoUser/${id}`
    return $http.get(url)
  }

  const deletePoll = (id) => {
    const url = `/api/privateArea/${id}`
    return $http.delete(url)
  }

  const updateImage = (id, imgUrl) => {
    const url = `/api/updateImg/${id}`
    return $http.post(url, { imgUrl })
  }

  return {
    getInfoPoll,
    vote,
    getPolls,
    updateStatus,
    getUserPolls,
    deletePoll,
    updateImage
  }
}

module.exports = getData
