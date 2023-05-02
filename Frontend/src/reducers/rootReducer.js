import { combineReducers } from 'redux';
import settings from './settings';
import userReducer from './userReducer';
import agencyReducer from './adminReducer';


// const initialState = {
//     userReducer: {
//         userInfo: localStorage.getItem('userInfo') ? JSON.stringify(localStorage.getItem('userInfo')) : null
//     }
// }

export default combineReducers({
    settings,
    userReducer,    
    agencyReducer,

});