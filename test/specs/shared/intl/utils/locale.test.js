import locale from '@/shared/intl/utils/locale';

describe('locale', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      enumerable: true,
      value: {
        href: 'www.test.cn',
        search: '?locale=en-US&name=bin%3C%3E%E7%9A%84&age=3',
        pathname: '/home'
      }
    });
  });

  it('initialize if query no locale value ', () => {
    window.location.search = '/user';

    locale.initialize();

    expect(locale.currentLocale).toEqual('zh-CN');
    locale.initialize();
  });

  it('initialize ', () => {
    locale.initialize();

    expect(locale.currentLocale).toEqual('en-US');
  });

});
