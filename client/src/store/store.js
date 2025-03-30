import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage for web
import walletReducer from './walletSlice'; // Import your wallet slice

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers (if you have more slices in the future)
const rootReducer = combineReducers({
  wallet: walletReducer, // Add your persisted wallet reducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevent warnings from redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
