const express = require('express')
const router = express.Router()
const { register } = require('../controllers/AuthController')

router.get('/', (request, response) => {
    console.log(1)
})

router.post('/register', register)

module.exports = router;