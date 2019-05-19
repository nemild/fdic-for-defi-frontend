import React from 'react';

import Augur from 'augur.js';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import augurAddresses from 'augur.js/src/contracts/addresses.json';
import augurABIs from 'augur-core/output/contracts/abi.json';

import GlobalContext from '../../GlobalContext';
import MoneyMarketABI from '../../abis/MoneyMarket.json';
import CEtherABI from '../../abis/CEther.json';

const RINKEBY = 4;
const BID = '0x0';
const ASK = '0x1';

class Manual extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.approve = this.approve.bind(this);
    this.buyShares = this.buyShares.bind(this);
    this.bestOrder = this.bestOrder.bind(this);
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
    console.log('context', this.context);
  }

  componentDidUpdate() {
    console.log('context', this.context);
  }

  async approve(e) {
    const web3 = this.context.web3;

    const AUGUR_ADDRESS = augurAddresses[4].Augur;
    const CASH_ADDRESS = augurAddresses[RINKEBY].Cash;

    const cashContract = new web3.eth.Contract(
      augurABIs.Cash,
      augurAddresses[RINKEBY].Cash
    );
    this.setState({loading: true});
    //await this.context.augur.api.Cash.approve({
      //_spender: AUGUR_ADDRESS,
      //_value: 3141,
      //tx: {
        //to: CASH_ADDRESS,
        //gas: '0x632ea0' 
      //},
      //accountType: 'privateKey',
      //address: this.context.userAddress,
      //onSent: function (result) { console.log(result); },
      //onSuccess: function (result) { console.log(result); },
      //onFailed: function (result) { console.log(result); }
    //})
    await cashContract.methods.approve(AUGUR_ADDRESS, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

      .send({
        from: this.context.userAddress
      })
      .catch(alert)
      .finally(() => {
        this.setState({loading: false});
      });





    //e.preventDefault();
    //console.log('userAddress', userAddress);
    //const augur = new Augur();
    ////console.log('addresses', augurAddresses);
    ////console.log('abi', augurABIs);

    //window.augur = augur;
    //setTimeout(() => {
      //console.log('allowance');
      //let ethereumNode = { 
        //httpAddresses: [
          //'https://rinkeby.augur.net/ethereum-http'
        //],
      //};
      //let augurNode = 'wss://dev.augur.net/augur-node';

      //augur.connect({ethereumNode, augurNode}, console.log);
    //}, 1000);
    ////setTimeout(() => {
    ////}, 2000);
  }


  async getBalance(project) {
    console.log('getBalance');
    if (project === 'COMPOUND') {
      const cEther = new this.context.web3.eth.Contract(
        CEtherABI,
        '0xbed6d9490a7cd81ff0f06f29189160a9641a358f'  // Rinkeby
      );
      let balance = await cEther.methods.balanceOfUnderlying(this.context.userAddress)
        .call({from: this.context.userAddress});
      console.log('balance', balance.toString());
    } else {
      console.log('Project not supported');
    }
  }

  async bestOrder() {
    console.log('market', this.props.market);
    let bestOrderID = await new Promise((resolve, reject) => {
      this.context.augur.api.Orders.getBestOrderId({
        _type: BID,
        _market: this.props.market,
        _outcome: '0x1'
      }, function (error, bestOrderID) { 
        console.log('bestOrderID', bestOrderID); 
        resolve(bestOrderID);
      });
    });
    let amount = await new Promise((resolve, reject) => {
      this.context.augur.api.Orders.getAmount({
        _orderId: bestOrderID
      }, function (error, amount) {
        resolve(amount);
      });
    });
    console.log('amount', amount);
  }

  async buyShares() {
    let AUGUR_ADDRESS = augurAddresses[4].Augur;
    this.context.augur.api.Cash.allowance({
      _owner: this.context.userAddress,
      _spender: AUGUR_ADDRESS,
    }, function(error, allowance) {
      console.log(allowance); 
    });
  }

  render() {
    return (
      <div>
        This is Portfolio page
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={this.buyShares}>
          Buy yes shares
        </button>
        <button onClick={this.approve}>
          Approve WETH
        </button>
        <button onClick={this.bestOrder}>
          Best Order
        </button>
        <button onClick={() => { this.getBalance('COMPOUND'); }}>
          Get Balance
        </button>
        {
          this.state.loading && <div>
            Loading...
          </div>
        }
      </div>
    );
  }
}

export default Manual;
