import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Col,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Modal,
  message 
} from 'antd';
import { useState } from 'react';
import axios from 'axios';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const onChange = (value) => {
    console.log('changed', value);
  };


const FormDisabledDemo = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Add 1 because getMonth() returns zero-based index
  const [year, setYear] = useState(new Date().getFullYear());
  const [counter, setCounter] = useState(1);
  const [rawinNo, setRawinNo] = useState(generateRawinNo());

  function generateRawinNo() {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year.toString().substr(2); // Get last two digits of the year
    const formattedCounter = counter.toString().padStart(4, '0'); // Pad the counter with leading zeros up to four digits
    return `IN/IKB/${formattedMonth}/${formattedYear}/${formattedCounter}`;
  }

  const updateRawinNo = () => {
    const newRawinNo = generateRawinNo();
    setRawinNo(newRawinNo);
    form.setFieldsValue({ RAWIN_NO: newRawinNo });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/submitform', values);
      if (response.status === 200) {
        // Increment the counter and reset if the month or year changes
        if (month !== new Date().getMonth() + 1 || year !== new Date().getFullYear()) {
          setMonth(new Date().getMonth() + 1);
          setYear(new Date().getFullYear());
          setCounter(1);
        } else {
          setCounter((prevCounter) => prevCounter + 1);
        }

        // Update the RAWIN_NO field
        updateRawinNo();

        message.success('Data inserted successfully!');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to insert data into the database.');
    }
    setLoading(false);
  };
  const handleSubmit = (values) => {
    setFormData(values);
  };
    return (
      <>

        <Form
          // labelCol={{
          //   span: 4,
          // }}
        //   wrapperCol={{
        //     span: 14,
        //   }}
          layout="horizontal"
          style={{
            Width: "100%",
          }}
          form={form} onFinish={onFinish}
        >
            
          {/* <Form.Item label="Checkbox"  valuePropName="checked">
            <Checkbox>Checkbox</Checkbox>
          </Form.Item>
          <Form.Item label="Radio">
            <Radio.Group>
              <Radio value="apple"> Apple </Radio>
              <Radio value="pear"> Pear </Radio>
            </Radio.Group>
          </Form.Item> */}
        <Row gutter={16}>
        <Col span={8}>
            <Form.Item name="RAWIN_Date" label="RAWIN_Date">
            <DatePicker style={{width: "100%"}}/>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="RAWIN_NO" label="No Refrensi">
<Input value={rawinNo} />
          </Form.Item>  
          </Col> 
          <Col span={8}>  
          <Form.Item name="RAWIN_Type" label="Jenis Transaksi" >
            <Select  style={{ width: "100%",}}>
              <Select.Option value="normal">Normal</Select.Option>
              <Select.Option value="cmtin">Subcon/CMT IN</Select.Option>
              <Select.Option value="cmtout">Subcon/CMT OUT</Select.Option>
              <Select.Option value="wip">WIP</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={8}>       
          <Form.Item name="STYLE" label="Style">
            <Select style={{ width: "100%",}}>
              <Select.Option value="normal">YMNNMN</Select.Option>
            </Select>
          </Form.Item>  
          </Col>  
          <Col span={8}>      
          <Form.Item name="Gudang_Code" label="Dikirim ke">
            <Select style={{width: "100%"}}>
              <Select.Option value="GD_DASAN">Gudang Dasan</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}> 
          <Form.Item name="Currency_Code" label="Jenis Uang">
            <Select style={{ width: "100%",}}>
              <Select.Option value="hkd">Hongkong Dollar</Select.Option>
              <Select.Option value="idr">Indonesia Rupiah</Select.Option>
              <Select.Option value="krw">Korean Won</Select.Option>
              <Select.Option value="usd">US Dollar</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Form.Item name="RAWIN_Desc" label="Catatan">
            <TextArea rows={4} />
          </Form.Item>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="Kurs" label="Rate">
          <InputNumber min={1} max={999999999999}  onChange={onChange}  style={{width: "100%"}}/>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="DOC_Date" label="BC / Tanggal">
          <Select style={{width: "48%", marginRight: "2%"}}>
              <Select.Option value="bc">BC 1.0</Select.Option>
              {/* <Select.Option value="idr">Indonesia Rupiah</Select.Option>
              <Select.Option value="krw">Korean Won</Select.Option>
              <Select.Option value="usd">US Dollar</Select.Option> */}
              
            </Select>
            <DatePicker style={{width: "50%"}}/>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="DOC_NO" label="No Dokumen">
            <Input />
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="" label="No Aju">
            <Input />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item label="Pengirim">
            <Select>
              <Select.Option value="academy">Academy</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item label="No Kontrak">
            <Select>
              <Select.Option value="academy">Academy</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name='PO_NO' label="PO. Number">
            <Select>
              <Select.Option value="academy">PO Number</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="INV_NO" label="No. Invoice">
            <Input />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="BL_NO" label="BL. No">
            <Input />
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name='no_fp' label="No. FP">
            <Input />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="Negara_Asal" label="Asal Negara">
            <Select>
              <Select.Option value="CINA">Cina</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="Bruto" label="Gross Weight">
          <InputNumber min={1} max={999999999999}  onChange={onChange}  style={{width: "100%"}}/>
          </Form.Item>
          </Col>
          </Row>
          {/* <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Nama Vessel">
            <Input />
          </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item label="No. Voyage / Flight">
            <Input />
          </Form.Item>
          </Col>
          </Row> */}
          <Row>
          <Form.Item style={{width: "100%", display: "flex", justifyContent: "end"}}>
            <Button type="primary" htmlType="submit" loading={loading}>Add Data</Button>
          </Form.Item>
          {formData && <pre>{JSON.stringify(formData, null, 2)}</pre>}
          </Row>
        </Form>
      </>
    );
  };
const ModalComponent = ({ visible, closeModal }) => {
  
    return (
      <Modal
        title="Tambahkan Data Material"
        visible={visible}
        onCancel={closeModal}
        footer={false}
        width={1200}
        style={{
          top: 20,
        }}
      >
        <FormDisabledDemo/>
      </Modal>
    );
  };
  
  export default ModalComponent;