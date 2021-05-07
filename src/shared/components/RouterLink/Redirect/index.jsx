import React from 'react';
import { Redirect } from 'react-router-dom';
import buildURL from '../utils/buildURL';

export default ({ to, ...rest }) => (<Redirect to={buildURL(to)} {...rest} />);
