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
  Select,
  Switch,
  TreeSelect,
  Upload,
  Modal
} from 'antd';
import { useState } from 'react';
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
  const handleSubmit = (values) => {
    setFormData(values);
  };
    return (
      <>

        <Form
          labelCol={{
            span: 4,
          }}
        //   wrapperCol={{
        //     span: 14,
        //   }}
          layout="horizontal"
          style={{
            Width: "100%",
          }}
          form={form} onFinish={handleSubmit}
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
                    <Form.Item label="DatePicker">
            <DatePicker style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item label="No Refrensi">
            <Input />
          </Form.Item>
          <Form.Item label="Jenis Transaksi">
            <Select>
              <Select.Option value="normal">Normal</Select.Option>
              <Select.Option value="cmtin">Subcon/CMT IN</Select.Option>
              <Select.Option value="cmtout">Subcon/CMT OUT</Select.Option>
              <Select.Option value="wip">WIP</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Style">
            <Select>
              <Select.Option value="normal">YMNNMN</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Dikirim ke">
            <Select>
              <Select.Option value="gudangdasan">Gudang Dasan</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Jenis Uang">
            <Select>
              <Select.Option value="hkd">Hongkong Dollar</Select.Option>
              <Select.Option value="idr">Indonesia Rupiah</Select.Option>
              <Select.Option value="krw">Korean Won</Select.Option>
              <Select.Option value="usd">US Dollar</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Catatan">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Rate">
          <InputNumber min={1} max={999999999999}  onChange={onChange}  style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item label="BC / Tanggal">
          <Select style={{width: "48%", marginRight: "2%"}}>
              <Select.Option value="bc">BC 1.0</Select.Option>
              {/* <Select.Option value="idr">Indonesia Rupiah</Select.Option>
              <Select.Option value="krw">Korean Won</Select.Option>
              <Select.Option value="usd">US Dollar</Select.Option> */}
              
            </Select>
            <DatePicker style={{width: "50%"}}/>
          </Form.Item>
          <Form.Item label="No Dokumen">
            <Input />
          </Form.Item>
          <Form.Item label="No Aju">
            <Input />
          </Form.Item>
          <Form.Item label="Pengirim">
            <Select>
              <Select.Option value="academy">Academy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="No Kontrak">
            <Select>
              <Select.Option value="academy">Academy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="PO. Number">
            <Select>
              <Select.Option value="academy">PO Number</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="No. Invoice">
            <Input />
          </Form.Item>
          <Form.Item label="BL. No">
            <Input />
          </Form.Item>
          <Form.Item label="No. FP">
            <Input />
          </Form.Item>
          <Form.Item label="Asal Negara">
            <Select>
              <Select.Option value="academy">PO Number</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Gross Weight">
          <InputNumber min={1} max={999999999999}  onChange={onChange}  style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item label="Nama Vessel">
            <Input />
          </Form.Item>
          <Form.Item label="No. Voyage / Flight">
            <Input />
          </Form.Item>
         
          <Form.Item style={{width: "100%", display: "flex", justifyContent: "end"}}>
            <Button type="primary" htmlType="submit">Add Data</Button>
          </Form.Item>
          {formData && <pre>{JSON.stringify(formData, null, 2)}</pre>}
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
        width={800}
      >
        <FormDisabledDemo/>
      </Modal>
    );
  };
  
  export default ModalComponent;