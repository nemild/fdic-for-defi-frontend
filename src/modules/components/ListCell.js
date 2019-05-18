import React from 'react';

function ListCell(props) {
  return (
    <tr style={cellStyle}>
        <td width="30%">
            <img src={props.icon} style={iconStyle} alt="service-icon"/>
        </td>
        <td style={textStyle}>
            <div>{props.serviceName}</div>
            <div>{props.eth} ETH</div>
        </td>
        <td width="20%">
            <span style={textStyle}>{props.percentage} </span>
            <img src={props.percentageIcon} style={percentageIconStyle} alt="done-icon" />
        </td>
    </tr>
  );
}

const cellStyle = {
    marginBottom: '20px'
}

const iconStyle = {
    width: '48px',
    height: '48px'
}

const textStyle = {
    color: 'black',
    fontSize: '16px'
}

const percentageIconStyle = {
    width: '16px',
    height: '16px'
}

export default ListCell;
