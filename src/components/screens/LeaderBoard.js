import React from 'react';

import Header from '../Header';

class LeaderBoard extends React.Component {
    render() {
        console.log(this.props.match.path);
        return (
            <div>
                <Header />
                LeaderBoard
                </div>
        );
    }
}

export default LeaderBoard;