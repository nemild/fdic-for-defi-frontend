import CEtherABI from '../abis/CEther.json';
import { toNormalUnit, toBaseUnit } from './utils';

const DECIMALS = 18;

// Pass in web3 for now, hack
// Only check ETH balance for now
async function getBalance(web3, account) {
  const cEther = new web3.eth.Contract(
    CEtherABI,
    '0xbed6d9490a7cd81ff0f06f29189160a9641a358f'  // Rinkeby
  );
  let result = await cEther.methods.balanceOfUnderlying(account)
    .call({from: account});
  if (!result) {
    return 0;
  }
  let balance = toNormalUnit(result.toString(), DECIMALS);
  return balance;
}

export {
  getBalance
}
