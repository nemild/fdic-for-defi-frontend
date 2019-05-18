import React from 'react';

function ListCell(props) {
  return (
    <tr>
        <td>
            <img src={props.icon} style={iconStyle} alt="service-icon"/>
        </td>
        <td>
            <div>{props.serviceName}</div>
            <div>{props.eth}</div>
        </td>
        <td>
            <div>{props.percentage}</div>
        </td>
    </tr>
  );
}

const iconStyle = {
    width: '48px',
    height: '48px'
}

export default ListCell;
