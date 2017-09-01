'use strict'

const authService = ($http, $rootScope, StorageService, jwtHelper) => {
  const register = (username, password) => {
    return $http.post(`/register`, {username, password})
                .then(res => res.data)
  }

  const isLoggedIn = () => {
    const token = StorageService.getToken()
    if (!token) return false
    return true
  }

  const setCredentials = (token) => {
    const tokenPayload = jwtHelper.decodeToken(token)
    $rootScope.loggedUser = tokenPayload.username
  }

  const login = (username, password) => {
    return $http.post('/login', {username, password})
              .then(res => res.data)
              .then(data => {
                StorageService.saveToken(data.token)
                setCredentials(data.token)
                return data.success
              })
  }

  const logout = (username, password) => {
    StorageService.removeToken()
    delete $rootScope.loggedUser
  }

  return {
    register,
    isLoggedIn,
    login,
    logout,
    setCredentials
  }
}

module.exports = authService
