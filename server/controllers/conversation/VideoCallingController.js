const Socket = require('../../Sockets2')
const { validationResult } = require('express-validator');

class VideoCallingController {
    async call (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        Socket.callConversationUser(request.body)

        response.json({
            status: 'success',
            message: 'Call Initiated Successfully'
        })
    }

    async endCall (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        Socket.endCall(request.body)

        response.json({
            status: 'success',
            message: 'Call Ended Successfully'
        })
    }

    async acceptCall (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        Socket.callAccepted(request.body)

        response.json({
            status: 'success',
            message: 'Call Accepted Successfully'
        })
    }

    async callNotResponded (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        Socket.callNotResponded(request.body)

        response.json({
            status: 'success',
            message: 'Call not responded'
        })
    }

    async negotiationNeeded (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        Socket.negotiationNeeded(request.body)

        response.json({
            status: 'success',
            message: 'Negotiation Needed'
        }) 
    }

    async negotiationDone (request, response) {
        const result = validationResult(request);
        
        if (!result.isEmpty()) return response.json({ errors: result.array() });

        Socket.endCall(request.body)

        response.json({
            status: 'success',
            message: 'Negotiation Needed'
        }) 
    }
}

module.exports = new VideoCallingController()