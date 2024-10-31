import { api } from './api'

export const webRTC = api.injectEndpoints({
    endpoints: (build) => ({
        videoCall: build.mutation({
            query (body) {
                return {
                    url: `/${body.from}/conversations/${body.to}/video-call`,
                    method: 'POST',
                    body
                }
            }
        }),

        callEnded: build.mutation({
            query (body) {
                return {
                    url: `/${body.from}/conversations/${body.conversation}/end-video-call`,
                    method: 'POST',
                    body
                }
            }
        }),

        callNotResponded: build.mutation({
            query (body) {
                return {
                    url: `/${body.from}/conversations/${body.conversation}/call-not-responded`,
                    method: 'POST',
                    body
                }
            }
        }),

        callAccepted: build.mutation({
            query (body) {
                return {
                    url: `/${body.from}/conversations/${body.conversation}/video-call-accepted`,
                    method: 'POST',
                    body
                }
            }
        })
    })
})

export const {
    useVideoCallMutation,
    useCallEndedMutation,
    useCallNotRespondedMutation,
    useCallAcceptedMutation,
} = webRTC