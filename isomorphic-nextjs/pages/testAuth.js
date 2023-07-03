import React, { useState } from 'react';
import { Table, DatePicker, Button } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;

const MyComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dt_Awal, setDt_Awal] = useState(null);
  const [Kd_Brg, setKd_Brg] = useState('');
  const [dt_Akhir, setDt_Akhir] = useState(null);

  const handleTableClick = (record) => {
    setSelectedRowKeys([record.Kd_Brg]);
  
    // Find the record with the selected key
    const selectedRecord = data.find((item) => item.key === record.Kd_Brg);
  
    if (selectedRecord) {
      setKd_Brg(selectedRecord.Kd_Brg);
      console.log("cek", selectedRecord.Kd_Brg)
    } else {
      setKd_Brg('');
    }
  };

  const handleDateRangeChange = (dates) => {
    // Handle date range picker change event and set dt_Awal and dt_Akhir states
    setDt_Awal(dates[0]);
    setDt_Akhir(dates[1]);
  };

  const callStoredProc = () => {
    const Kd_Brg = selectedRowKeys[0];
    const apiUrl = 'http://localhost:3000/storedprocedure'; // Replace with your server URL

    axios
      .get(apiUrl, {
        params: {
          Kd_Brg,
          dt_Awal: dt_Awal.format('YYYY-MM-DD'),
          dt_Akhir: dt_Akhir.format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        // Handle the response from the server
        console.log(response.data); // Do something with the data
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  // Define the columns for the table
  const columns = [
    {
      title: 'Kd_Brg',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', fontWeight: selectedRowKeys.includes(record) ? 'bold' : 'normal' }}
          onClick={() => handleTableClick(record)}
        >
          {text}
        </div>
      ),
    },
    
    // ... other columns
  ];

  // Sample data for the table
  const data = [
  {
    key: '1234234235435',
    Kd_Brg: '23BB-2018',
    // other properties
  },
  {
    key: '25645634242324',
    Kd_Brg: '23BB-2017',
    // other properties
  },  {
    key: '34242324',
    Kd_Brg: '23BB-2017',
    // other properties
  },
    // ... other rows
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{
        //   type: 'radio',
        //   selectedRowKeys,
        //   onChange: (keys) => {setSelectedRowKeys(keys), console.log("isi keys", keys)}
        
        // }}
      />

      <RangePicker onChange={handleDateRangeChange} />

      <Button type="primary" onClick={callStoredProc}>
        Call Stored Procedure
      </Button>
    </div>
  );
};

export default MyComponent;
