import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ActiveHeader from './ActiveHeader';
import GameStatusReducer from './GameStatusReducer';

export default combineReducers({
    auth: AuthReducer,
    header: ActiveHeader,
    status: GameStatusReducer
});