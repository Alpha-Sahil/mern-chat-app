const express = require('express')
const { register, login } = require('../controllers/AuthController')
const InboxController = require('../controllers/InboxController')
const Authentication = require('../middlewares/Authenticated')
const DmUserController = require('../controllers/DmUserController')
const SearchController = require('../controllers/SearchController')
const { route } = require('..')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.post('/inboxes/create', Authentication.authenticate, InboxController.create)

router.get('/dm/users', Authentication.authenticate, DmUserController.users)
router.post('/dm/users/:id/messages', Authentication.authenticate, DmUserController.messages)
router.post('/dm/users/:id/messages/create', Authentication.authenticate, DmUserController.create)

router.get('/dm/search/users', SearchController.search)

module.exports = router;