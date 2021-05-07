import numberUtils from 'aa-utils/lib/numberUtils';

const formatFixedFloatNumber = (value, precision = 2, options = {}) => {
  return numberUtils.formatBigFloatNumber(`${value}`, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    ...options
  });
};

export default formatFixedFloatNumber;