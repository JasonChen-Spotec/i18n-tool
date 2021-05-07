import Login from '@/pages/csvDiff';

const loginPath = '/';

// fix request.js import loginRoute.js error
window.__loginPath = loginPath;

const loginRoute = {
  path: loginPath,
  exact: true,
  component: Login
};

export default loginRoute;
