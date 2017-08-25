const angular = require('angular')
const angularRoute = require('angular-route')

const homeController = require('./routes/home/controller')
const homeConfing = require('./routes/home/index')

const privateAreaController = require('./routes/privateArea/controller')
const privateAreaConfing = require('./routes/privateArea/index')

const registerController = require('./routes/register/controller')
const registerConfing = require('./routes/register/index')

const loginController = require('./routes/login/controller')
const loginConfing = require('./routes/login/index')

const resultsController = require('./routes/results/controller')
const resultsConfing = require('./routes/results/index')

angular.module('suffragium', [angularRoute])
  .controller('homeController', homeController)
  .controller('privateAreaController', privateAreaController)
  .controller('loginController', loginController)
  .controller('registerController', registerController)
  .controller('resultsController', resultsController)
  .config(homeConfing)
  .config(loginConfing)
  .config(privateAreaConfing)
  .config(registerConfing)
  .config(resultsConfing)
