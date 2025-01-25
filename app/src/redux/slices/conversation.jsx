import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentConversation: window.location.pathname.split('/').at(-2),
    currentConversationUser: {},
    conversationMessages: [],
    fetchingConversationMessages: false,
};

export const conversationMessages = createAsyncThunk(
    'users/conversation/messages',
    async ({user, conversation}) => {
        if (!conversation) return []

        let response = await axios.get(`http://localhost:3000/${user}/conversations/${conversation}/messages`, {
            withCredentials: true,
        })

        return response.data.messages
    }
)

const conversation = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },

        setCurrentConversationUser: (state, action) => {
            state.currentConversationUser = action.payload
        },

        addToConversationMessages: (state, action) => {
            state.conversationMessages.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(conversationMessages.pending, (state, action) => {
            state.fetchingConversationMessages = true
        }),

        builder.addCase(conversationMessages.fulfilled, (state, action) => {
            state.fetchingConversationMessages = false
            state.conversationMessages = action.payload
        })
    }
})

export const { setCurrentConversation, setCurrentConversationUser, addToConversationMessages } = conversation.actions;

export default conversation.reducer;