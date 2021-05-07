import React from 'react';
import { routerRedux } from 'dva';
import { useIntl } from 'react-intl';
import { locale } from '@/shared/intl';
import routesData from '@/router';
import renderRoutes from './renderRoutes';

const { ConnectedRouter } = routerRedux;

const RootRouter = ({ history }) => {
  const intl = useIntl();
  locale.setIntlObject(intl);

  return (
    <ConnectedRouter history={history}>
      {renderRoutes({ routes: routesData })}
    </ConnectedRouter>
  );
};

export default RootRouter;
