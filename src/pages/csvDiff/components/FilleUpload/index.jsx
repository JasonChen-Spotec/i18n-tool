import React, { useState, useRef } from 'react';
import Upload from 'rc-upload';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { Progress, message } from 'antd';
import useMount from 'ahooks/lib/useMount';
import PlusOutlined from 'assui/lib/icons/PlusOutlined';
import useUpdateEffect from 'ahooks/lib/useUpdateEffect';
import CloseOutlined from 'assui/lib/icons/CloseOutlined';
import styles from './index.less';


const FilleUpload = props => {
  const {
    className,
    containerClassName,
    action,
    accept,
    limitedSize,
    children,
    method,
    defaultFileUrl = '',
    defaultFileName = '',
    onBeforeUpload,
    onStart,
    onSuccess,
    onError,
    onDeleteUpload,
    onPreview,
    ...restProps
  } = props;
  const fileNameRef = useRef();
  const upload = useRef();
  const [uploadStatus, setUploadStatus] = useState(defaultFileUrl ? 'done' : 'init');
  const [uploadPercent, setUploadPercent] = useState(0);

  useUpdateEffect(() => {
    if(defaultFileUrl) {
      setUploadStatus('done');
    }else{
      setUploadStatus('init');
    }
  }, [defaultFileUrl]);

  useMount(() => {
    fileNameRef.current = defaultFileName;
  });

  useUpdateEffect(() => {
    fileNameRef.current = defaultFileName;
  }, [defaultFileName]);

  const handleStart = file => {
    setUploadPercent(0);
    fileNameRef.current = file.name;
    setUploadStatus('uploading');
    onStart && onStart();
  };

  const handleProgress = ({ percent }) => {
    setUploadPercent(parseInt(percent, 10));
  };

  const handleError = () => {
    setUploadStatus('init');
    onError && onError();
  };

  const handleSuccess = res => {
    // const data = Object.assign(res.body, { fileName: fileNameRef.current });
    onSuccess && onSuccess(res);
    setUploadStatus('done');
  };

  const uploadCls = classNames(className, {
    [styles['not-upload-init']]: uploadStatus !== 'init'
  });

  const cancelUpload = () => {
    if (upload.current) {
      upload.current.abort();
      setUploadStatus('init');
    }
  };

  const beforeUpload = file => {

    const { size } = file;
    return new Promise((resolve, reject) => {
      if (size >= limitedSize) {
        message.error('errro');
        reject();
      }
      resolve(file);
    });
  };

  const cls = classNames('app-upload-container', containerClassName);

  return (
    <div className={cls}>
      {
        uploadStatus === 'uploading' && (
          <div className={styles['upload-container']}>
            <div className={styles['apk-icon-files']}>
              <div className={styles['upload-file-name']}>{fileNameRef.current}</div>
            </div>
            <Progress
              className={styles['upload-progress']}
              percent={uploadPercent}
              size="small"
              status="active"
            />
            <div className={styles['close-button']} onClick={cancelUpload}><CloseOutlined /></div>
          </div>
        )
      }
      {
        uploadStatus === 'done' && (
          <div className={styles['upload-container']}>
            <div className={styles['apk-icon-files']}>
              <div className={styles['upload-file-name']}>{fileNameRef.current}</div>
            </div>
          </div>
        )
      }

      <Upload
        ref={upload}
        name="file"
        accept={accept}
        action={action}
        method={method}
        className={uploadCls}
        showUploadList={false}
        onStart={handleStart}
        onProgress={handleProgress}
        onError={handleError}
        onSuccess={handleSuccess}
        beforeUpload={beforeUpload}
        {...restProps}
      >
        {
          uploadStatus === 'init' && (
            <div className={styles.container}>
              <PlusOutlined />
            </div>
          )
        }
      </Upload>
    </div>
  );
};

FilleUpload.displayName = 'FilleUpload';

FilleUpload.defaultProps = {
  onBeforeUpload() {
    return true;
  },
  onDeleteUpload: noop,
  onUploaded: noop,
  onPreview: noop
};

export default FilleUpload;
