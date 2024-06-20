
const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const AuthController = require('../controllers/authController')
const Controller = require('../controllers/controller')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
// router.post('/google-login', AuthController.googleLogin)

router.use(authentication)
router.get('/user', Controller.readUser)
// 

//error handler
router.use(errorHandler)

module.exports = router
