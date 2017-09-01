/* global Materialize */

'use strict'

function registerController (AuthService) {
  this.register = (e) => {
    e.preventDefault()
    AuthService.register(this.username, this.password)
      .then(data => {
        if (data.succes) Materialize.toast('Registered!', 1000)
        else Materialize.toast('Email in use!', 1000)
      })
  }
}

module.exports = registerController
