import React from 'react';
import * as API from '@/api';
import FilleUpload from '../components/FilleUpload';

const { Parser } = require('json2csv');

const MergeForm = () => {

  const onHistorySuccess = ({ body: { list } }) => {
    const resultMap = {};
    list.forEach(({ key, enValue, zhValue }) => {
      resultMap[key] = enValue || zhValue;
    });

    const link = document.createElement('a');
    link.download = 'EnResultMap.json';
    const blob = new Blob([JSON.stringify(resultMap)], { type: 'application/json' });
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div>
      <span>待转csv</span>
      <FilleUpload
        action={API.parseCSVData}
        onSuccess={onHistorySuccess}
      />
      <div>
        说明： 导出json之后用自己用https://www.sojson.com/ 格式化
      </div>
    </div>
  );
};

export default MergeForm;
