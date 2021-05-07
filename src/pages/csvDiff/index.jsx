import React from 'react';
import KeepTab from '@/shared/components/KeepTab';
import ExportForm from './ExportForm';
import MergeForm from './MergeForm';
import styles from './index.less';

const { TabPane } = KeepTab;

const csvDiff = () => {

  return (
    <div className={styles.login}>
      <KeepTab className="mine-tabs-card" tabBarGutter={0} destroyInactiveTabPane defaultActiveKey="export">
        <TabPane tab="export" key="export">
          <ExportForm />
        </TabPane>
        <TabPane tab="merge" key="merge">
          <MergeForm />
        </TabPane>
      </KeepTab>
    </div>
  );
};

export default csvDiff;


