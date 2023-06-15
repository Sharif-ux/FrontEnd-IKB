import { useEffect, useState } from "react";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import React from "react";
import { Path } from "../../components/Path/path";
import { DatePicker, Form, Space } from 'antd';
import { Button, Row, Col, Table, Select } from 'antd';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
// import { useReactTable } from '@tanstack/react-table'
// import { useTable, Table, HeaderRow, BodyRow, Cell } from '@table-library/react-table-library';
// import '@table-library/react-table-library/table';
const handleChange = (value) => {
  console.log(`selected ${value}`);
};


const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();
        setTableData(data);
        setPagination(prevPagination => ({
          ...prevPagination,
          total: data.length,
        }));
        console.log(data)
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData();
  }, []);
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };
  const handleExportToCSV = () => {
    const headers = [
      { label: 'Name', key: 'name' },
      { label: 'Age', key: 'age' },
      // Add more headers as needed
    ];

    const csvData = [...headers, ...tableData];
    setTableData(csvData);
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#my-table' });
    doc.save('table.pdf');
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'WIPIN_NO',
      key: 'WIPIN_NO',
      resizable: true,
    },
    {
      title: 'Kode Barang',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
    },
    {
      title: 'Nama Barang',
      dataIndex: 'IN_Qty',
      key: 'IN_Qty',
      resizable: true,
    },
    {
        title: 'Satuan',
        dataIndex: 'Adj_Qty',
        key: 'Adj_Qty',
        resizable: true,
      },
      {
        title: 'Saldo Awal',
        dataIndex: 'Gudang_Code',
        key: 'Gudang_Code',
        resizable: true,
      },
      {
        title: 'Pemasukan',
        dataIndex: 'DOC_Type_Asal',
        key: 'DOC_Type_Asal',
        resizable: true,
      },
      {
        title: 'Pengeluaran',
        dataIndex: 'Style',
        key: 'Style',
         resizable: true,
      },
      {
        title: 'Penyesuaian',
        dataIndex: 'Cost_HPP',
        key: 'Cost_HPP',
        resizable: true,
      },
      {
        title: 'Saldo',
        dataIndex: 'Flag_Status',
        key: 'Flag_Status',
        resizable: true,
      },
      {
        title: 'Stock opname',
        dataIndex: 'stockopname',
        key: 'stockopname',
        resizable: true,
      },
      {
        title: 'Selisih',
        dataIndex: 'selisih',
        key: 'selisih',
        resizable: true,
      },
      {
        title: 'Keterangan',
        dataIndex: 'keterangan',
        key: 'keterangan',
        resizable: true,
      },
  ];
  

  return (
    <>
    <Table
      columns={columns}
      dataSource={tableData}
      bordered
      pagination={pagination}
      onChange={handleTableChange}
    />

    </>
  );
};


const dataSource = [
    {
      key: '1',
      nomor: 1,
      kodebarang: 32,
      namabarang: '10 Downing Street',
      satuan: 'bagus',
      saldoawal: 1110,
      pemasukan: 190,
      pengeluaran: 1120,
      penyesuaian: 112,
      saldo: 121212,
      stockopname: 1212,
      selisih: 1133,
      keterangan: "bagus"
    },
    {
      key: '2',
      nomor: 1,
      kodebarang: 32,
      namabarang: '10 Downing Street',
      satuan: 'bagus',
      saldoawal: 1110,
      pemasukan: 190,
      pengeluaran: 1120,
      penyesuaian: 112,
      saldo: 121212,
      stockopname: 1212,
      selisih: 1133,
      keterangan: "bagus"
    },
  ];
  
  const columns = [
    {
      title: 'No',
      dataIndex: 'WIPIN_NO',
      key: 'WIPIN_NO',
      resizable: true,
    },
    {
      title: 'Kode Barang',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
    },
    {
      title: 'Nama Barang',
      dataIndex: 'IN_Qty',
      key: 'IN_Qty',
      resizable: true,
    },
    {
        title: 'Satuan',
        dataIndex: 'Adj_Qty',
        key: 'Adj_Qty',
        resizable: true,
      },
      {
        title: 'Saldo Awal',
        dataIndex: 'Gudang_Code',
        key: 'Gudang_Code',
        resizable: true,
      },
      {
        title: 'Pemasukan',
        dataIndex: 'DOC_Type_Asal',
        key: 'DOC_Type_Asal',
        resizable: true,
      },
      {
        title: 'Pengeluaran',
        dataIndex: 'Style',
        key: 'Style',
         resizable: true,
      },
      {
        title: 'Penyesuaian',
        dataIndex: 'Cost_HPP',
        key: 'Cost_HPP',
        resizable: true,
      },
      {
        title: 'Saldo',
        dataIndex: 'Flag_Status',
        key: 'Flag_Status',
        resizable: true,
      },
      {
        title: 'Stock opname',
        dataIndex: 'stockopname',
        key: 'stockopname',
        resizable: true,
      },
      {
        title: 'Selisih',
        dataIndex: 'selisih',
        key: 'selisih',
        resizable: true,
      },
      {
        title: 'Keterangan',
        dataIndex: 'keterangan',
        key: 'keterangan',
        resizable: true,
      },
  ];
  

export default function PengeluaranBarang(){
  
    const { RangePicker } = DatePicker;
    return <>
<Path parent="Laporan Dokumen BC" children="REPORT PEMASUKAN BARANG DOK PABEAN"/>
         <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
            <div style={{display: "flex", justifyContent: "center", width: "100%",minWidth: "90%", marginBottom: "2em"}}>
            <Space wrap>        
                <RangePicker />
                <Button style={{backgroundColor: "#1f2431", color: "#efefef"}}>SUBMIT</Button>
                <Button disabled>TRACE</Button>
                <Select
      defaultValue="Ekspor To"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'pdf', label: 'PDF' },
        { value: 'csv', label: 'CSV' },
      ]}
    />
            </Space>
            </div>
            <Row justify="center"><Col sm={22} md={22}><TableComponent/>
      </Col></Row>

        </LayoutContent>
      </LayoutContentWrapper>
    </>
}