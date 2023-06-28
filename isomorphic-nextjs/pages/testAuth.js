import { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Table } from 'antd';

const pageSize = 20; // Number of rows per page

const YourComponent = () => {
  const tableRef = useRef(null); // Create a ref for the Table component
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  // Function to fetch table data from the API
  const fetchTableData = async () => {
    try {
      const response = await fetch('http://localhost:3000/penerimaanbarang');
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    {
      title: 'Jenis Dokumen',
      dataIndex: 'DOC_Type',
      key: 'DOC_Type',
      width: '4%'
    },
    {
      title: 'No Aju',
      dataIndex: 'NO_REG',
      key: 'NO_REG',
      width: '6%'
    },
    {
      title: 'No. Pabean',
      dataIndex: 'DOC_NO',
      key: 'DOC_NO',
      width: '6%'
    },
    {
      title: 'Tgl. Pabean',
      dataIndex: 'DOC_Date',
      key: 'DOC_Date',
      render: (text) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const convertedDate = new Date(text).toLocaleDateString('id-ID', options);
        return <span>{convertedDate}</span>;
      },
      width: '8%'
    },
    {
      title: 'No. Penerimaan Barang',
      dataIndex: 'NO_BUKTI',
      key: 'NO_BUKTI',
      width: '5%'
    },
    {
      title: 'Tgl. Penerimaan Barang',
      dataIndex: 'Date_Transaction',
      key: 'Date_Transaction',
      render: (text) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const convertedDate = new Date(text).toLocaleDateString('id-ID', options);
        return <span>{convertedDate}</span>;
      },
      width: '8%'
    },
    {
      title: 'Pemasok/Pengirim',
      dataIndex: 'Ship_Name',
      key: 'Ship_Name',
      width: '8%'
    },
    {
      title: 'Kode Barang',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
      width: '8%'
    },
    {
      title: 'Nama Barang',
      dataIndex: 'Nm_Brg',
      key: 'Nm_Brg',
      width: '5%'
    },
    {
      title: 'Satuan',
      dataIndex: 'Unit_Code',
      key: 'Unit_Code',
      width: '8%'
    },
    {
      title: 'Jumlah',
      dataIndex: 'Item_Qty',
      key: 'Item_Qty',
      width: '8%'
    },
    {
      title: 'Harga',
      dataIndex: 'Sub_Total',
      key: 'Sub_Total',
      width: '8%'
    }
    // Add more columns as needed
  ];

  // Function to generate PDF from currently visible table data
  const generatePDF = async () => {
    const doc = new jsPDF();
    const currentPage = tableRef.current?.state.pagination.current || 1;
    const startIndex = (currentPage - 1) * pageSize;

    // Retrieve the currently rendered table rows
    const rows = await tableRef.current?.getRenderedRows();

    if (rows && rows.length > 0) {
      const endIndex = Math.min(startIndex + pageSize, rows.length);
      const visibleData = rows.slice(startIndex, endIndex).map(row => row.props.data);

      generatePDFForChunk(visibleData, doc, columns);
      doc.save('Penerimaan_Barang.pdf');
    }
  };

  // Render your table component here
  return (
    <>
      <Table ref={tableRef} dataSource={tableData} columns={columns} />
      <button onClick={generatePDF}>Generate PDF</button>
    </>
  );
};

export default YourComponent;
