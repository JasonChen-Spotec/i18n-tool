import { warpedContentReg } from '@/shared/consts/rules';
import wrapVarParameter from '@/shared/utils/wrapVarParameter';

const replaceTemplate = (content , vars = [], deletedValue, insertedValue) => {
  const replaceItem = {};
  let result = content;

  if(vars.length > 0) {
    const varParameter = wrapVarParameter(vars, deletedValue, insertedValue);
    varParameter.forEach(item => {Object.assign(replaceItem, item);});
    result = content.replace(warpedContentReg, value => replaceItem[value] || value);
  }

  return result;
};

export default replaceTemplate;