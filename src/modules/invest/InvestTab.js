import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'
import AccountInfo from './AccountInfo'

function InvestTab(props) {
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const buttonOnclick = () => {
        setButtonDisabled(true)
    }

    return (
        <div>
            <AccountInfo account={props.account} />
            <div className="form-group" style={formStyle}>
                <input className="form-control" type="text" placeholder="Enter ETH amount"></input>
            </div>
            <div style={explaninationStyle}>
                Investing in the insurance pool is not risk free.
            </div>
            <Link to="/learn-more" style={linkStyle}>Learn more.</Link>
            <div className="center col-md-10">
                <Button disabled={buttonDisabled} title="Invest" onClick={buttonOnclick} />
            </div>
        </div>
    );
}

const formStyle = {
    marginTop: '20px',
    marginBottom: '40px'
}

const explaninationStyle = {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.5)',
    lineHeight: '1'
}

const linkStyle = {
    fontSize: '12px',
    lineHeight: '1'
}

export default InvestTab;