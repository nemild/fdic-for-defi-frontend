import { Link } from 'react-router-dom'
import React from 'react';

function ListCell(props) {
  const doneIcon = "./assets/img/svg/done.svg"
  const warningIcon = "./assets/img/svg/warning.svg"

  const urlFriendly = props.serviceName.toLowerCase().replace(/ /gi, '-');

  return (
    <tr style={cellStyle}>
        <td width="30%">
            <Link to={"/service-detail/" + urlFriendly}>
                <img src={props.icon} style={iconStyle} alt="service-icon"/>
            </Link>
        </td>
        <td width="60%">

        <Link to={"/service-detail/" + urlFriendly}><div style={nameStyle}>{props.servicePrettyName}</div></Link>
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
    fontWeight: 'bold',
    textAlign: "right"
}

const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: "16px"
}

const ethStyle = {
    fontSize: '14px',
    paddingLeft: "16px"
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
