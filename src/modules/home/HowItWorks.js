import React from 'react';


function HowItWorks(props) {
    return (
        <div className="row">
            <div className="col-sm-12" style={howItWorksStyle}>
            <div className='text-center'>
                <h1 style={howItWorksStyle}>How it works</h1>
            </div>
                <p>defisurance makes it easy to get insurance for deposits in decentralized finance protocols. Now, your investments in popular projects like Compound, dYdX, and Dharma can be covered in the event of a hack.</p>        
                <p>defisurance works by letting you purchase Augur market bets that pay off if a decentralized finance contract is successfully hacked. These bets can then be sold to recover some or all of the balance you hold in the hacked decentralized protocol.</p>
                <p>Protocol developers can also use defisurance to directly cover some or all of their user's balances. defisurance makes it easy for protocols  to payout to their users automatically when a hack is detected.</p>
                <br />
                <p>To start:</p>
                <ol>
                    <li>Connect your Ethereum account to defisurance: We'll automatically let you know which Defi protocols you have balances in and what insurance is available</li>
                    <li>For all protocols with a balance, you can buy insurance to cover the risk of the protocol failing</li>
                </ol>
            </div>
        </div>
    );
}

const howItWorksStyle = {
    color: 'white'
};

export default HowItWorks;