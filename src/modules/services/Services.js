import React from 'react';
import ListPage from '../components/ListPage';

import { toNormalUnit, toBaseUnit } from '../../lib/utils';

import GlobalContext from '../../GlobalContext';
import CEtherABI from '../../abis/CEther.json';

const DECIMALS = 18;
class Services extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      title: 'Your services',
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
    if (!this.context.connected) {
      await this.context.setupGlobalContext();
    }
    console.log('getBalance');
    console.log('context', this.context);
    const cEther = new this.context.web3.eth.Contract(
      CEtherABI,
      '0xbed6d9490a7cd81ff0f06f29189160a9641a358f'  // Rinkeby
    );
    let result = await cEther.methods.balanceOfUnderlying(this.context.userAddress)
      .call({from: this.context.userAddress});
    let balance = toNormalUnit(result.toString(), DECIMALS);
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
