import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import { authApi } from '../services/authApi'
import { eventsApi } from '../services/eventsApi'
import { postsApi } from '../services/postsApi'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            eventsApi.middleware,
            postsApi.middleware
        ),
})

export default store
