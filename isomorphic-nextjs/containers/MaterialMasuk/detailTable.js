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
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        restProps.children
      )}
    </td>
  );
};

const EditableTable = ({ detailmutasi }) => {
  const [form] = Form.useForm();
  const [editingKeys, setEditingKeys] = useState([]);
  const renderEditableCell = (record, dataIndex) => {
    const isEditing = editingKeys.includes(record.id);
    return isEditing ? (
      <EditableCell
        editing={true} // Always pass true when rendering the cell in edit mode
        dataIndex={dataIndex}
        title={columns.find((col) => col.dataIndex === dataIndex).title} // Get the column title
        inputType={columns.find((col) => col.dataIndex === dataIndex).inputType || 'text'} // Get the input type
        record={record}
        form={form}
      />
    ) : (
      record[dataIndex] // Display the default value from the record
    );
  };
  
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
  
  const save = async (record) => {
    try {
      const updatedData = await form.validateFields();
  
      // Send a PUT request to the API endpoint with the updated data
      await axios.put(`http://localhost:3000/updatedetailmutasi/${record.RAWIN_NO}/${record.id}`, updatedData);
  
      const newEditingKeys = editingKeys.filter((key) => key !== record.id);
      setEditingKeys(newEditingKeys);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  
   const handleDelete = async (record) => {
    try {
      // Send a DELETE request to the API endpoint to delete the row
      await axios.delete(`http://localhost:3000/deleterawdetail/${record.id}/${record.RAWIN_NO}`);

      // Update the state to reflect the deletion
      // You might need to refresh the data from the server if needed
      // For example: fetchUpdatedData();
      detailmutasi()
      const newEditingKeys = editingKeys.filter((key) => key !== record.id);
      setEditingKeys(newEditingKeys);
    } catch (error) {
      console.log('Delete failed:', error);
    }
  };
  const columns = [
    {
  title: 'id ',
  dataIndex: 'id',
  key: 'id',
  // editable: true,
  render: (text, record, index) => index + 1, 
},
{
  title: 'No Refrensi',
  dataIndex: 'RAWIN_NO',
  key: 'RAWIN_NO',
  editable: true,
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
        title: 'Item Qty',
        dataIndex: 'Item_Qty',
        key: 'Item_Qty',
        // render: (_, record) => renderEditableCell(record, 'Item_Qty'),
      },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record)}>
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
      <Table
        dataSource={detailmutasi}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: 400 }}
      />
    </Form>
  );
};

export default EditableTable;
