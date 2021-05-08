import React from 'react';
import * as API from '@/api';
import FilleUpload from '../components/FilleUpload';

const MergeForm = () => {

  const onHistorySuccess = ({ body: { list } }) => {
    let resultString = '';
    list.forEach(({ key, enValue }) => {
      resultString += `${key}=${enValue}\n`;
    });

    const link = document.createElement('a');
    link.download = 'messages_us_EN.properties';
    const blob = new Blob([resultString]);
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
        说明:导出英文的properties文件
      </div>
    </div>
  );
};

export default MergeForm;
