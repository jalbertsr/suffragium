'use strict'
const StorageService = ($window) => {
  const saveToken = (token) => {
    $window.localStorage.setItem('authToken', token)
  }

  const getToken = () => {
    return $window.localStorage.getItem('authToken')
  }

  const removeToken = () => {
    $window.localStorage.removeItem('authToken')
  }

  return { saveToken, getToken, removeToken }
}

module.exports = StorageService
