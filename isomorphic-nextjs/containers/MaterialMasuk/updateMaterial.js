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
  message,
  Table
} from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // Make sure to import moment
import EditableTable from './detailTable';
import { initializeApp } from 'firebase';
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
const ModalUpdateComponent = ({detailmutasi, initialData, onUpdate, onClose,onTableDataChange, updateid }) => {
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
  
  const [visible, setVisible] = useState(true)
  function generateRawinNo() {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year.toString().substr(2); // Get last two digits of the year
    const formattedCounter = counter.toString().padStart(4, '0'); // Pad the counter with leading zeros up to four digits
    return `IN/IKB/${formattedMonth}/${formattedYear}/${formattedCounter}`;
  }
// useEffect(() => {
//   setFormData(initialData.reduce((acc, obj) => {
//     acc[obj.fieldName] = obj.fieldValue;
//     return acc;
//   }, {}));
// }, [initialData]);
  // const updateRawinNo = () => {
  //   const newRawinNo = generateRawinNo();
  //   setRawinNo(newRawinNo);
  //   form.setFieldsValue({ RAWIN_NO: newRawinNo });
  // };
//styles endpoint
//styles endpoint
const Rawin = initialData.RAWIN_NO
const style = initialData.STYLE_PO
console.log('style', style)
console.log("rawin",Rawin)
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
        const addRow = (newRow) => {
          // Update the detailmutasi data with the new row
          const updatedDetailmutasi = [...detailmutasi, newRow];
      
          // Close the modal
          setVisible(false);
      
          // Call a function to update the parent component's state with the new data
          // For example, if detailmutasi is a state in the parent component
          // updateDetailmutasi(updatedDetailmutasi);
      
          // Or if you're using Redux, dispatch an action to update the state
          // dispatch(updateDetailmutasi(updatedDetailmutasi));
        };
  // const onFinish = async (values) => {
  //     // Implement the logic to update data in the backend using the formData state
  
  //     // Make a PUT request to your backend API
  //     const apiUrl = `http://192.168.1.21:3000/updateform/${initialData[0].RAWIN_NO}`; // Assuming the RAWIN_NO is part of the initialData
  //     axios.put(apiUrl, formData)
  //       .then((response) => {
  //         console.log("Data updated successfully!", response.data);
  //         message.success('Data updated successfully!');
  //         // Close the modal or take any other actions as needed
  //         onClose();
  //       })
  //       .catch((error) => {
  //         console.error('Failed to update data:', error);
  //         message.error('Failed to update data.');
  //       });
  // };
  const initialValues = {
    ...initialData,
    RAWIN_Date: moment(initialData.RAWIN_Date), // Assuming RAWIN_Date is a date field
    DOC_Date: moment(initialData.DOC_Date), // Assuming DOC_Date is a date field
  };

  form.setFieldsValue(initialValues);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Call the `onUpdate` prop with the values object containing updated data
      onUpdate(values);

      setLoading(false);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };
  console.log("initialDataisinya:",initialData)
  
  const columns = [
        {
      title: 'id ',
      dataIndex: 'id',
      key: 'id',
      editable: true,
      render: (text, record, index) => index + 1, 
    },
    {
      title: 'No Refrensi',
      dataIndex: 'RAWIN_NO',
      key: 'RAWIN_NO',
    },
    {
      title: 'Kode Barang',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
    },
    {
      title: 'Nama Barang',
      dataIndex: 'Nm_Brg',
      key: 'Nm_Brg',
    },
    {
      title: 'Description',
      dataIndex: '',
      key: '',
    },
    {
      title: 'Terima',
      dataIndex: '',
      key: '',
    },
    {
      title: 'Qty',
      dataIndex: 'Item_Qty',
      key: 'Item_Qty',
    },
    {
      title: 'Qty Masuk',
      dataIndex: 'IN_Qty',
      key: 'IN_Qty',
    },
    {
      title: 'Qty Adjust',
      dataIndex: 'Unit_Code_Origin',
      key: 'Unit_Code_Origin',
    },
    {
      title: 'Satuan',
      dataIndex: 'Unit_Code',
      key: 'Unit_Code',
    },
    {
      title: 'Packing Code',
      dataIndex: 'Packing_Code',
      key: 'Packing_Code',
    },
    {
      title: 'Packing Qty',
      dataIndex: 'Packing_Qty',
      key: 'Packing_Qty',
    },
    {
      title: 'Harga Beli',
      dataIndex: 'Harga_Beli',
      key: 'Harga_Beli',
    },
    {
      title: 'Kurs',
      dataIndex: '',
      key: '',
    },
    {
      title: 'Disc %',
      dataIndex: 'Disc_Brg_Percent',
      key: 'Disc_Brg_Percent',
    },
    {
      title: 'Jumlah Disc',
      dataIndex: 'Disc_Brg_Amount',
      key: 'Disc_Brg_Amount',
    },
    {
      title: 'Total',
      dataIndex: 'Sub_Total',
      key: 'Sub_Total',
    },
    {
      title: 'No. Aju',
      dataIndex: 'NO_AJU',
      key: 'NO_AJU',
    },
    {
      title: 'Jenis Dok. BC',
      dataIndex: 'DOC_Type',
      key: 'DOC_Type',
    },
    {
      title: 'Dok_Year',
      dataIndex: 'DOC_Year',
      key: 'DOC_Year',
    },
    {
      title: 'Nomor Dok. BC',
      dataIndex: 'DOC_No',
      key: 'DOC_No',
    },
    {
      title: 'Nomor Po',
      dataIndex: 'PO_NO_Manual',
      key: 'PO_NO_Manual',
    },
    {
      title: 'Net Weight',
      dataIndex: 'net_Weight',
      key: 'net_Weight',
    },
    {
      title: 'No Invoice',
      dataIndex: 'INV_NO',
      key: 'INV_NO',
    },
    {
      title: 'No. FP',
      dataIndex: 'NO_FP',
      key: 'NO_FP',
    },
    {
      title: 'Tgl. FP',
      dataIndex: 'DT_FP',
      key: 'DT_FP',
    },
    {
      title: 'Ditagihkan',
      dataIndex: '',
      key: '',
    },
  ];
    return (
      <div>
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
          form={form}  onFinish={handleSubmit} initialValues={initialData}
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
            <Form.Item name="RAWIN_Date" label="Tanggal Transaksi">
            <DatePicker style={{width: "100%"}}/>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="RAWIN_NO" label="No Refrensi">
          <Input style={{fontWeight: "bold"}} disabled/>
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
            <Select style={{ width: "100%",}} >
            {styles.map(style => (
        <Option key={style.Style} value={style.Style}>
          {style.Style}
        </Option>
      ))}
            </Select>
          </Form.Item>  
          </Col>  
          <Col span={8}>   
          {/* <Form.Item name={Gudang_Code} label="Gudang Code">
          <Select style={{ width: "100%",}} defaultValue={Gudang_Code}>
          {gudang.map(gudang => (
        <Option key={gudang.Gudang_Code} value={gudang.Gudang_Code}>
          {gudang.Gudang_Desc}
        </Option>
      ))}
            </Select>
      </Form.Item> */}
      <Form.Item name="Gudang_Code" label="Dikirim ke">
            <Select style={{ width: "100%",}} >
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
            <TextArea rows={4}  />
          </Form.Item>
          <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="Kurs" label="Rate">
          <InputNumber min={1} max={999999999999} onChange={onChange}  style={{width: "100%"}} />
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
            <DatePicker/>
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
            <Input/>
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
          <Form.Item name="PO_NO" label="PO. Number">
            <Select >
              <Select.Option value="academy">PO Number</Select.Option>
            </Select>
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="INV_NO" label="No. Invoice">
            <Input  />
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
          <Form.Item name="no_fp" label="No. FP">
            <Input  />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="Negara_Asal" label="Asal Negara">
            <Select >
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
          <InputNumber min={-999999999999} max={999999999999}  onChange={onChange}  style={{width: "100%"}}/>
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
          <Button type="primary" htmlType="submit" loading={loading}>Update</Button>
          </Form.Item>
          {/* {formData && <pre>{JSON.stringify(formData, null, 2)}</pre>} */}
          </Row>
          
        </Form>
        {/* <Table columns={columns} dataSource={detailmutasi}  scroll={{ x: 400 }}/>; */}
        <EditableTable generateid={updateid} detailmutasi={detailmutasi} RawIn={Rawin} style={style} fetchtable={onTableDataChange}  rawino={Rawin}/>
        </div>
    );
  };
  
  export default ModalUpdateComponent;