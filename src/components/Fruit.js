import React from 'react';

const Fruit = (props) => {
    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }

    return (
        <div className="fruit" style={style}></div>
    );
};

export default Fruit;
