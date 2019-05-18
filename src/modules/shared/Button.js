import React from 'react';

// To use:       <Button title="hello" onClick={(e) => { }} />



function Button(props) {
    var colors = {};
    var disabledStyle = {};

    if (props.disabled) {
        disabledStyle = {
            cursor: "auto",
            opacity: 0.5
        }
    }

    if (props.invertColors) {
        colors = {
            backgroundColor: '#ffffff',
            color: '#05b169'
        }
    };


    return (
        <div>
            <div onClick={props.onClick} className="btn btn-primary rounded-pill btn-icon mt-4 defi-button" style={{...customStyle, ...colors, ...disabledStyle }}>
                <span className="btn-inner--text">{props.title}</span>
              </div>
        </div>
    );
}

const customStyle = {
    minWidth: '250px'
};

export default Button;