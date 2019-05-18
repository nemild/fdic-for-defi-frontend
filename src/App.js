import React from 'react';
import { Route } from 'react-router-dom';
import Augur from 'augur.js';
import Web3 from 'web3';

import './App.css';
import Header from './modules/header/Header';
import Home from './modules/home/Home';
import Manual from './modules/manual/Manual';
import Portfolio from './modules/portfolio/Portfolio';
import Services from './modules/services/Services';
import HowItWorks from './modules/home/HowItWorks';

import GlobalContext from './GlobalContext';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalContext: {
        web3: null,
        userAddress: null,
        augur: null,
      }
    };
    this.setupGlobalContext();
  }

  async setupAugur() {
    let ethereumNode = { 
      httpAddresses: [
        'https://rinkeby.augur.net/ethereum-http'
      ],
    };
    let augurNode = 'wss://dev.augur.net/augur-node';
    let augur = new Augur();
    await new Promise((resolve, reject) => {
      augur.connect({ethereumNode, augurNode}, (err, connectionInfo) => {
        resolve();
      });
    });
    return augur;
  }

  async setupGlobalContext() {
    // window.ethereum.enable();
    let web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    let userAddress = await new Promise((resolve, reject) => {
      web3.eth.getAccounts().then((accounts) => {
        resolve(accounts[0] || 'no account found');
      });
    });
    let augur = await this.setupAugur();
    this.setState((state) => {
      return {
        ...state,
        globalContext: {
          ...state.globalContext,
          web3,
          userAddress,
          augur
        }
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Header hideName={window.location.pathname === '/'} />
        <Route path='/' exact component={Home}/>
        <Route path='/howitworks' component={HowItWorks}/>
        <Route path='/portfolio' component={Portfolio}/>
        <Route path='/services' component={Services} />
        <GlobalContext.Provider value={this.state.globalContext}>
          <Route path='/manual' component={Manual}/>
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default App;
