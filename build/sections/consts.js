const prefixCls = 'mp';

const envEnum = {
  static: 'static',
  development: 'development',
  production: 'production',
  test: 'test'
}

const baseAPiMap = {
  static: 'http://localhost:4001',
  development: 'http://192.168.0.102:3000',
  production: 'http://192.168.0.126:3000'
};

export {
  prefixCls,
  baseAPiMap,
  envEnum
}
