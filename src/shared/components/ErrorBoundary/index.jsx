/* eslint-disable no-console */
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('error', error);
    console.log('errorInfo', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>系统该模块出现异常，请联系系统管理员</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

