import { api } from './api'

export const webRTC = api.injectEndpoints({
    endpoints: (build) => ({
        videoCall: build.mutation({
            query (body) {
                return {
                    url: `/${body.from}/conversations/${body.to}/call`,
                    method: 'POST',
                    body
                }
            }
        }),
    })
})

export const { useVideoCallMutation } = webRTC