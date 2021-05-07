const prefixCls = 'mp';

const envEnum = {
  static: 'static',
  development: 'development',
  production: 'production',
  test: 'test'
}

const baseAPiMap = {
  static: 'http://localhost:4001',
  development: 'http://localhost:3000',
  production: 'http://27.102.113.188:10000'
};

const mobileSiteAddressMap = {
  static: 'http://localhost:6001',
  development: 'http://192.168.0.126:7010',
  production: 'http://h5.mp.testmego.com'
};

export {
  prefixCls,
  baseAPiMap,
  envEnum,
  mobileSiteAddressMap
}
