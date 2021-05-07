import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import { location } from '@/shared/services/location';

function renderComponent({ route, opts, props }) {
  const routes = renderRoutes({
    ...opts,
    routes: route.routes || [],
    rootRoutes: opts.rootRoutes
  });

  const { component: Component } = route;
  if (Component) {
    const newProps = {
      ...props,
      ...opts.extraProps,
      route,
      routes: opts.rootRoutes
    };


    return <ErrorBoundary><Component {...newProps}>{routes}</Component></ErrorBoundary>;
  }
  return routes;

}

function getRouteElement({ route, index, opts }) {
  const routeProps = {
    key: route.key || index,
    exact: route.exact,
    strict: route.strict,
    sensitive: route.sensitive,
    path: route.path
  };

  if (route.path && route.name) {
    location.setPathMap({ name: route.name, path: route.path });
  }

  if (route.redirect) {
    return <Redirect {...routeProps} from={route.path} to={route.redirect} />;
  }
  return (
    <Route
      {...routeProps}
      render={props => {
        return renderComponent({ route, opts, props });
      }}
    />
  );

}

function renderRoutes(opts) {
  return opts.routes ? (
    <Switch>
      {opts.routes.map((route, index) =>
        getRouteElement({
          route,
          index,
          opts: {
            ...opts,
            rootRoutes: opts.rootRoutes || opts.routes
          }
        })
      )}
    </Switch>
  ) : null;
}

export default renderRoutes;
