import locationStorage from '@/shared/utils/localStorage';


describe('locationStorage', () => {
  test('locationStorage ', () => {
    locationStorage.set('name', 'getItem');

    expect(locationStorage.get('name')).toEqual('getItem');
  });

  test('setObject ', () => {
    locationStorage.setObject('list', [1,2,3,4]);

    expect(locationStorage.getObject('list')).toEqual([1, 2, 3, 4]);
  });
});
