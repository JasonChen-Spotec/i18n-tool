import {
  getQueryString,
  getQueryObject,
  toQueryString,
  urlToList,
  toPath
} from '@/shared/utils/qsHelp';


describe('qsHelp', () => {

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

  it('getQueryString should work fine', () => {
    expect(getQueryString()).toEqual('locale=en-US&name=bin%3C%3E%E7%9A%84&age=3');
    window.location.search = '';
    expect(getQueryString()).toEqual('');
  });

  it('getQueryObject should work fine', () => {
    expect(getQueryString()).toEqual('locale=en-US&name=bin%3C%3E%E7%9A%84&age=3');
    expect(getQueryObject()).toEqual({ age: '3', locale: 'en-US', name: 'bin<>的' });
  });

  it('toQueryString should work fine', () => {
    expect(toQueryString({ name: 'bin<>的', age: 23, id: 2 })).toEqual('?name=bin%3C%3E%E7%9A%84&age=23&id=2');
  });

  it('urlToList should work fine', () => {
    expect(urlToList('/user/list/detail')).toEqual(['/user', '/user/list', '/user/list/detail']);
  });



  test('toPath should work fine', () => {
    expect(toPath('/userCenter/:name/age/:age',{ name: 'bin<>的', age: 23 })).toEqual('/userCenter/bin%3C%3E%E7%9A%84/age/23');
  });
});
