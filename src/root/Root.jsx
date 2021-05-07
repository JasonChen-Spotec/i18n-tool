import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider, message, notification } from 'antd';
import { antdLocaleMap } from '@/shared/intl/consts/localeTypes';
import { locale } from '@/shared/intl';

const prefixCls = 'mp';

ConfigProvider.config({ rootPrefixCls: prefixCls });
message.config({ prefixCls: `${prefixCls}-message`, duration: 1 });
notification.config({ prefixCls: `${prefixCls}-notification`, duration: 1 });

const Root = ({ children }) => (
  <IntlProvider defaultLocale={locale.currentLocale} locale={locale.currentLocale} messages={locale.getMessages()}>
    <ConfigProvider prefixCls={prefixCls} locale={antdLocaleMap[locale.currentLocale]}>
      {children}
    </ConfigProvider>
  </IntlProvider>
);

export default Root;
