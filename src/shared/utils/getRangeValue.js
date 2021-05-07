import dateUtils from '@/shared/intl/utils/dateUtils';

export const getRangePickerValue = value => {
  if (!value) {
    return [];
  }

  const { startDate, endDate } = value;

  const resultStartData = startDate ? (
    dateUtils.formatToTimestamp(startDate.utc().local().startOf('day'))
  ) : null;
  const resultEndData = endDate ? (
    dateUtils.formatToTimestamp(endDate.utc().local().startOf('day').add(1, 'day')) - 1
  ) : null;

  return [resultStartData, resultEndData];
};

export const getRangeNumberValue = value => {
  if (!value) {
    return [];
  }

  const { startNumber, endNumber } = value;

  return [startNumber, endNumber];

};