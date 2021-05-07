import { formattedNumberFunc } from '@/shared/intl';

describe('shared/translation utils', () => {
  it('formattedNumberFunc should work fine ', () => {
    expect(formattedNumberFunc({ value: 33333 })).toEqual('$33,333.00');
    expect(formattedNumberFunc({ value: -33333 })).toEqual('-$33,333.00');
    expect(formattedNumberFunc({ value: 12, numberStyle: 'percent' })).toEqual('12.00%');
    expect(formattedNumberFunc({ value: 12, numberStyle: 'decimal' })).toEqual('12.00');
    expect(formattedNumberFunc({ value: -12, numberStyle: 'decimal' })).toEqual('-12.00');
    expect(formattedNumberFunc({ value: -12, numberStyle: 'decimalinreport' })).toEqual('($12.00)');
    expect(formattedNumberFunc({ value: 12, numberStyle: 'decimalinreport' })).toEqual('$12.00');
    const callback = jest.fn();

    formattedNumberFunc({ value: 12, numberStyle: 'decimalinreport', callback });
    expect(callback).toHaveBeenCalled();

  });
});
