import { api } from './api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const conversationApi = createApi({
//     reducerPath: 'conversationApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000', credentials: "include", withCredentials: true,}),
//     tagTypes: ['conversation'],
//     endpoints: (build) => ({
//         conversations: build.query({
//             query (user) {
//                 return {
//                     url: `/${user}/conversations`,
//                     method: 'GET',
//                 }
//             },
//         }),

//         createConversation: build.mutation({
//             query (user, body) {
//                 return {
//                     url: `/${user}/conversations/create`,
//                     method: 'POST',
//                     body
//                 }
//             }
//         }),

//         conversationMessages: build.query({
//             query (user, conversation) {
//                 return {
//                     url: `${user}/conversations/${conversation}/messages`,
//                     method: 'GET',
//                     conversation
//                 }
//             },
//         }),

//         createConversationMessage: build.mutation({
//             query (user, body) {
//                 return {
//                     url: `${user}/conversations/messages/create`,
//                     method: 'POST',
//                     body,
//                 }
//             }
//         })
//     })
// })

export const conversationApi = api.injectEndpoints({
    endpoints: (build) => ({
        conversations: build.query({
            query (user) {
                return {
                    url: `/${user}/conversations`,
                    method: 'GET',
                }
            },
        }),

        createConversation: build.mutation({
            query ({user, body}) {
                return {
                    url: `/${user}/conversations/create`,
                    method: 'POST',
                    body
                }
            }
        }),

        conversationMessages: build.query({
            query (user, conversation) {
                return {
                    url: `${user}/conversations/${conversation}/messages`,
                    method: 'GET',
                    conversation
                }
            },
        }),

        createConversationMessage: build.mutation({
            query ({ user, conversation, body }) {
                return {
                    url: `${user}/conversations/${conversation}/messages/create`,
                    method: 'POST',
                    body,
                }
            }
        })
    })
})

export const {
    useConversationsQuery,
    useConversationMessagesQuery,
    useCreateConversationMessageMutation,
    useCreateConversationMutation
} = conversationApi