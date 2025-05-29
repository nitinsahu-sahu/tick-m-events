import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth.reducer'
import eventReducer from './event.reducer'
import promotionReducer from './promotion.reducer'
import profileServiceReducer from './profile-service.reducer'
import eventOrderReducer from './eventOrder.reducer'
import searchSelectReducer from './searchSelect.reducer'
import eventCategoryReducer from './category.reducer'
import homeAndRecommandationReducer from './home-recommedation.reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
    promotionList: promotionReducer,
    profile: profileServiceReducer,
    order: eventOrderReducer,
    providers: searchSelectReducer,
    eventCategories: eventCategoryReducer,
    homeRecom: homeAndRecommandationReducer,
})

export default rootReducer