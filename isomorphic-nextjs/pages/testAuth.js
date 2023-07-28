import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';

const MyModal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
const testvalue = 'IN/IKB/21/03/0001'
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="My Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Modal content goes here.</p>
        <Input value={testvalue}/>
      </Modal>
    </div>
  );
};
export default MyModal;