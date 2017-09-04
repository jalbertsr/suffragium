[![NodeJS](https://github.com/MarioTerron/logo-images/blob/master/logos/nodejs.png)](https://nodejs.org/)
[![ExpressJS](https://github.com/MarioTerron/logo-images/blob/master/logos/expressjs.png)](http://expressjs.com///)
[![AngularJS](https://github.com/FransLopez/logo-images/blob/master/logos/angularjs.png)](https://angularjs.org/)
[![ES6](https://github.com/MarioTerron/logo-images/blob/master/logos/es6.png)](http://www.ecma-international.org/ecma-262/6.0/) 
[![npm](https://github.com/MarioTerron/logo-images/blob/master/logos/npm.png)](https://www.npmjs.com/)
[![Bower](https://github.com/FransLopez/logo-images/blob/master/logos/bower.png)](https://bower.io/)
[![Browserify](https://seeklogo.com/images/B/browserify-logo-A97CE3C5D0-seeklogo.com.png)](http://browserify.org/)
[![MongoDB](https://github.com/FransLopez/logo-images/blob/master/logos/mongodb.png)](https://www.mongodb.com/)
[![Monogoose](https://github.com/MarioTerron/logo-images/blob/master/logos/mongoose.png)]
[![HTML5,CSS3 and JS](https://github.com/FransLopez/logo-images/blob/master/logos/html5-css3-js.png)](http://www.w3.org/) 
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# [Suffragium](https://suffragium.herokuapp.com/#!/)

---

### Configuration `env` file

You need to create an **.env** file in the project root with the following environment variables configured:

- Port:

  ```
  PORT=3000
  ```

- Mongodb path and database to use:

  ```
  DB_URI=mongodb://localhost:27017/NAME_DB
  ```

- Secret word to encrypt users' passwords:

  ```
  SECRET=XXXXXX
  ```
  
- Secret word to ecnrypt cookies: 

  ```
  SECRETKEY=XXXXXX 
  ```
 
---

## Built with:

- **Front-end**

    - angular: 1.6.4
      - angular-route: 1.6.6
      - angular-jwt: 0.1.9
    - browserify: 14.4.0
    - bower: 1.8.0
    - materialize: 0.100.1
    - font-awesome: 4.7.0
    - socket.io-client": 2.0.3

- **Back-end**
  - socket.io 2.0.3
  - dotenv: 4.0.0
  - express: 4.15.4
    - express-jwt: 5.3.0
  - jsonwebtoken: 7.4.3
  - mongoose: 4.11.7
  - passport: 0.4.0
    - passport-jwt: 3.0.0
    - passport-local: 1.0.0
    - passport-local-mongoose: 4.2.1

---

## Author

[Joan Albert Segura](https://github.com/jalbertsr)


