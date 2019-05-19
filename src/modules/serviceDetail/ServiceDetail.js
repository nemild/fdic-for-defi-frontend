import Button from '../shared/Button'
import LineItemCell from '../components/LineItemCell'
import PageCard from '../components/PageCard';
import React from 'react'
import SimpleSlider from '../shared/SimpleSlider';

const green = "#05B169"
const yellow = "#FFC657"
const red = "#DF5F67"

// Should be initialized with an iconUrl, service name, service address, contract value (can be calculated here), 
// current premium amount and the percentage of the contract value being covered
class ServiceDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            actionMessage: "",
            buttonTitle: "Increase coverage",
            buttonDisabled: true,
            newCoveragePercentageColor: colorForPercentage(props.currentCoveragePercentage)
        }
    }

    render() {
        const { iconUrl, serviceName, address, contractValue, currentPremium, currentCoveragePercentage } = this.props         
        const color = colorForPercentage(currentCoveragePercentage)
        
        const lineItems = [
            {
                title: "BALANCE IN PROTOCOL",
                subtitle: "Total amount you have invested in the protocol",
                value: {
                    primary: String(contractValue) + "ETH",
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

        const header = (
            <div>
                <img src={iconUrl} style={iconStyle} alt="service-icon" />
                <h2 className="serviceName" style={serviceNameStyle}>{serviceName}</h2>
                <p className="serviceAddress" style={serviceAddressStyle}>{address}</p>
            </div>
        )

        const items = lineItems.map((item, index) => {
            return (
                <LineItemCell title={item.title} subtitle={item.subtitle} value={item.value}/>
            )
        })

        const body = (
            <div>
                <div>{items}</div>
                <SimpleSlider onChange={(value) => this.onSliderChange(value)}/>
                <p>{this.state.actionMessage}</p>
                <div className="row">
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