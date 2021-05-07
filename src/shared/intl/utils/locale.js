import { getQueryObject, toQueryString } from '@/shared/utils/qsHelp';
import locationHelp from '@/shared/utils/locationHelp';
import localStorage from '@/shared/utils/localStorage';
import enLocal from '@/locales/en-US.js';//eslint-disable-line
import zhLocal from '@/locales/zh-CN.js';//eslint-disable-line
import languages, { CN, US } from '../consts/languages';

class Locale {
  initialize() {
    const { locale } = getQueryObject();
    if (locale) {
      this.setLocale(locale);
      return;
    }

    const storageLocaleValue = localStorage.get('locale');
    const isStorageLocale = languages[storageLocaleValue];

    if (isStorageLocale) {
      this.setLocale(storageLocaleValue);
      return;
    }

    this.setLocale(CN);
  }

  setIntlObject(intl) {
    this.intl = intl;
    ['formatList', 'formatMessage', 'formatPlural'].forEach(methodName => {
      this[methodName] = (...rest) => {
        if (intl && intl[methodName]) {
          return intl[methodName].call(intl, ...rest);
        }

        console.warn(
          `[locale] ${methodName} not initialized yet`
        );

        return null;
      };
    });
  }

  setLocale(locale) {
    this.currentLocale = locale;
    localStorage.set('locale', locale);
  }

  updateLocale(newLocale, isReload = false) {
    const { location } = window;
    if (this.currentLocale !== newLocale) {
      this.setLocale(newLocale);
      const nowQueryObject = getQueryObject();
      nowQueryObject.locale = newLocale;

      if (isReload) {
        const newUrl = `${location.origin}${location.pathname}${toQueryString(nowQueryObject)}`;
        locationHelp.redirect(newUrl);
      }
    }
  }

  getMessages() {
    const messages = {
      [US]: enLocal,
      [CN]: zhLocal
    };

    return messages[this.currentLocale];
  }
}

export default new Locale();
