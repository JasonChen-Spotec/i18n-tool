import {
  calculateEachHashRateSellPrice
} from '@/pages/OfficialProduct/ProductTemplate/components/ProductTemplateForm/utils/calculatePrice';

describe('src/pages/OfficialProduct/ProductTemplate/components/ProductTemplateForm/utils/calculatePrice', () => {
  it('calculateEachHashRateSellPrice should work fine ', () => {
    const resultValue = calculateEachHashRateSellPrice({
      iconPrice: 1630.38, // 币价 api
      chainIncome: 0.0000367322, // 单位算力日产量 api
      amount: 1, // 每份算力数量
      powerUnit: 1, // 单位功耗,
      powerPrice: 1, // 电价
      allocationRate: 1, // 分成比例
      monthRewardRate: 2 // 月化回报率
    });

    expect(resultValue).toEqual(0.53831166354);

    const resultValue1 = calculateEachHashRateSellPrice({
      iconPrice: 38843.12, // 币价 api
      chainIncome: 0.0000058657378449015997, // 单位算力日产量 api
      amount: 6, // 每份算力数量
      powerUnit: 4, // 单位功耗,
      powerPrice: 2, // 电价
      allocationRate: 65, // 分成比例
      monthRewardRate: 454 // 月化回报率
    });

    expect(resultValue1).toEqual(0.9237216746194596);
  });
});
