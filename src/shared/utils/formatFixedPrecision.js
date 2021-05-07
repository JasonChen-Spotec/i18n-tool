import numberUtils from 'aa-utils/lib/numberUtils';

const formatFixedPrecision = (value, precision = 2, options = {}) => {
  return numberUtils.formatNumber(value, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    ...options
  });
};

export default formatFixedPrecision;
