const prefixCls = 'mp';

const envEnum = {
  static: 'static',
  development: 'development',
  production: 'production',
  test: 'test'
}

const baseAPiMap = {
  static: 'http://localhost:4001',
  development: 'http://localhost:7820',
  production: 'http://192.168.0.126:7820'
};

export {
  prefixCls,
  baseAPiMap,
  envEnum
}
