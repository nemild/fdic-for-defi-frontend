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
  return await new Promise((resolve, reject) => {
    augur.api.FillOrder.publicFillOrder({
      _orderId: orderID,
      _amountFillerWants: amount,
      tx: {
        to: market,
        value: amount.toString(16),
        gas: '0x632ea0'
      },
      meta: {
        accountType: "privateKey",
        address: account,
      },
      onSent: function (result) { resolve(result) },
      onSuccess: function (result) { console.log(result); },
      onFailed: function (result) { console.log(result); }
    });
  });
}

// Not used
async function publicBuy(web3, augur, account, market, amount) {
  //augur.api.Trade.publicBuy({
    //_market: market,
    //_outcome: '0x1',
    //_fxpAmount: amount.toString(16),  // Doesn't handle big numbers
    //_price: _price,
    //_betterOrderId: _betterOrderId,
    //_worseOrderId: _worseOrderId,
    //_tradeGroupId: _tradeGroupId,
    //tx: { 
      //to: tradeAddress,
      //value: "0x16345785d8a0000", 
      //gas: "0x632ea0" 
    //}, 
    //onSent: function (result) { console.log(result); },
    //onSuccess: function (result) { console.log(result); },
    //onFailed: function (result) { console.log(result); }
  //});
}

async function bestOrder(web3, augur, market) {
  const BID = '0x0';
  console.log('market', market);
  let bestOrderID = await new Promise((resolve, reject) => {
    augur.api.Orders.getBestOrderId({
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
