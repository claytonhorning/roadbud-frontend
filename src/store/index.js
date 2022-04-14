import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { locationSlice } from './locationSlice'
import { authApi } from '../services/authApi'
import { eventsApi } from '../services/eventsApi'
import { postsApi } from '../services/postsApi'
import { cdotApi } from '../services/cdotApi'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [cdotApi.reducerPath]: cdotApi.reducer,
        auth: authSlice.reducer,
        location: locationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            eventsApi.middleware,
            postsApi.middleware,
            cdotApi.middleware
        ),
})

export default store
