import React from 'react';

function LineItemCell(props) {
    const { title, value } = props
    const { primary, secondary, color } = value

    var secondaryRow
    if (secondary) {
        secondaryRow = (
            <div className="row">
                <div className="flex-fill" style={secondaryStyle(color)}>{secondary}</div>
            </div>
        )
    }

    return (
        <div>
            <div className="row">
                <div className="flex-fill" style={primaryTitleStyle}>{title}</div>
                <div className="flex-fill" style={primaryValueStyle}>{primary}</div>
            </div>
            {secondaryRow}
        </div>
    )
}

export default LineItemCell

var primaryTitleStyle = {
    color: "black",
    textAlign: "left",
    fontSize: "12px"
}

var primaryValueStyle = {
    color: "black",
    textAlign: "right",
    fontSize: "16px",
    fontWeight: "bold",
}

function secondaryStyle(color) {
    return {
        color: color,
        textAlign: "right",
    }
}