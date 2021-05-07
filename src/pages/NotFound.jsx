import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'antd';
import NotFoundSVG from 'assui/lib/icons/business/NotFound';
import notFoundMessages from '@/shared/intl/messages/notFound';
import locationServices from '@/shared/services/location/locationServices';

import styles from './NotFound.less';

const NotFound = () => {
  const intl = useIntl();
  return (
    <div className={styles.container}>
      <NotFoundSVG className={styles['banner-img']} />
      <div className={styles['main-content']}>
        {intl.formatMessage(notFoundMessages.pageNotFound)}
      </div>
      <Button
        className="orange-button"
        size="large"
        onClick={() => { locationServices.push('/welcome'); }}
      >
        {intl.formatMessage(notFoundMessages.backHome)}
      </Button>
    </div>
  );
};

NotFound.displayName = 'NotFound';

export default NotFound;
