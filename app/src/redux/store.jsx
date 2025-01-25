import reducers from './reducers'
import { authApi } from './apis/auth'
import { configureStore } from "@reduxjs/toolkit";
import { conversationApi } from './apis/conversation';
import { userApi } from './apis/users'

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
                                                                .concat(conversationApi.middleware)
                                                                .concat(userApi.middleware),
});

export default store;