import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        "cart": cartReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch