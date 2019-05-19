import PageCard from '../components/PageCard';
import React from 'react'

import * as CompoundAdapter from '../../lib/CompoundAdapter';
import GlobalContext from '../../GlobalContext';

import * as AugurAdapter from '../../lib/AugurAdapter';
const COMPOUND_MARKET = '0x9be31a1d5fa96fbf18779b27cbe62e464af3e2b0';
const OUTCOME_NO = 0;
const OUTCOME_YES = 1;  // aka The protocol will get hacked?

class Success extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      protocols: {
        'Compound': {
          eth: 3,
          percentage: 20,
        },
      }
    };
  }

  async componentDidMount() {
    if (!this.context.connected) {
      await this.context.setupGlobalContext();
    }
    await this.getCompoundCoverage();
  }

  async getMarketInfo() {
    let result = await new Promise((resolve, reject) => {
      this.context.augur.markets.getMarketsInfo({
        marketIds: [COMPOUND_MARKET] }, (err, result) => {
        window.marketInfo = result;
        resolve(result);
      });
    });
    let marketInfo = result[0];
    this.setState({market: marketInfo});
  }


  async getCompoundCoverage() {
    let balance = await CompoundAdapter.getBalance(this.context.web3, this.context.userAddress);
    let contractValue = balance;
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
        market: marketInfo,
        protocols: {
          ...state.protocols,
          'Compound': {
            ...state.protocols.Compound,
            percentage: (netCoverage / contractValue * 100).toFixed(2)
          }
        }
      };
    });
  }

  render() {
    const header = (
      <div className="title">Success</div>
    )
    const body = (
      <div>
        {this.state.protocols.Compound.percentage || 0}% of your {this.state.contractValue || 0} ETH is now insured.
      </div>
    )
    return (
      <PageCard header={header} body={body}/>
    )
  }
}

export default Success
