import configureStore from 'redux-mock-store';
import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider, useIntl } from 'react-intl';
import { locale } from '@/shared/intl';


const middlewares = [];
global.mockStore = configureStore(middlewares);

const MatchMedia = () => ({
  matches: false,
  addListener: () => { },
  removeListener: () => { }
});


window.matchMedia = window.matchMedia || MatchMedia;

Object.defineProperty(window, 'location', {
  configurable: true,
  writable: true,
  enumerable: true,
  value: {
    href: 'www.test.cn',
    search: '?locale=en-US&name=23&age=3',
    pathname: '/home'
  }
});

locale.setLocale('zh-CN');

const InitIntl = () => {
  locale.setIntlObject(useIntl());
  return <div />;
};

const AllTheProviders = () => (
  <IntlProvider locale={locale.currentLocale} messages={locale.getMessages()}>
    <InitIntl />
  </IntlProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// init global intl
customRender(<div />);
