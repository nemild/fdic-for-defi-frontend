import React, {useState} from 'react'
import PageCard from '../components/PageCard'
import InvestTab from './InvestTab'
import WithdarwTab from './WithdrawTab'

function Invest(props) {
    // need to get those data
    let account = {
        "invested": 3.2,
        "interest": 2 // could be negative
    }

    const [tabSelected, setTabSelected] = useState('invest')

    const onInvest = () => {
        setTabSelected('invest')
    }

    const onWithdraw = () => {
        setTabSelected('withdraw')
    }

    const body = (
        <div>
            <ul className="invest-tabs nav nav-tabs">
                <li className="nav-item">
                    <div className={tabSelected === 'invest'? 'active' : ''} onClick={onInvest} style={tabStyle}>Invest</div>
                </li>
                <li className="nav-item">
                    <div className={tabSelected === 'withdraw'? 'active' : ''} onClick={onWithdraw} style={tabStyle}>Withdraw</div>
                </li>
            </ul>
            {tabSelected === 'invest'?
                <InvestTab account={account} />
            :
                <WithdarwTab account={account} />
            }
        </div>
    )

    return (
        <PageCard
            header=""
            body={body}
        />
    );
}

const tabStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
}

export default Invest;