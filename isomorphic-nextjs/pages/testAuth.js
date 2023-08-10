
import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import axios from 'axios'; // Import axios for making HTTP requests

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState(''); // Track currently editing row key
  const [temporaryData, setTemporaryData] = useState([]); // State for temporary data storage

  const columns = [
    {
  title: 'no ',
  dataIndex: 'id',
  key: 'id',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'id'),
  width: 700  ,
},
{
  title: 'No Refrensi',
  dataIndex: 'RAWIN_NO',
  key: 'RAWIN_NO',
  render: (text, record) => renderCell(text, record, 'RAWIN_NO'),
},
{
  title: 'Style',
  dataIndex: 'STYLE_PO',
  key: 'STYLE_PO',
  render: (text, record) => renderCell(text, record, 'STYLE_PO'),
},
{
  title: 'Kode Barang',
  dataIndex: 'Kd_Brg',
  key: 'Kd_Brg',
  render: (text, record) => renderCell(text, record, 'Kd_Brg'),
},
{
  title: 'Nama Barang',
  dataIndex: 'Nm_Brg',
  key: 'Nm_Brg',
  // render: (text, record) => renderCell(text, record, 'Nm_Brg'),
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
  render: (text, record) => renderCell(text, record, 'Item_Qty'),
},

{
  title: 'Qty Masuk',
  dataIndex: 'IN_Qty',
  key: 'IN_Qty',
  render: (text, record) => renderCell(text, record, 'IN_Qty'),
},
{
  title: 'Qty Adjust',
  dataIndex: 'Unit_Code_Origin',
  key: 'Unit_Code_Origin',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'Unit_Code_Origin'),
},
{
  title: 'Satuan',
  dataIndex: 'Unit_Code',
  key: 'Unit_Code',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'Unit_Code'),
},
{
  title: 'Packing Code',
  dataIndex: 'Packing_Code',
  key: 'Packing_Code',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'Packing_Code'),
},
{
  title: 'Packing Qty',
  dataIndex: 'Packing_Qty',
  key: 'Packing_Qty',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'Packing_Qty'),
},
{
  title: 'Harga Beli',
  dataIndex: 'Harga_Beli',
  key: 'Harga_Beli',
  render: (text, record) => renderCell(text, record, 'Harga_Beli'),
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
  render: (text, record) => renderCell(text, record, 'Disc_Brg_Percent'),
},
{
  title: 'Jumlah Disc',
  dataIndex: 'Disc_Brg_Amount',
  key: 'Disc_Brg_Amount',
  render: (text, record) => renderCell(text, record, 'Disc_Brg_Amount'),
},
{
  title: 'Total',
  dataIndex: 'Sub_Total',
  key: 'Sub_Total',
  render: (text, record) => renderCell(text, record, 'Sub_Total'),
},
{
  title: 'No. Aju',
  dataIndex: 'NO_AJU',
  key: 'NO_AJU',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'NO_AJU'),
},
{
  title: 'Jenis Dok. BC',
  dataIndex: 'DOC_Type',
  key: 'DOC_Type',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'DOC_Type'),
},
{
  title: 'Dok_Year',
  dataIndex: 'DOC_Year',
  key: 'DOC_Year',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'DOC_Year'),
},
{
  title: 'Nomor Dok. BC',
  dataIndex: 'DOC_No',
  key: 'DOC_No',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'DOC_No'),
},
{
  title: 'Nomor Po',
  dataIndex: 'PO_NO_Manual',
  key: 'PO_NO_Manual',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'PO_NO_Manual'),
},
{
  title: 'Net Weight',
  dataIndex: 'net_Weight',
  key: 'net_Weight',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'net_Weight'),
},
{
  title: 'Gudang Code',
  dataIndex: 'Gudang_Code',
  key: 'Gudang_Code',
  render: (text, record) => renderCell(text, record, 'Gudang_Code'),
},
{
  title: 'No Invoice',
  dataIndex: 'INV_NO',
  key: 'INV_NO',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'INV_NO'),
},
{
  title: 'No. FP',
  dataIndex: 'NO_FP',
  key: 'NO_FP',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'NO_FP'),

},
{
  title: 'Tgl. FP',
  dataIndex: 'DT_FP',
  key: 'DT_FP',
  // editable: true,
  render: (text, record) => renderCell(text, record, 'DT_FP'),

},
{
  title: 'Ditagihkan',
  dataIndex: '',
  key: '',
},
  ];

  const renderCell = (text, record, column) => {
    const handleCellChange = (value) => {
      const newData = [...dataSource];
      const target = newData.find((item) => item.key === record.key);
      if (target) {
        target[column] = value;
        setDataSource(newData);
      }
    };

    return <Input value={text} onChange={(e) => handleCellChange(e.target.value)} />;
  };
  const handleDelete = (key) => {
    const newData = temporaryData.filter((item) => item.key !== key);
    setTemporaryData(newData);
  }; 
  const handleAdd = () => {
    const newRecord = {
      id: '',
      RAWIN_NO: '',
      DOC_Year: '',
      DOC_NO: "",
    //   "STYLE_PO" : "123123",
      DOC_Type : "",
      Kd_Brg: "",
      Gudang_Code: "",
      Item_Qty: '',
      NO_AJU: "",
      IN_Qty: '',
      Harga_Beli: '',
      Disc_Brg_Percent: '',
      Disc_Brg_Amount: '',
      Sub_Total: ''
    };
    setTemporaryData([...temporaryData, newRecord]);
  };

  const handleSave = () => {
    // Update the original dataSource with the temporaryData
    setDataSource(temporaryData);
    setTemporaryData([]); // Clear temporary data after saving
  };


  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <Button onClick={handleSave} type="primary" style={{ marginBottom: 16, marginLeft: 8 }}>
        Save
      </Button>
      <Table
        dataSource={temporaryData}
        columns={columns}
        pagination={false}
        bordered
        rowKey="key"
      />
    </div>
  );
};
export default EditableTable;
