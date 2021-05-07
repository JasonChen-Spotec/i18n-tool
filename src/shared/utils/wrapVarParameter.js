const wrapVarParameter = (varParameter, keyName, valueName) => {
  return varParameter.map(item => ({ [`{{${item[keyName]}}}`]: `{{${item[valueName]}}}` }));
};

export default wrapVarParameter;