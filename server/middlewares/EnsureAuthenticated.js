const JWT = require('../utils/jwt')

const authenticated = async (request, response, next) => {
    const token = request.cookies.token

    if (!token) return sendResponse(response)

    let user = await JWT.verify(token)

    if (user === false) return sendResponse(response)
    
    else request.user = user

    next()
}

const sendResponse = (response) => {
    return response.status(403).json({ status: false, message: 'Unauthenticated' })
}

module.exports = { authenticated }