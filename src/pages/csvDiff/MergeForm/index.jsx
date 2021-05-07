import React, { useRef } from 'react';
import { Button } from 'antd';
import find from 'lodash/find';
import { toCSV } from '@/api';
import FilleUpload from '../components/FilleUpload';

const { Parser } = require('json2csv');

const MergeForm = () => {
  const newDataRef = useRef([]);
  const historyDataRef = useRef([]);

  const onHistorySuccess = ({ body: { list } }) => {
    historyDataRef.current = list;
    console.log('historyDataRef.current', historyDataRef.current);
  };

  const onNewSuccess = ({ body: { list } }) => {
    newDataRef.current = list;
    console.log('historyDataRef.current', list);
  };

  const handleExport = () => {
    const nextTranslateList = [];
    historyDataRef.current.forEach(item => {
      const translateItem = find(newDataRef.current,
        ({ key: translatedKey, zhValue }) => (
          translatedKey === item.key && item.zhValue === zhValue
        ));

        console.log('translateItem', translateItem)

      if (translateItem) {
        nextTranslateList.push({ ...translateItem });
      } else {
        nextTranslateList.push(item);
      }
    });

    const json2csvParser = new Parser({ quote: '' });
    const csv = json2csvParser.parse(nextTranslateList);

    const link = document.createElement('a');
    link.download = 'newTranslateList.csv';
    const blob = new Blob([csv], { type: 'text/csv' });
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div>
      <span>local translate file csv</span>
      <FilleUpload
        action="http://localhost:3000/parseData"
        onSuccess={onHistorySuccess}
      />
      <span>new translate file csv</span>
      <FilleUpload
        action="http://localhost:3000/parseData"
        onSuccess={onNewSuccess}
      />
      <div>
        说明： 两个文件只有key, zhValue 全部相等才不会被导入
      </div>
      <Button onClick={handleExport}> merge </Button>
    </div>
  );
};

export default MergeForm;
