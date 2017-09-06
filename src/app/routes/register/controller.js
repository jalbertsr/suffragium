/* global Materialize */

'use strict'

function registerController (AuthService, $location) {
  this.register = (e) => {
    e.preventDefault()
    AuthService.register(this.email, this.password)
      .then(data => {
        if (data.success) {
          Materialize.toast('Registered!', 2000)
          $location.path(`/login/`)
        } else {
          Materialize.toast('Email in use!', 2000)
        }
      })
  }
}

module.exports = registerController
