import BigNumber from 'bignumber.js';


// @param n <String | Number>
function toNormalUnit(n, decimals) {
  if (decimals === undefined) throw new Error('Missing decimals');
  let value = (new BigNumber(n).div(new BigNumber(`1e${decimals}`))).toFixed();
  return value;
}

function toBaseUnit(n, decimals) {
  if (decimals === undefined) throw new Error('Missing decimals');
  return (new BigNumber(n).times(new BigNumber(`1e${decimals}`)));
}

export {
  toNormalUnit,
  toBaseUnit
};
