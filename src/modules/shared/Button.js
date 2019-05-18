import React from 'react';

// To use:       <Button title="hello" onClick={(e) => { }} />

function Button(props) {
    return (
        <div>
            <div onClick={props.onClick} className="btn btn-primary rounded-pill btn-icon mt-4 defi-button" style={customStyle}>
                <span className="btn-inner--text">{props.title}</span>
              </div>
        </div>
    );
}

const customStyle = {
    minWidth: '250px'
};

export default Button;