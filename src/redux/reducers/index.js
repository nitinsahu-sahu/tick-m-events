import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth.reducer'
import eventReducer from './event.reducer'
import promotionReducer from './promotion.reducer'
import profileServiceReducer from './profile-service.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
    promotionList: promotionReducer,
    profile: profileServiceReducer,
})

export default rootReducer