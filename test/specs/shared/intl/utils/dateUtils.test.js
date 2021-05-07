import dayjs from 'dayjs';
import dateUtils from '@/shared/intl/utils/dateUtils';

describe('dateUtils', () => {
  it('dateUtils locale gettr settr should work fine', () => {
    expect(dateUtils.locale).toEqual('zh-CN');
    const spyOnIntlChange = jest.spyOn(dateUtils, 'onIntlChange'); // we pass 'get'
    dateUtils.locale = 'en-US';
    expect(dateUtils.locale).toEqual('en-US');
    expect(spyOnIntlChange).toHaveBeenCalled();
  });

  it('dateUtils dateFormat gettr settr should work fine', () => {
    expect(dateUtils.dateFormat).toEqual('YYYY-MM-DD');
    expect(dateUtils.timeFormat).toEqual('HH:mm:ss');
    expect(dateUtils.dateTimeFormat).toEqual('YYYY-MM-DD HH:mm:ss');

    dateUtils.dateFormat = 'YYYY/MM/DD';
    dateUtils.timeFormat = 'HH-mm-ss';
    expect(dateUtils.dateFormat).toEqual('YYYY/MM/DD');
    expect(dateUtils.timeFormat).toEqual('HH-mm-ss');

    dateUtils.timeZoneOffset='test';
    expect(dateUtils.timeZoneOffset).toEqual('test');
  });


  it('dateUtils parseDate-time should work fine', () => {
    expect(dateUtils.parseDate('1995/09/23').format(dateUtils.dateFormat)).toEqual('1995/09/23');

    expect(dateUtils.parseDate('23-1995-09', 'DD-YYYY-MM').format(dateUtils.dateFormat)).toEqual('1995/09/23');

    expect(dateUtils.parseTime('12-23-23').format(dateUtils.timeFormat)).toEqual('12-23-23');
    expect(dateUtils.parseTime('12-23-23').format('HH:mm:ss')).toEqual('12:23:23');


    expect(
      dateUtils.parseDateTime(1598343036538)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss')
    ).toEqual('2020-08-25 08:10:36');
    expect(
      dateUtils.parseDateTime('1995/09/23 04-23-23')
        .format('YYYY-MM-DD HH:mm:ss')
    ).toEqual('1995-09-23 04:23:23');
  });

  it('dateUtils formatDate should work fine', () => {
    const dateMoment = dayjs(1598343036538).utc();
    expect(dateUtils.formatDate(dateMoment)).toEqual('2020/08/25');
    expect(dateUtils.formatDate(dateMoment, 'YYYY-MM-DD')).toEqual('2020-08-25');
    expect(dateUtils.formatDate('')).toEqual('');

    expect(dateUtils.formatTime(dateMoment)).toEqual('08-10-36');
    expect(dateUtils.formatTime(dateMoment, 'HH:mm:ss')).toEqual('08:10:36');
    expect(dateUtils.formatTime('')).toEqual('');

    expect(dateUtils.formatDateTime('')).toEqual('');
    expect(dateUtils.formatDateTime(dateMoment)).toEqual('2020/08/25 08-10-36');
    expect(dateUtils.formatDateTime(dateMoment, 'YYYY-MM-DD HH:mm:ss')).toEqual('2020-08-25 08:10:36');
  });


  it('dateUtils getToday should work fine', () => {
    console.log('dateUtils', dateUtils.getToday().format('x'));

  });
});
