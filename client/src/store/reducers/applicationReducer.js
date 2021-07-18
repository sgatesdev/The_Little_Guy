/** APPLICATION reducer functions */

import _ from 'lodash';

import {
    FETCH_APPLICATIONS,
    EDIT_APPLICATIONS,
} from '../actions';

const applicationReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_APPLICATIONS: 
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case EDIT_APPLICATIONS:
            let currentValues = state[action.payload._id];
            let updatedValues = { ...currentValues, ...action.payload };

            return { ...state, [action.payload._id]: updatedValues };
        default: 
            return state;
    }
};

export default applicationReducer;