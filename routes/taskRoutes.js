const express = require('express')
const router = express.Router()
const {viewTaks, addTaks, updateTaks, deleteTaks, markTaks} = require('../controllers/taskController')
const {authenticate} = require('../middlewares/authentication')

router.route('/').get(authenticate,viewTaks).post(authenticate,addTaks)
router.route('/:id').put(authenticate,updateTaks).delete(authenticate,deleteTaks)
router.route('/mark/:id').put(authenticate,markTaks)

module.exports = router