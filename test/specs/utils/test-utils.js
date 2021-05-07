import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { locale } from '@/shared/intl';


const AllTheProviders = ({ children }) => (
  <IntlProvider locale={locale.currentLocale} messages={locale.getMessages()}>
    <ConfigProvider prefixCls="crm">
      {children}
    </ConfigProvider>
  </IntlProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
