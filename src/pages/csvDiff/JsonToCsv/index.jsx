import React, { useRef } from 'react';
import { Input, Button, notification } from 'antd';
import forEach from 'lodash/forEach';

const { Parser } = require('json2csv');

const { TextArea } = Input;

const ObjectToCsv = () => {
  const jsonDataRef = useRef();
  const onChange = e => {
    jsonDataRef.current = e.target.value;
  };

  const handleClick = () => {
    let filedMaps;
    try {
      filedMaps = JSON.parse(jsonDataRef.current);
    } catch (error) {
      console.log('error', error);
      notification.error({ message: '解析错误，json字符串有误' });
      return false;
    }

    const resultList = [];
    forEach(filedMaps, (value, key) => {
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
      <TextArea rows={20} placeholder="请输入json对象" allowClear onChange={onChange} />
      <Button onClick={handleClick}>导出csv</Button>
    </div>
  );
};

export default ObjectToCsv;
