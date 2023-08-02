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

const FormDisabledDemo = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
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
  const [generatedRAWIN_NO, setGeneratedRAWIN_NO] = useState('');

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
    useEffect(() => {
      axios.get('http://localhost:3000/gudangform')
        .then(response => {
          setGudang(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

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
  // const onFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('http://localhost:3000/submitform', values);
  //     if (response.status === 200) {

  //       message.success('Data inserted successfully!');
  //       form.resetFields();
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     message.error('Failed to insert data into the database.');
  //   }
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   // Fetch data from your Express.js server
  //   fetch('http://localhost:3000/submitform')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Once you have the data, set the state with the generatedRAWIN_NO
  //       setGeneratedRAWIN_NO(data.generatedRAWIN_NO);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // const onFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     // Submit the form without the generatedRAWIN_NO
  //     const response = await axios.post('http://localhost:3000/submitform', values);
  //     if (response.status === 200) {
  //       message.success('Data inserted successfully!');
  //       form.resetFields();
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     message.error('Failed to insert data into the database.');
  //   }
  //   setLoading(false);
  // };
  useEffect(() => {
    // Fetch data from your Express.js server
    fetch('http://localhost:3000/submitform')
      .then((response) => response.json())
      .then((data) => {
        // Once you have the data, set the state with the generatedRAWIN_NO
        setGeneratedRAWIN_NO(data.generatedRAWIN_NO);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run only once on component mount
console.log(generatedRAWIN_NO)
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Submit the form with the generatedRAWIN_NO
      const response = await axios.post('http://localhost:3000/submitform', {
        ...values,
        RAWIN_NO: generatedRAWIN_NO // Include the generatedRAWIN_NO in the form submission
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
          <Input value={generatedRAWIN_NO} readOnly />
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
            {styles.map(style => (
        <Option key={style.Style} value={style.Style}>
          {style.Style}
        </Option>
      ))}
            </Select>
          </Form.Item>  
          </Col>  
          <Col span={8}>      
          <Form.Item name="Gudang_Code" label="Dikirim ke">
            <Select>
            {gudang.map(gudang => (
        <Option key={gudang.Gudang_Code} value={gudang.Gudang_Code}>
       {gudang.Gudang_Desc}
        </Option>
      ))}
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}> 
          <Form.Item name="Currency_Code" label="Jenis Uang">
            <Select style={{ width: "100%",}}>
            {curr.map(curr => (
        <Option key={curr.Uang_Code} value={curr.Uang_Code}>
          {curr.Uang_Desc}
        </Option>
      ))}
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
          <InputNumber min={1} max={999999999999} onChange={onChange}  style={{width: "100%"}}/>
          </Form.Item>
          </Col>
          <Col span={10}>
            <Row gutter='1'>
              <Col sm={12} md={12} lg={12}>
          <Form.Item name="DOC_Type" label="BC / Tanggal">
          <Select>
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
            <Form.Item name="DOC_Date">
            <DatePicker />
          </Form.Item>
          </Col>
          </Row>
          </Col>
          <Col span={6}>
          <Form.Item name="DOC_NO" label="No Dokumen">
            <Input />
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={7}>
          <Form.Item name="NO_REG" label="No Aju">
            <Input />
          </Form.Item>
          </Col>
          <Col span={7}>
          <Form.Item name="Ship_Code" label="Pengirim">
            <Select>
            {pengirim.map(pengirim => (
        <Option key={pengirim.Ship_Code} value={pengirim.Ship_Code}>
       {pengirim.Ship_Code}   ||  {pengirim.Ship_Name}
        </Option>
      ))}
            </Select>
          </Form.Item>
          </Col>
          <Col span={10}>
          <Form.Item name="Kontrak" label="No Kontrak">
            <Select>
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
            {negara.map(negara => (
        <Option key={negara.Negara} value={negara.Negara}>
       {negara.Negara}
        </Option>
      ))}
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