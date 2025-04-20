import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth.reducer'
import eventReducer from './event.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
})

export default rootReducer