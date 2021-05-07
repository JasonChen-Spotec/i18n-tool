import React, { useRef } from 'react';
import { Button } from 'antd';
import find from 'lodash/find';
import { toCSV } from '@/api';
import FilleUpload from '../components/FilleUpload';

const { Parser } = require('json2csv');

const ExportForm = () => {
  const newDataRef = useRef([]);
  const historyDataRef = useRef([]);

  const onNewSuccess = ({ body: { list } }) => {
    newDataRef.current = list;
  };

  const onHistorySuccess = ({ body: { list } }) => {
    historyDataRef.current = list;
  };

  const handleExport = () => {
    const noTranslateList = [];
    console.log('historyDataRef.current', historyDataRef.current);
    console.log('newDataRef.current', newDataRef.current);
    newDataRef.current.forEach(item => {
      const translateItem = find(historyDataRef.current,
        ({ key: translatedKey, zhValue, enValue }) => (
          translatedKey === item.key && item.zhValue === zhValue && item.enValue === enValue
        ));
      if (!translateItem) {
        noTranslateList.push({ key: item.key, zhValue: item.zhValue, enValue: '' });
      }
    });

    const json2csvParser = new Parser({ quote: '' });
    const csv = json2csvParser.parse(noTranslateList);

    const link = document.createElement('a');
    link.download = 'noTranslateList.csv';
    const blob = new Blob([csv], { type: 'text/csv' });
    link.href = URL.createObjectURL(blob);
    link.click();
    toCSV({ data: { list: noTranslateList } });
    console.log('noTranslateList', noTranslateList);
  };

  return (
    <div>
      <span>最新代码翻译文件csv</span>
      <FilleUpload
        action="http://localhost:3000/parseData"
        onSuccess={onNewSuccess}
      />
      <span>已经merge翻译文件csv</span>
      <FilleUpload
        action="http://localhost:3000/parseData"
        onSuccess={onHistorySuccess}
      />

      <div>
        说明： 两个文件只有key, zhValue, enValue全部相等才不会被导出
      </div>
      <Button onClick={handleExport}> 导出 </Button>
    </div>
  );
};

export default ExportForm;
