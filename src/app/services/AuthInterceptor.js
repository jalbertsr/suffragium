const AuthInterceptor = (StorageService) => {
  return {
    request: function (config) {
      const token = StorageService.getToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    }
  }
}
module.exports = AuthInterceptor
