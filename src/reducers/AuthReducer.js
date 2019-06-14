import {
    SIGN_IN,
    SIGN_OUT
} from '../actions/types';

// using these for now, make them null later
const INITIAL_STATE = {
    uid: '4QYP9JcsTJOG6HqMM1tW7BOicYi2',
    name: 'Sumeet Rohra' 
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