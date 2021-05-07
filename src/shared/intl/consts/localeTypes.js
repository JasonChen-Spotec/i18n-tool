import antdZhCN from 'antd/lib/locale/zh_CN';
import antdEnUS from 'antd/lib/locale/en_US';
import datePickerZhCN from 'antd/lib/date-picker/locale/zh_CN';
import datePickerEnUS from 'antd/lib/date-picker/locale/en_US';
import { CN, US } from './languages';

// only use require
require('dayjs/locale/zh-cn');
require('dayjs/locale/en');

const datePickerLocaleMap = {
  [US]: datePickerEnUS,
  [CN]: datePickerZhCN
};

const antdLocaleMap = {
  [US]: antdEnUS,
  [CN]: antdZhCN
};

const dayjsLocaleMap = {
  [US]: 'en',
  [CN]: 'zh-cn'
};

const countryLocaleMap = {
  [US]: 'en',
  [CN]: 'zh'
};

const richTextEditorLocaleMap = {
  [CN]: 'zh-cn'
};

export {
  datePickerLocaleMap,
  antdLocaleMap,
  dayjsLocaleMap,
  countryLocaleMap,
  richTextEditorLocaleMap
};
