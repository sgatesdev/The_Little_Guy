/** ALL PROPERTIES reducer functions */

import _ from 'lodash';

import {
    FETCH_ALL_PROPERTIES,
    EDIT_PROPERTY,
    DELETE_PROPERTY,
    ADD_PROPERTY
} from '../actions';


const propertyReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_ALL_PROPERTIES: 
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case EDIT_PROPERTY:
            return { ...state, [action.payload._id]: action.payload }
        case DELETE_PROPERTY:
            return _.omit(...state, action.payload);
        case ADD_PROPERTY:
            return { ...state, [action.payload._id]: action.payload };
        default: 
            return state;
    }
};

export default propertyReducer;