/* global angular */

(function () {
  'use strict'

  const app = angular.module('suffragium')
  app.controller('privateAreaController', privateAreaController)

  function privateAreaController () {
    var self = this

    const modal = document.getElementById('info-modal')
    const btn = document.getElementById('info-activate')
    const btnClose = document.getElementById('btnClose')
    const addOption = document.getElementById('addOption')

    let optionNumber = 3

    btn.onclick = function () {
      modal.style.display = 'block'
    }

    btnClose.onclick = function () {
      modal.style.display = 'none'
    }

    addOption.onclick = function () {
      let optionInput = `<div class="input-field col s8">
                            <input class="input-border-color" id="option${optionNumber}" type="text" name="option${optionNumber}">
                            <label for="option${optionNumber}">Option ${optionNumber}</label>
                        </div>`
      const element = document.getElementsByClassName('input-field')[optionNumber - 1]
      element.insertAdjacentHTML('afterend', optionInput)
      optionNumber++
    }
  }
})()
