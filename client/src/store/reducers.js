import { combineReducers } from 'redux';

// bring in reducer files to combine
import landlordReducer from './reducers/landlordReducer';
import propertyReducer from './reducers/propertyReducer';
import userReducer from './reducers/userReducer';
import applicationReducer from './reducers/applicationReducer';

// define reducers for redux to use
const reducers = combineReducers ({
    user: userReducer,
    properties: propertyReducer,
    landlord: landlordReducer,
    applications: applicationReducer
});

export default reducers;