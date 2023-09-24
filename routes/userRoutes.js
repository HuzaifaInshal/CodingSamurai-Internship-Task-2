const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/userController')
const {authenticate} = require('../middlewares/authentication')

router.post('/signup',registerUser)
router.post('/login',loginUser)

module.exports = router