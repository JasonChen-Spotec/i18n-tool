import isObject from 'lodash/isObject';
import { location } from '@/shared/services/location';

export default to => {
  let path;
  if (isObject(to)) {
    const { url, params, search } = to;
    path = location.buildURL(url, { params, search });
  } else {
    path = location.buildURL(to);
  }

  return path;
};
