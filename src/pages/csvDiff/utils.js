export const getArrayFromFile = file => {
  const nameSplit = file.name.split('.');
  const format = nameSplit[nameSplit.length - 1];
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file); // 以文本格式读取
    let arr = [];
    reader.onload = function(evt) {
      const data = evt.target.result; // 读到的数据
      const pasteData = data.trim();
      console.log('pasteData', pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t');
      }));

      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t');
      }).map(item => {
        console.log('item', item);
        return item[0].split(',');
      });

      console.log('arr', arr);

      if (format === 'csv') {
        resolve(arr);
      } else {
        reject(new Error('[Format Error]:你上传的不是Csv文件'));
      };
    };
  });
};


export const getTableDataFromArray = array => {
  let columns = [];
  let tableData = [];
  if (array.length > 1) {
    const titles = array.shift();
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      };
    });
    tableData = array.map(item => {
      const res = {};
      item.forEach((col, i) => {
        res[titles[i]] = col;
      });
      return res;
    });
  }
  return {
    columns,
    tableData
  };
};
