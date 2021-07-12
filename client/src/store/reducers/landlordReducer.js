/** LANDLORD functions - CRUD for properties */

import {
    FETCH_MY_PROPERTIES,
    ADD_MY_PROPERTY,
    EDIT_MY_PROPERTY,
    DELETE_MY_PROPERTY
} from '../actions';

const propertyReducer = (state = [], action) => {
    switch(action.type) {
        case FETCH_MY_PROPERTIES: 
            return { ...state, my_properties: [ ...action.payload ] };
        case ADD_MY_PROPERTY:
            return state; // TODO
        case EDIT_MY_PROPERTY:
            return state; // TODO
        case DELETE_MY_PROPERTY:
            return state; // TODO
        default: 
            return state;
    }
};

export default propertyReducer;