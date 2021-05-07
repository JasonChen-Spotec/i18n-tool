import { publicDataActionTypes } from '@/models/publicData';
import map from 'lodash/map';
import { location } from '@/shared/services/location';

export const buildFormErrors = errorDetail => {
  const resultErrorFields = map(errorDetail, (value, key) => ({
    name: key,
    errors: value ? [value] : []
  }));

  return resultErrorFields;
};

export const clearServerItemError = (serverErrors, [changeFiledInfo]) => {
  if (changeFiledInfo) {
    const [filed] = changeFiledInfo.name;
    if (serverErrors[filed]) {
      location.store.dispatch({ type: publicDataActionTypes.CLEAR_SERVER_ITEM_ERROR, payload: [filed] });
    }
  }
};

export const clearServerError = () => {
  location.store.dispatch({ type: publicDataActionTypes.UPDATE_SERVER_ERROR, payload: {} });
};

export const clearSectionBusinessError = () => {
  location.store.dispatch({ type: publicDataActionTypes.UPDATE_SECTION_ERROR, payload: '' });
};