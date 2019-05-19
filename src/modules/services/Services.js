import React from 'react';
import ListPage from '../components/ListPage';

import * as CompoundAdapter from '../../lib/CompoundAdapter';
import { toNormalUnit, toBaseUnit } from '../../lib/utils';

import GlobalContext from '../../GlobalContext';

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
      await this.context.setupTorus();
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000)
      })
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
