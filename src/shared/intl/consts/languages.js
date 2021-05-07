import locale from '@/shared/intl/utils/locale';
import messages from '@/shared/intl/messages';

export const CN = 'zh-CN';
export const US = 'en-US';
export const ALL = null;

export default {
  [CN]: CN,
  [US]: US
};

export const getLanguagesMap = () => ({
  [CN]: locale.formatMessage(messages.Chinese),
  [US]: 'English'
});

export const getLanguagesList = () => {
  return [
    {
      value: CN,
      text: locale.formatMessage(messages.Chinese)
    },
    {
      value: US,
      text: 'English'
    }
  ];
};