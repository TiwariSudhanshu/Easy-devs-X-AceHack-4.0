import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './walletSlice'; // Import your wallet slice reducer
const store = configureStore({
    reducer: {
        wallet: walletReducer, // Add your wallet slice reducer here
    }
});

export default store;