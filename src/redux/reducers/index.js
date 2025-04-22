import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth.reducer'
import eventReducer from './event.reducer'
import promotionReducer from './promotion.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
    promotionList: promotionReducer,
})

export default rootReducer