import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal } from 'antd';

const ButtonModal = (props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const open = () => setIsModalVisible(true);

  const close = () => setIsModalVisible(false);

  const modalActionRef = useRef({ open, close });

  const { children, modalContent, onClick, modalProps = {} } = props;
  const { onOk, onCancel, ...restModalProps } = modalProps;

  useImperativeHandle(ref, () => modalActionRef.current, [modalActionRef]);

  const handleButtonClick = e => {
    if (onClick) {
      return onClick(e, modalActionRef);
    }
    return open();
  };

  const handleModalOk = e => {
    if (onOk) {
      return onOk(e, modalActionRef);
    }
    return close();
  };

  const handleModalCancel = e => {
    if (onCancel) {
      return onCancel(e, modalActionRef);
    }
    return close();
  };

  const buttonNode = children && React.cloneElement(children, {
    onClick: handleButtonClick
  });

  return (
    <>
      {buttonNode}
      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered
        maskClosable={false}
        {...restModalProps}
      >
        {
          React.cloneElement(modalContent, { modalAction: modalActionRef.current })
        }
      </Modal>
    </>
  );
};

ButtonModal.displayName = 'ButtonModal';

const ForwardRefButtonModal = forwardRef(ButtonModal);

export default ForwardRefButtonModal;
