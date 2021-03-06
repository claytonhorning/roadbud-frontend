import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { locationSlice } from './locationSlice'
import { directionsSlice } from './directionsSlice'
import { cdotApi } from '../services/cdotApi'
import { roadbudApi } from '../services/roadbudApi'

const store = configureStore({
    reducer: {
        [roadbudApi.reducerPath]: roadbudApi.reducer,
        [cdotApi.reducerPath]: cdotApi.reducer,
        auth: authSlice.reducer,
        directions: directionsSlice.reducer,
        location: locationSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            roadbudApi.middleware,
            cdotApi.middleware
        ),
})

export default store
