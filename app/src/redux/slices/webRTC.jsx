import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    callStatus: 'Calling...',
    answer: null,
    remoteOffer: null,
    remoteSocketId: null,
    callingUser: null,
    conversation: null,
    callingData: {}
};

const webRTC = createSlice({
    name: 'webRTC',
    initialState,
    reducers: {
        remoteOffer: (state, action) => {
            state.remoteOffer = action.payload;
        },

        answer: (state, action) => {
            state.answer = action.payload
        },

        setRemoteSocketId: (state, action) => {
            state.remoteSocketId = action.payload
        },

        setCallStatus: (state, action) => {
            state.callStatus = action.payload
        },

        setCallingUser: (state, action) => {
            state.callingUser = action.payload
        },

        setConversation: (state, action) => {
            state.conversation = action.payload
        },

        setCallingData: (state, action) => {
            state.callingData = action.payload
        }
    },
})

export const {
    remoteOffer,
    answer,
    setRemoteSocketId,
    setCallStatus,
    setCallingUser,
    setConversation,
    setCallingData
} = webRTC.actions;

export default webRTC.reducer;