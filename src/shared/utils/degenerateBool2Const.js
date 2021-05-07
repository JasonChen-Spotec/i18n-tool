import { STATUS_OFF, STATUS_ON } from '@/shared/consts/getSwitchStatus';

const degenerateBool2Const = (booleanValue, truthConst, falsyConst) => {
  if (booleanValue) {
    return truthConst || STATUS_ON;
  }
  return falsyConst || STATUS_OFF;
};

export default degenerateBool2Const;
