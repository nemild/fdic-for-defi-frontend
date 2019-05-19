import React from 'react'

function AccountInfo(props) {
    const line = (label, amount) => {
        return (
            <div className="row" style={textStyle}>
                <div style={colStyle}>{label}</div>
                <div className="text-right" style={colStyle}><span style={amountStyle}>{amount}</span> ETH</div>
            </div>
        )
    }

    return (
        <div>
            {line("Amount invested", props.account["invested"])}
            {line("Interest earned", props.account["interest"])}
            {line("Total balance", props.account["invested"] + props.account["interest"])}
        </div>
    );
}

const colStyle = {
    flexBasis: 0,
    flexGrow: 1
}

const textStyle = {
    fontSize: '16px',
    marginBottom: '10px',
    color: 'black',
    marginLeft: '0px',
    marginRight: '0px'
}

const amountStyle = {
    fontWeight: 'bold'
}

export default AccountInfo;