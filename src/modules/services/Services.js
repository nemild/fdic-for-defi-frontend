import React from 'react';
import ListPage from '../components/ListPage';

import * as CompoundAdapter from '../../lib/CompoundAdapter';
import { toNormalUnit, toBaseUnit } from '../../lib/utils';

import GlobalContext from '../../GlobalContext';

import * as AugurAdapter from '../../lib/AugurAdapter';
const COMPOUND_MARKET = '0x9be31a1d5fa96fbf18779b27cbe62e464af3e2b0';
const OUTCOME_NO = 0;
const OUTCOME_YES = 1;  // aka The protocol will get hacked?

class Services extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      title: 'Defi protocols you hold funds on',
      protocols: {
        '0x': {
          eth: 3,
          percentage: 100,
        },
        'Augur': {
          eth: 3,
          percentage: 5,
        },
        'Cheese Wizard': {
          eth: 3,
          percentage: 5,
        },
        'Compound': {
          eth: 3,
          percentage: 20,
        },
        'dYdX': {
          eth: 3,
          percentage: 3,
        },
        'Maker': {
          eth: 3,
          percentage: 78,
        }
      }
    };
  }

  async componentDidMount() {
    if (!window.web3) {
      await this.context.setupTorus(async () => {
        console.log(this.context.userAddress);
        if (!this.context.userAddress) {
          return;
        }
        let balance = await CompoundAdapter.getBalance(this.context.web3, this.context.userAddress);
        console.log('balance', balance);
        this.setState((state) => {
          return {
            ...state,
            protocols: {
              ...state.protocols,
              'Compound': {
                eth: balance,
                percentage: 78
              }
            }
          };
        });
      });
      return;
    }
    if (!this.context.connected) {
      await this.context.setupGlobalContext();
    }
  
    let balance = await CompoundAdapter.getBalance(this.context.web3, this.context.userAddress);
    console.log('balance', balance);
    this.setState((state) => {
      return {
        ...state,
        protocols: {
          ...state.protocols,
          'Compound': {
            eth: balance,
            percentage: 78
          }
        }
      };
    });
    await this.getCompoundCoverage();
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
    return (
      <ListPage
        title = {this.state.title}
        address = {this.context.userAddress}
        lists = {this.state.protocols}
      />
    );
  }
}

export default Services;
