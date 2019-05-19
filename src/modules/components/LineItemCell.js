import React from 'react';

function LineItemCell(props) {
    const { title, subtitle, value } = props
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
        <div style={cellStyle}>
            <div className="row">
                <div className="flex-fill">
                    <div style={primaryTitleStyle}>{title}</div>
                    {subtitle ? <div style={secondaryTitleStyle}>{subtitle}</div>: null}
                </div>
                <div className="flex-fill" style={primaryValueStyle}>{primary}</div>
            </div>
            {secondaryRow}
        </div>
    )
}

export default LineItemCell

var cellStyle = {
    paddingTop: "24px",
    paddingBottom: "24px"
}

var primaryTitleStyle = {
    color: "black",
    textAlign: "left",
    fontSize: "12px",
    marginBottom: "-6px"
}

var secondaryTitleStyle = {
    color: "#aaa",
    textAlign: "left",
    fontSize: "10px",
    marginBottom: "5px"
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