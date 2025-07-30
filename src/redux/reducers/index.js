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
import fetchMessagesReducers from './message.reducer'
import { paymentSettingsReducer } from './payment-setting.reducer';
import { adminVerificationListReducer } from './verificationReducers'
import { userReducer } from './userReducer';
import editEventReducer from './editEventReducer'
import homeAndGlobalReducer from './homeAndGlobal.reducer'
import {notificationReducer} from './notification.reducer';

const rootReducer = combineReducers({
    notification: notificationReducer,
    homeAndGlobal: homeAndGlobalReducer,
    editEvent: editEventReducer,
    adminVerificationList: adminVerificationListReducer,
    paymentSettings: paymentSettingsReducer,
    allMessages: fetchMessagesReducers,
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
    serviceRequest: eventServiceReqReducer,
    user: userReducer,
})

export default rootReducer