import { configureStore } from '@reduxjs/toolkit'
import walletSlice from './slice/wallet/walletSlice'
import update from './slice/update'


export const store = configureStore({
    reducer: {
        wallet: walletSlice,
        update:update
    },
})