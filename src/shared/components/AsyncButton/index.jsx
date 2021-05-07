import React, { useState } from 'react';
import { Button } from 'antd';
import useIsMounted from '@/shared/hooks/useIsMounted';

const AsyncButton = ({ onClick, action, children, ...rest }) => {
  const [isLoading, setLoading] = useState(false);
  const isMountedRef = useIsMounted();
  const handleClick = () => {
    setLoading(true);

    onClick().then(() => {
      isMountedRef.current && setLoading(false);
    });
  };
  return (<Button {...rest} onClick={handleClick} loading={isLoading}>{children}</Button>);
};

export default AsyncButton;
