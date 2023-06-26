import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
const YourComponent = () => {
    const [data, setData] = useState([]);
    const apiUrl = 'http://localhost:3000/bahanbaku';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhIiwiaWF0IjoxNjg3NzQ4MTk4LCJleHAiOjE2ODc4MzQ1OTh9.cJ8AGhT0cw1b5iP-6EgAcTPKIgtWdFXV-W_8jxajzu4';
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (Array.isArray(response.data)) {
            setData(response.data.data);
          } else {
            console.error('Invalid data format. Expected an array.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    const columns = [
        {
          title: 'NO',
          dataIndex: 'NO',
        },
        {
          title: 'KodeBarang    ',
          dataIndex: 'KodeBarang    ',
        },
        // Add more columns as needed
      ];
    // Render the Ant Design table with the fetched data
    return (
      <Table dataSource={data} columns={columns} />
    );
  };
  
  export default YourComponent;