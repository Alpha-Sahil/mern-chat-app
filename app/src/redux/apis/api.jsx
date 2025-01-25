import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: 'include',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
    }),
    endpoints: () => ({}),
})