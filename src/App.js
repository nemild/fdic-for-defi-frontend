import './App.css';

import Augur from 'augur.js';
import GlobalContext from './GlobalContext';
import Header from './modules/header/Header';
import Home from './modules/home/Home';
import HowItWorks from './modules/home/HowItWorks';
import InvestNew from './modules/invest/InvestNew';
import LearnMore from './modules/home/LearnMore';
import Manual from './modules/manual/Manual';
import Portfolio from './modules/portfolio/Portfolio';
import React from 'react';
import { Route } from 'react-router-dom';
import ServiceDetail from './modules/serviceDetail/ServiceDetail';
import Services from './modules/services/Services';
import Success from './modules/success/Success';
// import Invest from './modules/invest/Invest';
import Web3 from 'web3';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalContext: {
        connected: false,
        web3: null,
        userAddress: null,
        augur: null,
        setupGlobalContext: this.setupGlobalContext,
        setupTorus: this.setupTorus
      }
    };
    this.state.globalContext.setupGlobalContext = this.state.globalContext.setupGlobalContext.bind(this)
    this.state.globalContext.setupTorus = this.state.globalContext.setupTorus.bind(this);
  }

  async setupTorus(callback) {
    console.log('============setupTorus===============') 
    const handleLoad = async () => {
      let web3 = new Web3(window.web3.currentProvider)
      let userAddress = await new Promise((resolve, reject) => {
        web3.eth.getAccounts().then((accounts) => {
          resolve(accounts[0] || null);
        });
      });
      let augur = await this.setupAugur();
      this.setState((state) => {
        return {
          ...state,
          globalContext: {
            ...state.globalContext,
            connected: true,
            web3,
            userAddress,
            augur
          }
        };
      });
      callback();
    }

    if (!window.web3) {
      // no metamask
      const script = document.createElement("script");

      script.src = "https://app.tor.us/embed.min.js";
      script.integrity = "sha384-c32GoNraGoesDeDGrz7twnQIHjtZlaFglOz/N+tSqtBt1xXwd0dCuDxJWaEH1o3m";
      script.crossOrigin = "anonymous";

      document.body.appendChild(script);
      script.addEventListener('load', handleLoad)
    }
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
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      alert('Please install a Web3 provider e.g. Metamask');
    }
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
          connected: true,
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
        <Route path='/howitworks' component={HowItWorks}/>
        <GlobalContext.Provider value={this.state.globalContext}>
          <Route path='/' exact component={Home}/>
        </GlobalContext.Provider>
        <Route path='/portfolio' component={Portfolio}/>
        <Route path='/invest-new' component={InvestNew} />
        <Route path='/learn-more' component={LearnMore}/>
        <GlobalContext.Provider value={this.state.globalContext}>
          <Route path='/services' component={Services} />
        </GlobalContext.Provider>
        <GlobalContext.Provider value={this.state.globalContext}>
          <Route path='/service-detail/:serviceShortName' component={ServiceDetail} />
        </GlobalContext.Provider>
        <GlobalContext.Provider value={this.state.globalContext}>
          <Route path='/success' component={Success} />
        </GlobalContext.Provider>
        <GlobalContext.Provider value={this.state.globalContext}>
          <Route path='/manual' render={
            (props) => <Manual market={'0x098f27db05e9e466f8b2b3168a8ca9ad5822c7f2'} />
          }/>
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default App;
