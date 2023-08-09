import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, message } from 'antd';
import axios from 'axios';

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([]);

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
    render: (text, record) => renderCell(text, record, 'Nm_Brg'),
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
    render: (text, record) => renderCell(text, record, 'Sub_Total'),
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
    render: (text, record) => renderCell(text, record, 'DOC_Year'),
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
    render: (text, record) => renderCell(text, record, 'Gudang'),
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
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button>Delete</Button>
          </Popconfirm>
        ) : null,
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

  const handleDelete = async (key) => {
    try {
      const response = await axios.post('/deleteRawiIN', { id: key }); // Adjust the endpoint URL
      if (response.status === 200) {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        message.success('Row deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting row:', error);
      message.error('Failed to delete row.');
    }
  };

  const handleAdd = async () => {
    const generateId = detailmutasi.length + 1 
    const generateRAWIN = detailmutasi.RAWIN_NO
    try {
      const newRecord = {
        "id": generateId,
        "RAWIN_NO": RawIn,
        "DOC_Year": "2020",
        "DOC_NO": "123123",
      //   "STYLE_PO" : "123123",
        "DOC_Type" : "123123",
        "Kd_Brg": "12323",
        "Gudang_Code": "GD001",
        "Item_Qty": 100,
        "NO_AJU": "21121",
        "IN_Qty": 90,
        "Harga_Beli": 50.25,
        "Disc_Brg_Percent": 10,
        "Disc_Brg_Amount": 5.00,
        "Sub_Total": 4500.00
      };

      const response = await axios.post('http://localhost:3000/detailRawiIN', newRecord); // Adjust the endpoint URL

      if (response.status === 200) {
        setDataSource([...dataSource, newRecord]);
        message.success('Row added successfully.');
      }
    } catch (error) {
      console.error('Error adding row:', error);
      message.error('Failed to add row.');
    }
  };

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
    </div>
  );
};

export default EditableTable;
