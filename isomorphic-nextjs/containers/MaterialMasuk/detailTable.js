import React, { useState } from 'react';
import { Table, Input, InputNumber, Button, Form } from 'antd';
import axios from 'axios';
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  form,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          // rules={[
          //   {
          //     required: true,
          //     message: `Please Input ${title}!`,
          //   },
          // ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        restProps.children
      )}
    </td>
  );
};

const EditableTable = ({disabledtoclosemodal, detailmutasi, fetchtable, RawIn, updateid }) => {
  const [form] = Form.useForm();
  const [editingKeys, setEditingKeys] = useState([]);

  const isEditing = (record) => editingKeys.includes(record.id);

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKeys([...editingKeys, record.id]);
  };
  const cancel = (record) => {
    setEditingKeys(editingKeys.filter((key) => key !== record.id));
  };
console.log('updateid',updateid)
  const save = async (record) => {
    try {
      const updatedData = await form.validateFields();

      await axios.put(`http://localhost:3000/updatedetailmutasi/${record.RAWIN_NO}/${record.id}`, updatedData);
      fetchtable()
      const newEditingKeys = editingKeys.filter((key) => key !== record.id);
      setEditingKeys(newEditingKeys);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  const executeStoredProc = async (record) => {
    const RAWIN_NO =  RawIn
    try {
      const response = await axios.get('http://localhost:3000/updateIdForRAWIN', {
        params: {
          RAWIN_NO,
        },
      });
      console.log("dalem sp upid",RAWIN_NO)
      // setMessage(response.data.message);
      console.log('disini store proc nya:', response.data);
    } catch (error) {
      console.error('gabisa store proc:', error);
    }
  };
  
    const handleDelete = async (record) => {
      try {
        // Send a DELETE request to the API endpoint to delete the row
        await axios.delete(`http://localhost:3000/deleterawdetail/${record.id}/${record.RAWIN_NO}`);
  
        // Call the callback function to refresh the table data
        console.log('Calling onTableDataChange...');
        const newEditingKeys = editingKeys.filter((key) => key !== record.id);
        executeStoredProc()
        setEditingKeys(newEditingKeys);
        fetchtable()
      } catch (error) {
        console.log('Delete failed:', error);
      }
    };
  console.log("test",RawIn)
  const renderEditableCell = (record, dataIndex) => {
    const isEditingRow = isEditing(record) 
    return isEditingRow ? (
      <EditableCell
        editing={isEditingRow}
        dataIndex={dataIndex}
        title={columns.find((col) => col.dataIndex === dataIndex).title}
        inputType={columns.find((col) => col.dataIndex === dataIndex).inputType || 'text'}
        record={record}
        form={form}
      />
    ) : (
      record[dataIndex]
    );
  };
  const handleAddRow = async () => {
    const generateId = detailmutasi.length + 1 
    const generateRAWIN = detailmutasi.RAWIN_NO
    try {
      const newRowData = {
      //   "id": generateId,
      //   "RAWIN_NO": RawIn,
      //   "DOC_Year": "2020",
      //   "DOC_NO": "123123",
      // //   "STYLE_PO" : "123123",
      //   "DOC_Type" : "123123",
      //   "Kd_Brg": "12323",
      //   "Gudang_Code": "GD001",
      //   "Item_Qty": 100,
      //   "NO_AJU": "21121",
      //   "IN_Qty": 90,
      //   "Harga_Beli": 50.25,
      //   "Disc_Brg_Percent": 10,
      //   "Disc_Brg_Amount": 5.00,
      //   "Sub_Total": 4500.00
        id: generateId,
        RAWIN_NO: RawIn,
        DOC_Year: " ",
        DOC_NO: " ",
      //   "STYLE_PO" : "123123",
        DOC_Type : " ",
        Kd_Brg: ' ',
        Gudang_Code: ' ',
        Item_Qty: 0,
        NO_AJU: " ",
        IN_Qty: 0,
        Harga_Beli: 0,
        Disc_Brg_Percent: 0,
        Disc_Brg_Amount: 0,
        Sub_Total: 0
      }

      const updatedDetailMutasi = [...detailmutasi, newRowData];
      // Add the new row's ID to the editingKeys
      const newEditingKeys = [...editingKeys, generateId];

      // Update the state to include the new row in edit mode
      setEditingKeys(newEditingKeys);

      // Make an HTTP POST request to add the new row to the backend
      await axios.post('http://localhost:3000/detailRawiIN', newRowData);
  //exec sp to upd id 
      executeStoredProc()
     // Fetch updated data after adding a new row
      fetchtable();
    } catch (error) {
      console.error('Error adding new row:', error);
    }
  };
  const columns = [
    {
  title: 'no ',
  dataIndex: 'index',
  // key: 'id',
  // editable: true,
  render: (text, record, index) => index + 1,
},
{
  title: 'No Refrensi',
  dataIndex: 'RAWIN_NO',
  key: 'RAWIN_NO',
  // render: (_, record) => renderEditableCell(record, 'RAWIN_NO'),
},
{
  title: 'Style',
  dataIndex: 'STYLE_PO',
  key: 'STYLE_PO',
  render: (_, record) => renderEditableCell(record, 'STYLE_PO'),
},
{
  title: 'Kode Barang',
  dataIndex: 'Kd_Brg',
  key: 'Kd_Brg',
  render: (_, record) => renderEditableCell(record, 'Kd_Brg'),

},
{
  title: 'Nama Barang',
  dataIndex: 'Nm_Brg',
  key: 'Nm_Brg',
  render: (_, record) => renderEditableCell(record, 'Nm_Brg'),
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
  render: (_, record) => renderEditableCell(record, 'Item_Qty'),
},

{
  title: 'Qty Masuk',
  dataIndex: 'IN_Qty',
  key: 'IN_Qty',
  render: (_, record) => renderEditableCell(record, 'IN_Qty'),
},
{
  title: 'Qty Adjust',
  dataIndex: 'Unit_Code_Origin',
  key: 'Unit_Code_Origin',
  // editable: true,
},
{
  title: 'Satuan',
  dataIndex: 'Unit_Code',
  key: 'Unit_Code',
  // editable: true,
},
{
  title: 'Packing Code',
  dataIndex: 'Packing_Code',
  key: 'Packing_Code',
  // editable: true,
},
{
  title: 'Packing Qty',
  dataIndex: 'Packing_Qty',
  key: 'Packing_Qty',
  // editable: true,
},
{
  title: 'Harga Beli',
  dataIndex: 'Harga_Beli',
  key: 'Harga_Beli',
  render: (_, record) => renderEditableCell(record, 'Harga_Beli'),

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
  render: (_, record) => renderEditableCell(record, 'Disc_Brg_Percent'),
},
{
  title: 'Jumlah Disc',
  dataIndex: 'Disc_Brg_Amount',
  key: 'Disc_Brg_Amount',
  render: (_, record) => renderEditableCell(record, 'Disc_Brg_Amount'),
},
{
  title: 'Total',
  dataIndex: 'Sub_Total',
  key: 'Sub_Total',
  render: (_, record) => renderEditableCell(record, 'Sub_Total'),
},
{
  title: 'No. Aju',
  dataIndex: 'NO_AJU',
  key: 'NO_AJU',
  // editable: true,
},
{
  title: 'Jenis Dok. BC',
  dataIndex: 'DOC_Type',
  key: 'DOC_Type',
  // editable: true,
},
{
  title: 'Dok_Year',
  dataIndex: 'DOC_Year',
  key: 'DOC_Year',
  // editable: true,
  render: (_, record) => renderEditableCell(record, 'DOC_Year'),
},
{
  title: 'Nomor Dok. BC',
  dataIndex: 'DOC_No',
  key: 'DOC_No',
  // editable: true,
},
{
  title: 'Nomor Po',
  dataIndex: 'PO_NO_Manual',
  key: 'PO_NO_Manual',
  // editable: true,
},
{
  title: 'Net Weight',
  dataIndex: 'net_Weight',
  key: 'net_Weight',
  // editable: true,
},
{
  title: 'Gudang Code',
  dataIndex: 'Gudang_Code',
  key: 'Gudang_Code',
  render: (_, record) => renderEditableCell(record, 'Gudang_Code'),
},
{
  title: 'No Invoice',
  dataIndex: 'INV_NO',
  key: 'INV_NO',
  // editable: true,
},
{
  title: 'No. FP',
  dataIndex: 'NO_FP',
  key: 'NO_FP',
  // editable: true,
},
{
  title: 'Tgl. FP',
  dataIndex: 'DT_FP',
  key: 'DT_FP',
  // editable: true,
},
{
  title: 'Ditagihkan',
  dataIndex: '',
  key: '',
},
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" onClick={() => {save(record) }}>
              Save
            </Button>
            <Button onClick={() => cancel(record)}>Cancel</Button>
          </span>
        ) : (
          <div>
          <Button onClick={() => edit(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record)}>Delete</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
<Button type="primary" onClick={() => {handleAddRow();  executeStoredProc();}}>
        Add Row
      </Button>
      <Table
        dataSource={ detailmutasi}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: 400 }}
      />
    </Form>
  );
};

export default EditableTable;