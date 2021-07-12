/** LANDLORD functions - CRUD for properties */

import {
    FETCH_MY_PROPERTIES
} from '../actions';

const propertyReducer = (state = [], action) => {
    switch(action.type) {
        case FETCH_MY_PROPERTIES: 
            return { ...state, my_properties: [ ...action.payload ] };
        default: 
            return state;
    }
};

export default propertyReducer;