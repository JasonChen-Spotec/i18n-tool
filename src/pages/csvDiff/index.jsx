import React from 'react';
import KeepTab from '@/shared/components/KeepTab';
import ExportForm from './ExportForm';
import MergeForm from './MergeForm';
import CsvToJson from './CsvToJson';
import JsonToCsv from './JsonToCsv';
import PropertiesToCSV from './PropertiesToCSV';
import CsvToProperties from './CsvToProperties';
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
        <TabPane tab="CsvToJson" key="CsvToMapJason">
          <CsvToJson />
        </TabPane>
        <TabPane tab="JsonToCsv" key="JsonToCsv">
          <JsonToCsv />
        </TabPane>
        <TabPane tab="PropertiesToCSV" key="PropertiesToCSV">
          <PropertiesToCSV />
        </TabPane>
        <TabPane tab="CsvToProperties" key="CsvToProperties">
          <CsvToProperties />
        </TabPane>
      </KeepTab>
    </div>
  );
};

export default csvDiff;


