import { combineReducers } from 'redux';
import AuthReducer from './reducers/authReducer/AuthReducer';
import FilmsReducer from './reducers/filmsReducer/FilmsReducer';

export default combineReducers({
    auth: AuthReducer,
    data: FilmsReducer
})