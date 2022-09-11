import {createSlice} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const persistConfig = {
    key: "triggersOnlyAlerted", // key for localStorage key, will be: "persist:form"
    storage,
    version: 1,
    debug: true,
}

const triggersOnlyAlertedSlice = createSlice({
    name: 'triggersOnlyAlerted',
    initialState: {
        value: true,
    },
    reducers: {
        setTriggersOnlyAlerted: (state, action) => {
            state.value = action.payload
        },
        resetTriggersOnlyAlerted: (state) => {
            state.value = true
        },
    },
})

export const triggerOnlyAlertedReducer = persistReducer(persistConfig, triggersOnlyAlertedSlice.reducer)

// Action creators are generated for each case reducer function
export const {setTriggersOnlyAlerted, resetTriggersOnlyAlerted} = triggersOnlyAlertedSlice.actions
