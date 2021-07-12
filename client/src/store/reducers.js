import { combineReducers } from 'redux';
import landlordReducer from './reducers/landlordReducer';
import propertyReducer from './reducers/propertyReducer';
import userReducer from './reducers/userReducer';

// define reducers for redux to use
const reducers = combineReducers ({
    user: userReducer,
    properties: propertyReducer,
    landlord: landlordReducer
});

export default reducers;