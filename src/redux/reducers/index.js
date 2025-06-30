import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth.reducer'
import eventReducer from './event.reducer'
import promotionReducer from './promotion.reducer'
import profileServiceReducer from './profile-service.reducer'
import eventOrderReducer from './eventOrder.reducer'
import searchSelectReducer from './searchSelect.reducer'
import homeAndRecommandationReducer from './home-recommedation.reducer'
import ticketTypeReducer from './ticket-reservation.reducer'
import transactionPaymentReducer from './transactionPayment.reducer'
import eventServiceReqReducer from './event-service-request.reducer'
import { activityReducer } from "./activity.reducer";
import reminderReducer from './reminder.reducer'
import serveiceRequestReducer from './serviceRequest.Reducer'

const rootReducer = combineReducers({
    serviceReqCategories: serveiceRequestReducer,
    reminder: reminderReducer,
    auth: authReducer,
    event: eventReducer,
    activities: activityReducer,
    promotionList: promotionReducer,
    profile: profileServiceReducer,
    order: eventOrderReducer,
    providers: searchSelectReducer,
    homeRecom: homeAndRecommandationReducer,
    ticketReservationMang: ticketTypeReducer,
    transactions: transactionPaymentReducer,
    serviceRequest: eventServiceReqReducer
})

export default rootReducer