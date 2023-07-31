import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
const MyModal = () => {
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormSubmit = (values) => {
    const { RAWIN_NO, ...data } = values; // Extract RAWIN_NO and the rest of the form values

    // Make a PUT request to your backend API
    const apiUrl = `http://192.168.1.21:3000/updateform/${RAWIN_NO}`;
    axios
      .put(apiUrl, data)
      .then((response) => {
        console.log('Data updated successfully!', response.data);
        message.success('Data updated successfully!');
        setIsFormVisible(false); // Hide the form after successful update
      })
      .catch((error) => {
        console.error('Failed to update data:', error);
        message.error('Failed to update data.');
      });
  };

  return (
    <div>
      <Button onClick={() => setIsFormVisible(true)}>Show Update Form</Button>
      {isFormVisible && (
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item name="RAWIN_NO" label="RAWIN_NO" rules={[{ required: true, message: 'Please enter RAWIN_NO' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="PO_NO" label="PO_NO">
            <Input />
          </Form.Item>
          <Form.Item name="RAWIN_Date" label="RAWIN_Date">
            <Input />
          </Form.Item>
          {/* Add other form items for the rest of the fields */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Data
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default MyModal;