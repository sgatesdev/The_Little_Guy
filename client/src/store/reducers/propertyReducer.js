/** ALL properties reducer */
// post reducer
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
            return state; // TODO
        case DELETE_PROPERTY:
            return state; // TODO
        case ADD_PROPERTY:
            return state; // TODO
        default: 
            return state;
    }
};

export default propertyReducer;

// foregoing edit functions for now, because i will just force a re-fetch if landlord updates any properties (to save time)
// if i have time, i will add in actions for editing all properties so that they re-render without a hard refresh