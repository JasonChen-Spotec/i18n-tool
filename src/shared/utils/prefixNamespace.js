const prefixNamespace = (namespace, types) => {
  const resultActionTypes = {};
  Object.keys(types).forEach(key => {
    resultActionTypes[key] = `${namespace}/${types[key]}`;
  });

  return resultActionTypes;
};

export default prefixNamespace;
