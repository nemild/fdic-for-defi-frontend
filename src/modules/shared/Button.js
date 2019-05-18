import React from 'react';

// To use:       <Button title="hello" onClick={(e) => { }} />



function Button(props) {
    var colors = {};
    if (props.invertColors) {
        colors = {
            backgroundColor: '#ffffff',
            color: '#05b169'
        }
    };


    return (
        <div>
            <div onClick={props.onClick} className="btn btn-primary rounded-pill btn-icon mt-4 defi-button" style={{...customStyle, ...colors }}>
                <span className="btn-inner--text">{props.title}</span>
              </div>
        </div>
    );
}

const customStyle = {
    minWidth: '250px'
};

export default Button;