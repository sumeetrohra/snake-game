import firebase from 'firebase/app';
import 'firebase/auth';
import history from '../components/history';

import {
    SIGN_IN,
    SIGN_OUT
} from './types';

const _handleSignIn = (dispatch, details) => {
    dispatch({
        type: SIGN_IN,
        payload: details
    });
        history.push('/game');
};

const _handleSignOut = (dispatch) => {
    dispatch({
        type: SIGN_OUT
    });
    history.push('/');
};

export const signIn = () => async dispatch => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
        const uid = result.user.uid
        const displayName = result.user.displayName;
        _handleSignIn(dispatch, { uid, displayName });
    })
    .catch(err => console.log(err));
}

export const signOut = () => async dispatch => {
    firebase.auth().signOut()
    .then(() => {
        _handleSignOut(dispatch);
    })
    .catch((err) => {
        _handleSignOut(dispatch);
        console.log(err);
    });
};