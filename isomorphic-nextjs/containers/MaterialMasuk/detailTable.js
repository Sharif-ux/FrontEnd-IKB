import React, { useState } from 'react';
import { Table, Button, Input, InputNumber, Form, Popconfirm } from 'antd';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
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
        children
      )}
    </td>
  );
};

const NewRowTable = ({ detailmutasi }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(detailmutasi);
  const [editingKey, setEditingKey] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  // const columns = [
  //   {
  //     title: 'No',
  //     dataIndex: 'id',
  //     key: 'id',
  //     editable: false,
  //     render: (text, record, index) => index + 1,
  //   },
  //   {
  //     title: 'No Refrensi',
  //     dataIndex: 'RAWIN_NO',
  //     key: 'RAWIN_NO',
  //     editable: true,
  //   },
  //   {
  //     title: 'Kode Barang',
  //     dataIndex: 'Kd_Brg',
  //     key: 'Kd_Brg',
  //     editable: true,
  //   },
  //   {
  //     title: 'Nama Barang',
  //     dataIndex: 'Nm_Brg',
  //     key: 'Nm_Brg',
  //     editable: true,
  //   },
  //   // Add other columns here...

  //   // The last two columns should have unique dataIndex and key, even if they are empty
  //   {
  //     title: 'Ditagihkan',
  //     dataIndex: 'Ditagihkan',
  //     key: 'Ditagihkan',
  //     editable: true,
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (_, record) => {
  //       const editable = isEditing(record);
  //       return editable ? (
  //         <span>
  //           <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
  //             Save
  //           </Button>
  //           <Button onClick={cancel}>Cancel</Button>
  //         </span>
  //       ) : (
  //         <span>
  //           <Button type="primary" onClick={() => edit(record.key)} style={{ marginRight: 8 }}>
  //             Edit
  //           </Button>
  //           <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
  //             <Button type="danger">Delete</Button>
  //           </Popconfirm>
  //         </span>
  //       );
  //     },
  //   },
  // ];
 
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
{
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button type="primary" onClick={() => edit(record.key)} style={{ marginRight: 8 }}>
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
];
  const edit = (key) => {
    setEditingKey(key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAddRow = () => {
    const newRow = {
      key: `new-${data.length}`,
      RAWIN_NO: '',
      Kd_Brg: '',
      Nm_Brg: '',
      // Initialize other column data as needed...
      Ditagihkan: '',
    };
    setData([...data, newRow]);
    edit(`new-${data.length}`);
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'IN_Qty' ? 'number' : 'text', // Example: Change input type for 'IN_Qty' column
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Button onClick={handleAddRow} style={{ marginRight: 8 }}>
        Add Row
      </Button>
      <Button type="primary" onClick={() => edit(`new-${data.length}`)}>
        Edit
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          rowSelection={rowSelection}
          scroll={{ x: 400 }}
        />
      </Form>
    </>
  );
};

export default NewRowTable;
