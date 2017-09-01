const interceptor = ($httpProvider) => {
  $httpProvider.interceptors.push('AuthInterceptor')
}

module.exports = interceptor
