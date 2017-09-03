'use strict'

const AuthService = ($http, $rootScope, StorageService, jwtHelper) => {
  const register = (email, password) => {
    return $http.post(`/register/`, {email, password})
                .then(res => res.data)
  }

  const isLoggedIn = () => {
    const token = StorageService.getToken()
    if (!token) return false
    return true
  }

  const setCredentials = (token) => {
    const tokenPayload = jwtHelper.decodeToken(token)
    $rootScope.loggedUser = tokenPayload.email
    $rootScope.idUser = tokenPayload.id
  }

  const login = (email, password) => {
    return $http.post('/login/', {email, password})
              .then(res => res.data)
              .then(data => {
                StorageService.saveToken(data.token)
                setCredentials(data.token)
                return data
              })
  }

  const logout = (email, password) => {
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

module.exports = AuthService
