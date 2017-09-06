/* global Materialize */

'use strict'

function loginController (AuthService, $location) {
  this.login = (e) => {
    e.preventDefault()
    AuthService.login(this.email, this.password)
      .then(data => {
        if (data.success) {
          Materialize.toast('Succesfully logged!', 2000)
          $location.path(`/username/${data.id}`)
        }
      })
      .catch(() => Materialize.toast('Try again!', 2000))
  }
}

module.exports = loginController
