import { Modal } from 'antd';

let hasError = false;

export default ({ title, content }) => {

  if (!hasError) {
    hasError = true;
    setTimeout(() => {
      hasError = false;
    }, 2000);

    Modal.error({
      title,
      content,
      onClose() {
        hasError = false;
      }
    });
  }
};
