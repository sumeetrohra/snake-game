import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { signIn } from '../../actions';


const Login = (props) => {
    console.log(props);
    return (
        <div className='login-button-center'>
            <h2>Welcome to Snake Game<br />Please Login to Continue</h2>
            <Button color='google plus' size='huge' onClick={() => props.signIn()}>
                <Icon name='google' /> Login With Google
            </Button>
        </div>
    );
}

const mapStateToProps = ({ auth }) => {
    return { uid: auth.uid };
}

export default connect(mapStateToProps, { signIn })(Login);
