const express = require('express')
const router = express.Router()
const AuthController = require('./controllers/AuthController')
const CallConversationUser = require('./actions/conversation/CallConversationUser')
const CreateConversation = require('./actions/conversation/CreateConversation')
const CreateMessage = require('./actions/conversation/CreateMessage')
const ConversationController = require('./controllers/conversation/ConversationController')
const Login = require('./actions/auth/Login')
const MessageController = require('./controllers/conversation/MessageController')
const Register = require('./actions/auth/Register')
const UserController = require('./controllers/UserController')
const authMiddleware = require('./middlewares/EnsureAuthenticated')
const VideoCallingController = require('./controllers/conversation/VideoCallingController')

router.post('/register', [Register.validator()], AuthController.register)
router.post('/login', [Login.validator()], AuthController.login)

router.get('/:user/conversations', authMiddleware.authenticated, ConversationController.index)
router.post('/:user/conversations/create', [authMiddleware.authenticated, CreateConversation.validate()], ConversationController.create)
router.get('/:user/conversations/:conversation/messages', authMiddleware.authenticated, MessageController.index)
router.post('/:user/conversations/:conversation/messages/create', [authMiddleware.authenticated, CreateMessage.validate()], MessageController.create)

router.post('/:user/conversations/:conversation/video-call', [authMiddleware.authenticated, CallConversationUser.validate()], ConversationController.call)
router.post('/:user/conversations/:conversation/end-video-call', [authMiddleware.authenticated, CallConversationUser.validate()], VideoCallingController.endCall)
router.post('/:user/conversations/:conversation/video-call-accepted', [authMiddleware.authenticated, CallConversationUser.validate()], VideoCallingController.acceptCall)
router.post('/:user/conversations/:conversation/call-not-responded', [authMiddleware.authenticated, CallConversationUser.validate()], VideoCallingController.callNotResponded)
router.post('/:user/conversations/:conversation/negotiation-needed', [authMiddleware.authenticated, CallConversationUser.validate()], VideoCallingController.negotiationNeeded)
router.post('/:user/conversations/:conversation/negotiation-done', [authMiddleware.authenticated, CallConversationUser.validate()], VideoCallingController.negotiationDone)

router.get('/users/search', authMiddleware.authenticated, UserController.search)
router.get('/users/search/conversation', authMiddleware.authenticated, UserController.conversation)

module.exports = router