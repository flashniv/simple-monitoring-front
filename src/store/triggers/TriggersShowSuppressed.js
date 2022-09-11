import {createSlice} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const persistConfig = {
    key: "triggersShowSuppressed", // key for localStorage key, will be: "persist:form"
    storage,
    version: 1,
    debug: true,
}

const triggersShowSuppressedSlice = createSlice({
    name: 'triggersShowSuppressed',
    initialState: {
        value: false,
    },
    reducers: {
        setTriggersShowSuppressed: (state, action) => {
            state.value = action.payload
        },
        resetTriggersShowSuppressed: (state) => {
            state.value = true
        },
    },
})

export const triggerShowSuppressedReducer = persistReducer(persistConfig, triggersShowSuppressedSlice.reducer)

// Action creators are generated for each case reducer function
export const {setTriggersShowSuppressed, resetTriggersShowSuppressed} = triggersShowSuppressedSlice.actions
