import * as AugurAdapter from '../../lib/AugurAdapter';
import * as CompoundAdapter from '../../lib/CompoundAdapter';

import Button from '../shared/Button'
import GlobalContext from '../../GlobalContext';
import LineItemCell from '../components/LineItemCell'
import PageCard from '../components/PageCard';
import React from 'react'
import SimpleSlider from '../shared/SimpleSlider'
import augurABIs from 'augur-core/output/contracts/abi.json';
import augurAddresses from 'augur.js/src/contracts/addresses.json';

const green = "#05B169"
const yellow = "#FFC657"
const red = "#DF5F67"
const COMPOUND_MARKET = '0x098f27db05e9e466f8b2b3168a8ca9ad5822c7f2';  // Actually dYdX Rinkeby
const OUTCOME_NO = 0;
const OUTCOME_YES = 1;  // aka The protocol will get hacked?

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
      contractValue: 0,
      pricePerShare: 0,
      coveragePerShare: 0,
      numSharesRequiredForFullCoverage: 0,
      numSharesRequiredForFullCoverageWithNetCoverage: 0,
      costForFullCoverageWithNetCoverage: 0,
      premiumRequired: 0,
      netCoverage: 0,
      currentCoveragePercentage: 0,
      market: {},
      userPosition: [0, 0]
    }

    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    this.setState(
      {shortName: params.serviceShortName}
    );

    if (!window.web3) {
      await this.context.setupTorus(async () => {
        if (params.serviceShortName === 'compound') {
            let balance = await CompoundAdapter.getBalance(this.context.web3, this.context.userAddress);
            this.setState({contractValue: balance});
      
            await this.getMarketInfo();
            let result = await AugurAdapter.getPositionInMarket(
              this.context.web3,
              this.context.augur,
              this.context.userAddress,
              COMPOUND_MARKET,
              this.state.market.tickSize
            );
            let numNoShares = parseFloat(result[0]);
            let numYesShares = parseFloat(result[1]);
            this.setState({userPosition: {numNoShares, numYesShares}});
            this.updateState();
          } else {
            console.log('Service not yet supported.');
          }
      });
      return;
    }

    if (!this.context.connected) {
      await this.context.setupGlobalContext();
    }

    if (params.serviceShortName === 'compound') {
      let balance = await CompoundAdapter.getBalance(this.context.web3, this.context.userAddress);
      this.setState({contractValue: balance});

      await this.getMarketInfo();
      let result = await AugurAdapter.getPositionInMarket(
        this.context.web3,
        this.context.augur,
        this.context.userAddress,
        COMPOUND_MARKET,
        this.state.market.tickSize
      );
      let numNoShares = parseFloat(result[0]);
      let numYesShares = parseFloat(result[1]);
      this.setState({userPosition: {numNoShares, numYesShares}});
      this.updateState();
    } else {
      console.log('Service not yet supported.');
    }
  }

  updateState() {
    let marketInfo = this.state.market;
    console.log('marketInfo', marketInfo);
    let pricePerShare = parseFloat(marketInfo.outcomes[OUTCOME_YES].price);
    let coveragePerShare = 1 - pricePerShare;
    let numSharesRequiredForFullCoverage = this.state.contractValue / coveragePerShare;
    let netCoverage = AugurAdapter.getNetCoverage(
      this.state.userPosition.numNoShares,
      this.state.userPosition.numYesShares
    );
    let costForFullCoverageWithNetCoverage = pricePerShare * numSharesRequiredForFullCoverage - netCoverage;
    let numSharesRequiredForFullCoverageWithNetCoverage = costForFullCoverageWithNetCoverage / coveragePerShare;
    console.log('####', netCoverage, this.state);
    this.setState((state) => {
      return {
        ...state,
        netCoverage,
        pricePerShare,
        coveragePerShare,
        numSharesRequiredForFullCoverage,
        costForFullCoverageWithNetCoverage,
        numSharesRequiredForFullCoverageWithNetCoverage,
        market: marketInfo
      };
    });
  }

  async getMarketInfo() {
    let result = await new Promise((resolve, reject) => {
      this.context.augur.markets.getMarketsInfo({
        marketIds: [COMPOUND_MARKET]
      }, (err, result) => {
        window.marketInfo = result;
        resolve(result);
      });
    });
    let marketInfo = result[0];
    this.setState({market: marketInfo});
  }

  render() {
    const { iconUrl, serviceName, address, currentPremium} = this.props         
    const color = colorForPercentage(this.state.currentCoveragePercentage)

    const lineItems = [
      {
        title: "BALANCE IN PROTOCOL",
        subtitle: "Total amount you have invested in the protocol",
        value: {
          primary: String(this.state.contractValue).substring(0, 4) + " ETH",
        }
      },
      {
        title: "PREMIUM PREV PAID",
        subtitle: "Previous amount you spent to insure your deposits",
        value: {
          primary: String(this.state.netCoverage) + " ETH",
          secondary: String(this.state.netCoverage / this.state.contractValue * 100) + "%",
          color: colorForPercentage(this.state.netCoverage / this.state.contractValue * 100)
        }
      },
      {
        title: "TOTAL PREMIUM REQUIRED",
        subtitle: "Pay this total amount to insure all your deposits",
        value: {
          primary: String(this.state.premiumRequired).substring(0, 4) + " ETH",
          secondary: String(this.state.currentCoveragePercentage) + "%",
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
    let coverageAmount = this.state.contractValue * value / 100;  // Denominated in ETH

    let currentCoveragePercentage = value;
    let premiumRequired = this.state.costForFullCoverageWithNetCoverage * value / 100;
    this.setState({
      premiumRequired,
      currentCoveragePercentage,
      buttonDisabled: false
    });
  }

  async onClick() {
    if (this.state.buttonDisabled) {
      return 
    }

    let web3 = this.context.web3;
    const cashContract = new web3.eth.Contract(
      augurABIs.Cash,
      augurAddresses[4].Cash
    );
    await cashContract.methods.approve(
      augurAddresses[4].Augur,
      1283877)
      .send({
        from: this.context.userAddress
      })
      .catch(alert)
      .finally(() => {
        alert('Your buy was successfully submitted!')
      });

    //let bestOrderID = AugurAdapter.bestOrder(
    //await AugurAdapter.fillOrder(
    //this.context.web3,
    //this.context.augur,
    //this.context.userAddress,
    //COMPOUND_MARKET,
    //);

    // Handle funding the insurance policy
  }
}

export default ServiceDetail;

var iconStyle = {
  width: "52px",
  height: "52px",
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
