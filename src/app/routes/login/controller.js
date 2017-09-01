/* global Materialize */

'use strict'

function loginController (AuthService, $location) {
  this.login = (e) => {
    e.preventDefault()
    AuthService.login(this.username, this.password)
      .then(success => {
        if (success) {
          Materialize.toast('Succesfully logged!', 1000)
          $location.path('/login')
        } else {
          Materialize.toast('Try again!', 1000)
        }
      })
  }
}

module.exports = loginController
