const express = require('express')
const { AuthController } = require('../controllers')
const { runValidation, AuthValidator } = require('../validators')
const router = express.Router()

router.post('/register', AuthValidator.userRegisterValidator, runValidation, AuthController.register)

// Needed when email verification is done
router.post('/register/activate', AuthController.registerActivate)

router.post('/login', AuthValidator.userLoginValidator, runValidation, AuthController.login)

module.exports = router
