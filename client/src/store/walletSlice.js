import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    walletAddress: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload;
        },
        clearWalletAddress: (state) => {
            state.walletAddress = null;
        },
    },
});

export const { setWalletAddress, clearWalletAddress } = walletSlice.actions;

export default walletSlice.reducer;

