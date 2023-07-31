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
import { useState, useEffect } from 'react';
import axios from 'axios';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const onChange = (value) => {
    console.log('changed', value);
  };
  const testvalue = 'IN/IKB/21/03/0001'
const ModalUpdateComponent = ({ visible, closeModal, initialData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Add 1 because getMonth() returns zero-based index
  const [year, setYear] = useState(new Date().getFullYear());
  const [counter, setCounter] = useState(1);
  const [rawinNo, setRawinNo] = useState(generateRawinNo());
  const [styles, setStyles] = useState([]);
  const [curr, setCurr] = useState([]);
  const [pengirim, setPengirim] = useState([]);
  const [kontrak, setKontrak] = useState([]);
  const [negara, setNegara] = useState([]);
  const [gudang, setGudang] = useState([]);
  const [doctype, setDoctype] = useState([]);
  const [formData, setFormData] = useState(initialData);
  function generateRawinNo() {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year.toString().substr(2); // Get last two digits of the year
    const formattedCounter = counter.toString().padStart(4, '0'); // Pad the counter with leading zeros up to four digits
    return `IN/IKB/${formattedMonth}/${formattedYear}/${formattedCounter}`;
  }
useEffect(() => {
  setFormData(initialData.reduce((acc, obj) => {
    acc[obj.fieldName] = obj.fieldValue;
    return acc;
  }, {}));
}, [initialData]);
  const updateRawinNo = () => {
    const newRawinNo = generateRawinNo();
    setRawinNo(newRawinNo);
    form.setFieldsValue({ RAWIN_NO: newRawinNo });
  };
//styles endpoint
  useEffect(() => {
    axios.get('http://localhost:3000/stylesform')
      .then(response => {
        setStyles(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
//curr desc endpoint
  useEffect(() => {
    axios.get('http://localhost:3000/currdescform')
      .then(response => {
        setCurr(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //pengirim endpoint
  useEffect(() => {
    axios.get('http://localhost:3000/shipnameform')
      .then(response => {
        setPengirim(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    //kontrak endpoint
  useEffect(() => {
    axios.get('http://localhost:3000/kontrakform')
      .then(response => {
        setKontrak(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    //negara endpoint
    useEffect(() => {
      axios.get('http://localhost:3000/negaraform')
        .then(response => {
          setNegara(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
    //gudang endpoint
    // useEffect(() => {
    //   axios.get('http://localhost:3000/gudangform')
    //     .then(response => {
    //       setGudang(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //     });
    // }, []);

        //bc endpoint
        useEffect(() => {
          axios.get('http://localhost:3000/bcform')
            .then(response => {
              setDoctype(response.data);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        }, []);
        
  const onFinish = async (values) => {
      // Implement the logic to update data in the backend using the formData state
  
      // Make a PUT request to your backend API
      const apiUrl = `http://192.168.1.21:3000/updateform/${initialData[0].RAWIN_NO}`; // Assuming the RAWIN_NO is part of the initialData
      axios.put(apiUrl, formData)
        .then((response) => {
          console.log("Data updated successfully!", response.data);
          message.success('Data updated successfully!');
          // Close the modal or take any other actions as needed
          onClose();
        })
        .catch((error) => {
          console.error('Failed to update data:', error);
          message.error('Failed to update data.');
        });
  };
  const handleGetFormValues = () => {
    const values = form.getFieldsValue();
    console.log('Form values:', values);
    // You can use the form values as needed.
  };
    return (
      <Modal
        title={`Update Data Material`}
        visible={visible}
        onCancel={closeModal}
        footer={false}
        width={1200}
        style={{
          top: 20,
        }}
      >
         {initialData.map((item) => (
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
          initialValues={formData}
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
            <Form.Item name={item.RAWIN_Date} label="Tanggal Transaksi">
            <DatePicker style={{width: "100%"}} placeholder={item.RAWIN_Date}/>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name={item.RAWIN_NO} label="No Refrensi">
          <Input defaultValue={item.RAWIN_NO}/>
          </Form.Item>  
          </Col> 
          <Col span={8}>  
          <Form.Item name={item.RAWIN_Type} label="Jenis Transaksi" >
            <Select  style={{ width: "100%",}} defaultValue={item.RAWIN_Type}>
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
          <Form.Item name={item.STYLE} label="Style">
            <Select style={{ width: "100%",}} defaultValue={item.STYLE}>
            {styles.map(style => (
        <Option key={style.Style} value={style.Style}>
          {style.Style}
        </Option>
      ))}
            </Select>
          </Form.Item>  
          </Col>  
          <Col span={8}>   
          <Form.Item name="Gudang_Code" label="Gudang Code">
        <Input />
      </Form.Item>
          </Col>
          <Col span={8}> 
          <Form.Item name={item.Currency_Code} label="Jenis Uang">
            <Select style={{ width: "100%",}} defaultValue={item.Currency_Code}>
            {curr.map(curr => (
        <Option key={curr.Uang_Code} value={curr.Uang_Code}>
          {curr.Uang_Desc}
        </Option>
      ))}
            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Form.Item name={item.RAWIN_Desc} label="Catatan">
            <TextArea rows={4}  defaultValue={item.RAWIN_Desc}/>
          </Form.Item>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={item.Kurs} label="Rate">
          <InputNumber min={1} max={999999999999} onChange={onChange}  style={{width: "100%"}} defaultValue={item.Kurs}/>
          </Form.Item>
          </Col>
          <Col span={10}>
            <Row gutter='1'>
              <Col sm={12} md={12} lg={12}>
          <Form.Item name={item.DOC_Type} label="BC / Tanggal">
          <Select defaultValue={item.DOC_Type}>
              <Select.Option value="bc">BC 1.0</Select.Option>
              {doctype.map(doctype => (
        <Option key={doctype.Doc_Type} value={doctype.Doc_Type}>
       {doctype.Doc_Type}   ||  {doctype.Doc_Desc}
        </Option>
      ))}
            </Select>
            </Form.Item>
            </Col>
            <Col sm={12} md={12} lg={12}>
            <Form.Item name={item.DOC_Date}>
            <DatePicker placeholder={item.DOC_Date}/>
          </Form.Item>
          </Col>
          </Row>
          </Col>
          <Col span={6}>
          <Form.Item name={item.DOC_NO} label="No Dokumen">
            <Input defaultValue={item.DOC_NO}/>
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={7}>
          <Form.Item name={item.NO_REG} label="No Aju">
            <Input defaultValue={item.NO_REG}/>
          </Form.Item>
          </Col>
          <Col span={7}>
          <Form.Item name={item.Pengirim} label="Pengirim">
            <Select defaultValue={item.Pengirim}>
            {pengirim.map(pengirim => (
        <Option key={pengirim.Ship_Code} value={pengirim.Ship_Code}>
       {pengirim.Ship_Code}   ||  {pengirim.Ship_Name}
        </Option>
      ))}
            </Select>
          </Form.Item>
          </Col>
          <Col span={10}>
          <Form.Item name={item.Kontrak}label="No Kontrak">
            <Select defaultValue={item.Kontrak}>
            {kontrak.map(kontrak => (
        <Option key={kontrak.Kontrak} value={kontrak.Kontrak}>
       {kontrak.Kontrak}
        </Option>
      ))}
            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={item.PO_NO} label="PO. Number">
            <Select defaultValue={item.PO_NO}>
              <Select.Option value="academy">PO Number</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name={item.INV_NO} label="No. Invoice">
            <Input  defaultValue={item.INV_NO}/>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name={item.BL_NO} label="BL. No">
            <Input defaultValue={item.BL_NO}/>
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={item.no_fp} label="No. FP">
            <Input  defaultValue={item.no_fp}/>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name={item.Negara_Asal} label="Asal Negara">
            <Select defaultValue={item.Negara_Asal}>
            {negara.map(negara => (
        <Option key={negara.Negara} value={negara.Negara}>
       {negara.Negara}
        </Option>
      ))}
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name={item.Bruto} label="Gross Weight">
          <InputNumber min={-999999999999} max={999999999999}  onChange={onChange} defaultValue={item.Bruto} style={{width: "100%"}}/>
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
            <Button type="primary" htmlType="submit" onClick={handleGetFormValues} loading={loading}>Add Data</Button>
          </Form.Item>
          {/* {formData && <pre>{JSON.stringify(formData, null, 2)}</pre>} */}
          </Row>
        </Form>
                ))}
      </Modal>
    );
  };
  
  export default ModalUpdateComponent;