import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Button from '../shared/Button'
import PageCard from '../components/PageCard'

function InvestNew(props) {
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const buttonOnclick = () => {
        setButtonDisabled(true)
    }

    const header = (
        <div>
            <div style={titleStyle}>
                Invest
            </div>
            <div style={subtitleStyle}>
                Invest in the insurance pool.
            </div>
        </div>
    )

    const body = (
        <div>
            <div className="form-group" style={formStyle}>
                <input className="form-control" type="text" placeholder="Enter ETH amount"></input>
            </div>
            <div style={explaninationStyle}>
                Investing in the insurance pool is not risk free.
            </div>
            <Link to="/learn-more" style={linkStyle}>Learn more.</Link>
            <Button disabled={buttonDisabled} title="Invest" onClick={buttonOnclick}/>
        </div>
    )

    return (
        <PageCard
            header={header}
            body={body}
        />
    );
}

const titleStyle = {
    fontSize: '32px',
    color: '#000000'
}

const subtitleStyle = {
    fontSize: '16px',
    color: '#000000'
}

const formStyle = {
    marginTop: '12px',
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

export default InvestNew;