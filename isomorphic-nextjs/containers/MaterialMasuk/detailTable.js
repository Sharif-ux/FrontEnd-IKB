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

const EditableTable = ({ detailmutasi, addRow, rawino  }) => {
  const [form] = Form.useForm();
  const [editingKeys, setEditingKeys] = useState([]);
  const [newRow, setNewRow] = useState(null);
  const [showAddRowForm, setShowAddRowForm] = useState(false);



let rawinNo = rawino.RAWIN_NO
  
  // const handleAddRow = () => {
  //   const newRow = {
  //     id: '',
  //     RAWIN_NO: '',
  //     Kd_Brg: '',
  //     Nm_Brg: '', // Add default value for Nama Barang
  //     Item_Qty: '', // Add default value for Item Qty
  //     IN_Qty: '',
  //     Unit_Code_Origin: '',
  //     Unit_Code: '',
  //     Packing_Code: '',
  //     Packing_Qty: '',
  //     Harga_Beli: '',
  //     Disc_Brg_Percent: '',
  //     Disc_Brg_Amount: '',
  //     Sub_Total: '',
  //     NO_AJU: '',
  //     DOC_Type: '',
  //     DOC_Year: '',
  //     DOC_No: '',
  //     PO_NO_Manual: '',
  //     net_Weight: '',
  //     Gudang_Code: '',
  //     INV_NO: '',
  //     NO_FP: '',
  //     DT_FP: '',
  //       // ... initialize other properties with default values ...
  //     };

  //   addRow(newRow); // Call the addRow function from props
  // };
  const handleAddRowFormSubmit = async () => {
    try {
      const newRecordData = await form.validateFields();

      // Send a POST request to the API endpoint to add a new row
      await axios.post('http://localhost:3000/detailRawiIN', newRecordData);

      // Refresh data from the server or update local state with the new data

      setNewRow(null);
      setShowAddRowForm(false);
    } catch (error) {
      console.log('Add row failed:', error);
    }
  };
  const isEditing = (record) => editingKeys.includes(record.id);
  const addNewRow = () => {
    // Initialize the new row data
    const tempId = -(detailmutasi.length + 1);
    setNewRow({
      id: tempId,
      RAWIN_NO: rawinNo, // Set your default value for RAWIN_NO
      Kd_Brg: '',
      Nm_Brg: '', // Add default value for Nama Barang
      Item_Qty: '', // Add default value for Item Qty
      IN_Qty: '',
      Unit_Code_Origin: '',
      Unit_Code: '',
      Packing_Code: '',
      Packing_Qty: '',
      Harga_Beli: '',
      Disc_Brg_Percent: '',
      STYLE_PO: '',
      Disc_Brg_Amount: '',
      Sub_Total: '',
      NO_AJU: '',
      DOC_Type: '',
      DOC_Year: '',
      DOC_No: '',
      PO_NO_Manual: '',
      net_Weight: '',
      Gudang_Code: '', // Add default value for Gudang Code
      INV_NO: '',
      NO_FP: '',
      DT_FP: '',
    });
    setShowAddRowForm(true);
  };
  
  const renderEditableCell = (record, dataIndex) => {
    const isEditingRow = isEditing(record) || newRow?.id === record.id;
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
  render: (_, record) => renderEditableCell(record, 'id'),
},
{
  title: 'No Refrensi',
  dataIndex: 'RAWIN_NO',
  key: 'RAWIN_NO',
  render: (_, record) => renderEditableCell(record, 'RAWIN_NO'),
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
  title: 'Style',
  dataIndex: 'STYLE_PO',
  key: 'STYLE_PO',
  // render: (_, record) => renderEditableCell(record, 'STYLE_PO'),
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
   <Button onClick={addNewRow}>Add Row</Button>
      {showAddRowForm && (
        <div>
          {/* Render your form inputs for adding a new row */}
          {/* Use form input components like Input, InputNumber, etc. */}
          <Button onClick={handleAddRowFormSubmit}>Submit</Button>
          <Button onClick={() => setShowAddRowForm(false)}>Cancel</Button>
        </div>
      )}
    <Form form={form} component={false}>
      <Table
        dataSource={newRow ? [...detailmutasi, newRow] : detailmutasi}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: 400 }}
      />
    </Form>
    </Form>
      );
};

export default EditableTable;
