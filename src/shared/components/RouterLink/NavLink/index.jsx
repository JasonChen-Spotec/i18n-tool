import React from 'react';
import { NavLink } from 'react-router-dom';
import buildURL from '../utils/buildURL';

export default ({ children, to, ...rest }) =>
  (<NavLink to={buildURL(to)} {...rest}>{children}</NavLink>);
