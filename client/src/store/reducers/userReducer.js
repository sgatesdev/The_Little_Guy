/** USER REDUCER functions **/

import { 
    LOG_IN, 
    LOG_OUT, 
    UPDATE_USER 
} from "../actions";

const userReducer = (state = null, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return { ...state, ...action.payload }; 
        case LOG_IN:
            return { ...state, ...action.payload };
        case LOG_OUT: 
            return null;
        default:
            return state;
    }
}

export default userReducer;