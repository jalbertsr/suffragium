/* global Materialize */

'use strict'

function registerController (AuthService, $location) {
  this.register = (e) => {
    e.preventDefault()
    AuthService.register(this.email, this.password)
      .then(data => {
        console.log(data)
        if (data.success) {
          Materialize.toast('Registered!', 1000)
          $location.path(`/login/`)
        } else {
          Materialize.toast('Email in use!', 1000)
        }
      })
  }
}

module.exports = registerController
