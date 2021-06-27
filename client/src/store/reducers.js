/**
 * TODO: write reducers for properties, decide whether userdata should be kept here in global state
 */

import {
    ADD_PROPERTY,
    UPDATE_PROPERTY,
    REMOVE_PROPERTY
} from './actions';

const initialState = {
    properties: null,
    user: null
};

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
};