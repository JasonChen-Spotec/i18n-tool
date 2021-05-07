import React from 'react';
import ReactDOM from 'react-dom';
import dva, { createBrowserHistory } from 'dva';
import createLoading from 'dva-loading';
import forEach from 'lodash/forEach';
import { configResponsive } from 'ahooks/lib/useResponsive';
import rootRouter from '@/root/rootRouter';
import Root from '@/root/Root';
import * as models from '@/models';
import { locale, DateUtils } from '@/shared/intl';
import { location } from '@/shared/services/location';
import './index.less';

const history = createBrowserHistory();
locale.initialize();

DateUtils.locale = locale.currentLocale;
DateUtils.currentTimeFormat = 'HH:mm';

const app = dva({ history });

forEach(models, model => app.model(model));

app.router(rootRouter);

app.use(createLoading());

const App = app.start();
location.initialize(app._store);

configResponsive({
  xs: 0,
  sm: 768,
  md: 960,
  lg: 1200
});

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);
