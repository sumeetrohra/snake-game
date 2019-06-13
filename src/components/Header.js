import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { signOut } from '../actions';
import history from './history';

class Header extends React.Component {
    render() {
        // use this condition for going to login page if not logged in
        // if (!this.props.name) {
        //     history.push('/');
        // }
        return (
            <Menu inverted>
                <Menu.Item name='Game' as={Link} to='/game' />
                <Menu.Item name='Leader Board' as={Link} to='/best-scores' />
                <Menu.Item name='My Scores' as={Link} to='/personal-scores' />
                <Menu.Menu position='right'>
                    <Menu.Item name={this.props.name} />
                    <Menu.Item>
                        <Button color='red' onClick={() => this.props.signOut()} >Logout</Button>
                    </Menu.Item>
                    
                </Menu.Menu>
            </Menu>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { name: auth.name };
}

export default connect(mapStateToProps, { signOut })(Header);
