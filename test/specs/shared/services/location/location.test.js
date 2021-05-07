
import location from '@/shared/services/location/locationServices';
import { locale } from '@/shared/intl';

describe('locationServices', () => {
  it('history api should work fine ', () => {
    const store = mockStore({});
    locale.setLocale('zh-CN');

    location.initialize(store);
    location.goForward();
    expect(store.getActions()[0].payload.method).toEqual('goForward');
    location.goBack(1);
    expect(store.getActions()[1].payload).toEqual({ method: 'goBack', args: [1] });
    location.go(1);
    expect(store.getActions()[2].payload).toEqual({ method: 'go', args: [1] });
    location.replace('/user/name');
    expect(store.getActions()[3].payload).toEqual({ method: 'replace', args: ['/user/name?locale=zh-CN'] });
    location.push('/user/name');
    expect(store.getActions()[4].payload).toEqual({ method: 'push', args: ['/user/name?locale=zh-CN'] });
  });

  it('buildURL should work fine ', () => {
    expect(location.buildURL('/usr/:id/name/:age', {
      params: { id: 3, age: 23 },
      query: { test: 'asdf', name: 'chen' }
    })).toEqual('/usr/3/name/23?test=asdf&name=chen&locale=zh-CN');

    expect(location.buildURL('/usr')).toEqual('/usr?locale=zh-CN');
  });
});
