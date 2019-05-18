import React from 'react';

import Augur from 'augur.js';
import Web3 from 'web3';
import augurAddresses from 'augur.js/src/contracts/addresses.json';
import augurABIs from 'augur-core/output/contracts/abi.json';

import GlobalContext from '../../GlobalContext';

const RINKEBY = 4;

class Manual extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      web3: null
    };
  }

  componentDidMount() {
    console.log('context', this.context);
  }

  componentDidUpdate() {
    console.log('context', this.context);
  }

  async approve(e) {
    //e.preventDefault();
    //console.log('userAddress', userAddress);
    //const augur = new Augur();
    //const AUGUR_ADDRESS = augurAddresses[4].Augur;
    //const CASH = augurAddresses[RINKEBY].Cash;
    ////console.log('addresses', augurAddresses);
    ////console.log('abi', augurABIs);

    //const cashContract = new web3.eth.Contract(augurABIs.Cash, augurAddresses[RINKEBY].Cash);
    //window.cashContract = cashContract;
    //await cashContract.methods.approve(AUGUR_ADDRESS, 10000).send({from: userAddress});
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
      ////augur.api.Cash.allowance({
        ////_owner: userAddress,
        ////_spender: AUGUR_ADDRESS,
      ////}, function(error, allowance) {
        ////console.log(allowance); 
      ////});
    ////}, 2000);
  }

  async buy() {
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
        <button onClick={this.test}>
          Click me
        </button>
      </div>
    );
  }
}

export default Manual;
