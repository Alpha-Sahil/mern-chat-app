import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000', credentials: 'include', headers: { 'Content-Type': 'application/json'},}),
    tagTypes: ['user'],
    endpoints: (build) => ({
        users: build.query({
            query(body) {
                return {
                    url: '/users',
                    method: 'GET',
                }
            },
        }),

        searchUsers: build.query({
            query(text) {
                return {
                    url: '/users/search',
                    method: 'GET',
                    params: { text }
                }
            },
        }),

        userConversations: build.query({
            query(user) {
                return {
                    url: `/users/${user}/conversations`,
                    method: 'GET',
                }
            },
        }),
    }),
})

export const {
    useUsersQuery,
    useSearchUsersQuery,
    useUserConversationsQuery,
} = userApi