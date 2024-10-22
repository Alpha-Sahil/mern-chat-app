const express = require('express')
const router = express.Router()
const AuthController = require('./controllers/AuthController')
const CallConversationUser = require('./actions/conversation/CallConversationUser')
const CreateConversation = require('./actions/conversation/CreateConversation')
const CreateMessage = require('./actions/conversation/CreateMessage')
const ConversationController = require('./controllers/ConversationController')
const MessageController = require('./controllers/MessageController')
const Login = require('./actions/auth/Login')
const Register = require('./actions/auth/Register')
const UserController = require('./controllers/UserController')
const authMiddleware = require('./middlewares/EnsureAuthenticated')

router.post('/register', [Register.validator()], AuthController.register)
router.post('/login', [Login.validator()], AuthController.login)

router.get('/:user/conversations', authMiddleware.authenticated, ConversationController.index)
router.post('/:user/conversations/create', [authMiddleware.authenticated, CreateConversation.validate()], ConversationController.create)
router.get('/:user/conversations/:conversation/messages', authMiddleware.authenticated, MessageController.index)
router.post('/:user/conversations/:conversation/messages/create', [authMiddleware.authenticated, CreateMessage.validate()], MessageController.create)

router.post('/:user/conversations/:conversation/call', [authMiddleware.authenticated, CallConversationUser.validate()], ConversationController.call)

router.get('/users/search', authMiddleware.authenticated, UserController.search)
router.get('/users/search/conversation', authMiddleware.authenticated, UserController.conversation)

module.exports = router