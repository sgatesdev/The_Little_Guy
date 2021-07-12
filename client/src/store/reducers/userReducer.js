/** user reducer **/
import { LOG_IN, LOG_OUT } from "../actions";

const userReducer = (state = null, action) => {
    switch(action.type) {
        case LOG_IN:
            return { ...state, ...action.payload };
        case LOG_OUT: 
            return null;
        default:
            return state;
    }
}

export default userReducer;