import React, { useRef } from 'react';
import { Input, Button, notification } from 'antd';
import forEach from 'lodash/forEach';
import * as API from '@/api';
import FilleUpload from '../components/FilleUpload';

const { Parser } = require('json2csv');

const PropertiesToCSV = () => {
  const onSuccess = ({ body: { data } }) => {
    const resultList = [];
    forEach(data, (value, key) => {
      resultList.push({ key, zhValue: value, enValue: '' });
    });

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(resultList);

    const link = document.createElement('a');
    link.download = 'newTranslateList.csv';
    const blob = new Blob([csv], { type: 'text/csv' });
    link.href = URL.createObjectURL(blob);
    link.click();

  };

  return (
    <div>
      <span>待转properties文件</span>
      <FilleUpload
        action={API.parsePropertiesData}
        onSuccess={onSuccess}
      />
      <p>上传Properties文件会自动转换为标准i18n csv文件</p>
    </div>
  );
};

export default PropertiesToCSV;
