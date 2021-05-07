import qs from 'qs';
import { routerRedux } from 'dva';
import { toPath } from '@/shared/utils/qsHelp';
import { locale } from '@/shared/intl';

const { push, replace, go, goBack, goForward } = routerRedux;

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */

class Location {
  constructor() {
    this.pathMap = {};
  }

  initialize(store) {
    this.store = store;
  }

  setPathMap({ name, path }) {
    this.pathMap[name] = path;
  }

  buildURL = (url, options = {}) => {
    const { params = {}, query = {} } = options;
    let serializedUrl = toPath(url, params);
    query.locale = locale.currentLocale;

    const queryStr = qs.stringify(query, { indices: false });

    queryStr && (serializedUrl = `${serializedUrl}?${queryStr}`);

    return serializedUrl;
  }

  goForward() {
    this.store.dispatch(goForward());
  }

  goBack(stepNumber) {
    this.store.dispatch(goBack(stepNumber));
  }

  go(stepNumber) {
    this.store.dispatch(go(stepNumber));
  }

  replace(url, options = {}) {
    const { params, query } = options;
    const serializedUrl = this.buildURL(url, { params, query });

    this.store.dispatch(replace(serializedUrl));

    return serializedUrl;
  }

  push(url, options = {}) {
    const { params, query } = options;
    const serializedUrl = this.buildURL(url, { params, query });

    this.store.dispatch(push(serializedUrl));

    return serializedUrl;
  }
}

export default new Location();
