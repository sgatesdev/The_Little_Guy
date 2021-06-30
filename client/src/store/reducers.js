/**
 * TODO: write reducers for properties, decide whether userdata should be kept here in global state
 */

import {
    ADD_PROPERTY,
    UPDATE_PROPERTY,
    UPDATE_PROPERTIES,
    REMOVE_PROPERTY,
    UPDATE_USER,
    LOG_IN,
    LOG_OUT
} from './actions';

const initialState = {
    properties: [],
    user: null
};

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PROPERTIES: 
            return { ...state, 
                properties: [ ...action.payload ] };
        case LOG_IN:
            return { ...state, 
                user: { ...action.payload }
            };
        case LOG_OUT: 
            return { ...state, user: null };
        default: 
            return state;
    }
};

/**
 * 
 * Thought process:
 * 1. user logs in, dispatch sends to redux store. We need access to user info throughout app (isLoggedIn, username, etc.)
 * 2. Redux action also sets localstorage
 * 3. Put auto-login code in header to detect if localstorage token exists on load, if it does, log user in and send info to state
 * 4. redux actions, use thunk to do graphql requests
 */