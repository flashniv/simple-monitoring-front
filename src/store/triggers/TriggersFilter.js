import {createSlice} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const persistConfig = {
    key: "triggersFilter", // key for localStorage key, will be: "persist:form"
    storage,
    version: 1,
    debug: true,
}

const triggersFilterSlice = createSlice({
    name: 'triggersFilter',
    initialState: {
        value: "",
    },
    reducers: {
        setTriggersFilter: (state, action) => {
            state.value = action.payload
        },
        resetTriggersFilter: (state) => {
            state.value = ""
        },
    },
})

export const triggerFilterReducer = persistReducer(persistConfig, triggersFilterSlice.reducer)

// Action creators are generated for each case reducer function
export const {setTriggersFilter, resetTriggersFilter} = triggersFilterSlice.actions
