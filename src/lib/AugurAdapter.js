// @params account <String> User address
async function getPositionInMarket(web3, augur, account, market, tickSize) {
  return await new Promise((resolve, reject) => {
    console.log('ticksize', tickSize);
    augur.trading.getPositionInMarket({
      address: account,
      market,
      tickSize,
    }, function (error, result) {
      console.log('getPositionInMarket', result);
      resolve(result);
    });
  });
}

async function fillOrder(web3, augur, account, market, orderID, amount) {
  var fillOrderAddress = '0x0c77f6af7b3b5fed8ca980414a97c62da283098a';

  var _orderId = '0xea2c7476e61f5e2625e57df17fcce74741d3c2004ac657675f686a23d06e6091';

  return await new Promise((resolve, reject) => {
    augur.api.FillOrder.publicFillOrder({
      _orderId: orderID,
      _amountFillerWants: amount,
      tx: { 
        to: market,
        value: '0x16345785d8a0000',  // TODO ?
        gas: '0x632ea0' 
      }, 
      onSent: function (result) { console.log(result); },
      onSuccess: function (result) { console.log(result); },
      onFailed: function (result) { console.log(result); }
    });
  });
}

async function bestOrder(web3, augur, market) {
  const BID = '0x0';
  console.log('market', this.props.market);
  let bestOrderID = await new Promise((resolve, reject) => {
    this.context.augur.api.Orders.getBestOrderId({
      _type: BID,
      _market: market,
      _outcome: '0x1'
    }, function (error, bestOrderID) { 
      console.log('bestOrderID', bestOrderID); 
      resolve(bestOrderID);
    });
  });
  return bestOrderID;
}

// Warning: doesn't work with big numbers
function getNetPosition(numShortShares, numLongShares, priceShortShares, priceLongShares) {
  return numShortShares * priceShortShares + numLongShares * priceLongShares;
}

// Assumes market will resolve to long
// aka yes aka hacked
function getNetCoverage(numShortShares, numLongShares) {
  return numLongShares;
}


export {
  getPositionInMarket,
  getNetPosition,
  getNetCoverage,
  fillOrder,
  bestOrder,
}
