import React from 'react';

function ListCell(props) {
  const doneIcon = "./assets/img/svg/done.svg"
  const warningIcon = "./assets/img/svg/warning.svg"

  return (
    <tr style={cellStyle}>
        <td width="30%">
            <img src={props.icon} style={iconStyle} alt="service-icon"/>
        </td>
        <td width="60%">
            <div style={nameStyle}>{props.serviceName}</div>
            <div style={ethStyle}>{props.eth} ETH</div>
        </td>
        <td style={textStyle} width="10%">
            {props.percentage === 100?
                <div>
                    <span style={doneStyle}>{props.percentage}% </span>
                    <img src={doneIcon} style={percentageIconStyle} alt="done-icon" />
                </div>
            :
            props.percentage <= 20 ?
                <div>
                    <span style={warningStyle}>{props.percentage}% </span>
                    <img src={warningIcon} style={percentageIconStyle} alt="done-icon" />
                </div>
            :
            <div>
                <span style={okStyle}>{props.percentage}% </span>
            </div>
            }
        </td>
    </tr>
  );
}

const cellStyle = {
    marginBottom: '20px'
}

const iconStyle = {
    maxWidth: '50px'
}

const textStyle = {
    fontSize: '18px',
    fontWeight: 'bold'

}

const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold'
}

const ethStyle = {
    fontSize: '14px'
}

const percentageIconStyle = {
    width: '16px',
    height: '16px',
    marginBottom: '3px',
    marginLeft: '1px'
}

const doneStyle = {
    color: '#05B169',
}

const okStyle = {
    color: '#FFC657',
}

const warningStyle = {
    color: '#DF5F67',
}

export default ListCell;
