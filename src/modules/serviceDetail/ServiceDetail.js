import Button from '../shared/Button'
import LineItemCell from '../components/LineItemCell'
import PageCard from '../components/PageCard';
import React from 'react'
import SimpleSlider from '../shared/SimpleSlider';

import * as CompoundAdapter from '../../lib/CompoundAdapter';

import GlobalContext from '../../GlobalContext';

const green = "#05B169";
const yellow = "#FFC657";
const red = "#DF5F67";


const shortNameLookup = {
    "0x": {
        name: '0x',
        logoPath: '/logos/0x-color.svg'
    },
    compound: {
        name: 'Compound',
        logoPath: '/logos/compound-color.png'
    },
    augur: {
        name: 'Augur',
        logoPath: '/logos/augur-color.svg'
    },
    dydx: {
        name: 'dYdX',
        logoPath: '/logos/dYdX-color.svg'
    },
    "cheese-wizard": {
        name: 'Cheese Wizard',
        logoPath: '/logos/cheesewizard-color.svg'
    },
    maker: {
        name: 'Maker',
        logoPath: '/logos/maker-color.svg'
    },

};

// Should be initialized with an iconUrl, service name, service address, contract value (can be calculated here), 
// current premium amount and the percentage of the contract value being covered
class ServiceDetail extends React.Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props)

        this.state = {
            actionMessage: "",
            buttonTitle: "Increase coverage",
            buttonDisabled: true,
            newCoveragePercentageColor: colorForPercentage(props.currentCoveragePercentage),
            contractValue: 0
        }
    }

    async componentDidMount() {
      const { match: { params } } = this.props;
      this.setState(
        {shortName: params.serviceShortName}
      );
      if (!window.web3) {
        await this.context.setupTorus(async () => {
            let balance = await CompoundAdapter.getBalance(this.context.web3, this.context.userAddress);
            this.setState({contractValue: balance});
            console.log('balance: ' + balance);
        });
        return;
      }
      if (!this.context.connected) {
        await this.context.setupGlobalContext();
      }

      let balance = await CompoundAdapter.getBalance(this.context.web3, this.context.userAddress);
      this.setState({contractValue: balance});
    }


    render() {
        const { iconUrl, serviceName, address, currentPremium, currentCoveragePercentage } = this.props         
        const color = colorForPercentage(currentCoveragePercentage)
        
        const lineItems = [
            {
                title: "BALANCE IN PROTOCOL",
                subtitle: "Total amount you have invested in the protocol",
                value: {
                    primary: String(this.state.contractValue) + " ETH",
                }
            },
            {
                title: "PREMIUM PREV PAID",
                subtitle: "Previous amount you spent to insure your deposits",
                value: {
                    primary: String(currentPremium) + "ETH",
                    secondary: String(currentCoveragePercentage) + "%",
                    color: color
                }
            },
            {
                title: "TOTAL PREMIUM REQUIRED",
                subtitle: "Pay this total amount to insure all your deposits",
                value: {
                    primary: "0 ETH",
                    secondary: String(currentCoveragePercentage) + "%",
                    color: color
                }
            }
        ]

        const shortName = this.state.shortName;
        const imageUrl = shortNameLookup[shortName] && shortNameLookup[shortName].logoPath;
        const name = shortNameLookup[shortName] && shortNameLookup[shortName].name;

        const header = (
            <div>
                {imageUrl ? <img src={imageUrl} style={iconStyle} alt="service-icon" /> : null}
                {name ? <h2 className="serviceName" style={serviceNameStyle}>{name}</h2> : null}
                <p className="serviceAddress" style={serviceAddressStyle}>{address}</p>
            </div>
        )

        const items = lineItems.map((item, index) => {
            return (
                <LineItemCell title={item.title} subtitle={item.subtitle} value={item.value} key={index} />
            )
        })

        const body = (
            <div>
                <div>{items}</div>
                <SimpleSlider onChange={(value) => this.onSliderChange(value)}/>
                <p>{this.state.actionMessage}</p>
                <div className="center col-lg-12">
                <Button disabled={this.state.buttonDisabled} title={this.state.buttonTitle} onClick={ () => this.onClick() }/>
                </div>
            </div>
        )
        
        return (
            <PageCard
                header={header}
                body={body}
            />
        );
    }

    onSliderChange(value) {
        // calculate new premium here
        // set the action message
        // set the button title
        // set the button enabled
    }

    onClick() {
        if (this.state.buttonDisabled) {
            return 
        }

        // Handle funding the insurance policy
    }
}

export default ServiceDetail;

var iconStyle = {
    width: "52px",
    height: "52px",
    borderRadius: "26px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
}

var serviceNameStyle = {
    fontSize: "32px",
    textAlign: "center"
};

var serviceAddressStyle = {
    fontSize: "12px",
    textAlign: "center"
}

function colorForPercentage(percentage) {
    if (!percentage || percentage < 25) {
        return red
    } else if (percentage < 75) {
        return yellow
    } else {
        return green
    }
}
