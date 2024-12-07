import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./UserSlices.js";

// Persist configuration
const persistConfig = {
    key: "root", // Key to identify the persisted state in storage
    storage, // Use localStorage for persistence
  };

// Wrap user reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Middleware configuration to ignore non-serializable checks
const ignoredActions = [
    "persist/PERSIST",
    "persist/REHYDRATE",
    "persist/FLUSH",
    "persist/PAUSE",
    "persist/PURGE",
    "persist/REGISTER",
  ];

const store = configureStore({
  reducer: {
    user: persistedReducer, // Replace with persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions, // Ignore specific redux-persist actions
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;