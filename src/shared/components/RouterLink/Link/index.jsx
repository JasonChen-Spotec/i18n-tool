import React from 'react';
import { Link } from 'react-router-dom';
import buildURL from '../utils/buildURL';
import './index.less';

export default ({ children, to, ...rest }) => (
  <Link className="link" to={buildURL(to)} {...rest}>{children}</Link>
);
