import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    loading: false
}

export const searchUsers = createAsyncThunk(
    'users/search',
    async (text) => {
        let response = await axios.get('http://localhost:3000/users/search', {
            withCredentials: true,
            params: { text: text }
        })

        return response.data.users
    }
)

export const searchUserConversation = async (body) => {
    let response = await axios.get('http://localhost:3000/users/search/conversation', {
        withCredentials: true,
        params: { conversationUser: body.conversationUser }
    })

    return response.data.conversation
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        emptySearchedUsers: (state, action) => {
            state.users = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchUsers.pending, (state, action) => {
            state.loading = true
        }),

        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false
        })
    }

})

export const { emptySearchedUsers } = userSlice.actions;

export default userSlice.reducer

