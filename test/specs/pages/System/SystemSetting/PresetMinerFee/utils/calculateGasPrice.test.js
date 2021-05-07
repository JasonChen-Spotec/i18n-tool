import {
  specifiedCoinGasFee, usdtGasFee
} from '@/pages/System/SystemSetting/PresetMinerFee/utils/calculateGasPrice';
  
describe('src/pages/System/SystemSetting/PresetMinerFee/utils/calculateGasPrice', () => {
  it('specifiedCoinGasFee should work fine ', () => {

    const resultValue = specifiedCoinGasFee({
      gasFeeRate: 200, // 矿工费率
      gas: 21000, // 油费
      exchangeToChainCurrency: 0.000000001 // 货币转换率
    });
    expect(resultValue).toEqual('0.00420000');

    const resultValue1 = usdtGasFee({
      coinGasFee: 0.00420000, // 指定币种矿工费
      exchangeToUSDT: 1782.46 // 指定货币转USDT转换率
    });
    expect(resultValue1).toEqual('7.48633200');
  });
});
  