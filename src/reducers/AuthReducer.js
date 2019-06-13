import {
    SIGN_IN,
    SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {
    uid: null,
    name: null 
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, uid: action.payload.uid, name: action.payload.displayName };

        case SIGN_OUT: 
            return { ...state, ...INITIAL_STATE };

        default:
            return state;
    }
}