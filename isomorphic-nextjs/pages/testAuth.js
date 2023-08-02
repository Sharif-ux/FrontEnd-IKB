import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const YourFormComponent = () => {
  const [form] = Form.useForm();
  const [generatedRAWIN_NO, setGeneratedRAWIN_NO] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {

      const response = await axios.post('http://localhost:3000/submitform', {
        ...values,
        RAWIN_NO: generatedRAWIN_NO 
      });
      if (response.status === 200) {
        message.success('Data inserted successfully!');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to insert data into the database.');
    }
    setLoading(false);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="RAWIN_NO" label="RAWIN NO">
        <Input value={generatedRAWIN_NO} readOnly />
      </Form.Item>
      <Form.Item name="RAWIN_Date" label="RAWIN Date">
        <Input />
      </Form.Item>
      {/* Add more form fields as needed */}
      {/* <Form.Item name="PO_NO" label="PO NO">
        <Input />
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default YourFormComponent;
