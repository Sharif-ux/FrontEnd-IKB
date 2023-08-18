import React, { useState } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

const YourFormComponent = () => {
  const [form] = Form.useForm();
  const [generatedRAWIN, setGeneratedRAWIN] = useState('');

  const onRawinDateChange = (date) => {
    if (date) {
      const month = date.format('MM');
      const year = date.format('YY');
      const generatedRAWIN_NO = `IN/IKB/${month}/${year}/0001`;
      setGeneratedRAWIN(generatedRAWIN_NO);
    } else {
      setGeneratedRAWIN(''); // Clear the generated value if the date is cleared
    }
  };

  const onFinish = (values) => {
    // Handle form submission if needed
    console.log('Form values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="RAWIN_Date" label="RAWIN Date">
        <DatePicker onChange={onRawinDateChange} />
      </Form.Item>
      <Form.Item name="RAWIN_NO" label="Generated RAWIN NO">
        {/* Use the generatedRAWIN state as a placeholder and default value */}
        <Input readOnly placeholder={generatedRAWIN} defaultValue={generatedRAWIN} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default YourFormComponent;
