import authSlice from './slices/auth'
import conversationSlice from './slices/conversation'
import userSlice from './slices/users'
import webRTCSlice from './slices/webRTC'
import { authApi } from './apis/auth'
import { combineReducers } from '@reduxjs/toolkit';
import { conversationApi } from './apis/conversation';
import { userApi } from './apis/users'

const rootReducer = combineReducers({
    auth: authSlice,
    users: userSlice,
    conversation: conversationSlice,
    webRTC: webRTCSlice,
    [authApi.reducerPath]: authApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
