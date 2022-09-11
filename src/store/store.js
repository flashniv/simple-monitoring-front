import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {triggerFilterReducer} from "./triggers/TriggersFilter";
import {persistStore} from "redux-persist";
import thunk from "redux-thunk";
import {triggerOnlyAlertedReducer} from "./triggers/TriggersOnlyAlerted";
import {triggerShowSuppressedReducer} from "./triggers/TriggersShowSuppressed";

const reducers = combineReducers({
    triggersFilter:triggerFilterReducer,
    triggersOnlyAlerted:triggerOnlyAlertedReducer,
    triggersShowSuppressed:triggerShowSuppressedReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

export const persistor = persistStore(store)