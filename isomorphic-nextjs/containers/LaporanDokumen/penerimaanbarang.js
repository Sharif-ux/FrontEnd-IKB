import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import React from "react";
import { Path } from "../../components/Path/path";
import { DatePicker, Form, Space } from 'antd';
import { Button, Row, Col, Table, Select, Input } from 'antd';
import moment from "moment";
import Highlighter from 'react-highlight-words';

import { exportToCSV, exportToPDF } from "../../components/utility/ExportDoc";
// import { useReactTable } from '@tanstack/react-table'
// import { useTable, Table, HeaderRow, BodyRow, Cell } from '@table-library/react-table-library';
// import '@table-library/react-table-library/table';
const handleChange = (value) => {
  console.log(`selected ${value}`);
};


const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
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
  const handleExport = (format) => {
    if (format === 'csv') {
      exportToCSV(tableData); // Helper function to export data to CSV
    } else if (TableComponent) {
      exportToPDF(tableData); // Helper function to export data to PDF
    }
  };
  const dateRangeSorter = (a, b) => {
    const dateA = moment(a.date);
    const dateB = moment(b.date);

    if (dateA.isBefore(selectedDateRange[0])) {
      return -1;
    }

    if (dateA.isAfter(selectedDateRange[1])) {
      return 1;
    }

    if (dateB.isBefore(selectedDateRange[0])) {
      return 1;
    }

    if (dateB.isAfter(selectedDateRange[1])) {
      return -1;
    }

    return 0;
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'WIPIN_NO',
      key: 'WIPIN_NO',
      resizable: true,
      ...getColumnSearchProps('WIPIN_NO'),

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
        sorter: (a, b) => a.Gudang_Code - b.Gudang_Code,

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
        ...getColumnSearchProps('Cost_HPP'),

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
  
console.log("apa ini", setSelectedDateRange)
  return (
    <>

            <div style={{display: "flex", justifyContent: "center", width: "100%",minWidth: "90%", marginBottom: "2em"}}>
            <Space wrap>        
            <DatePicker.RangePicker onChange={setSelectedDateRange} />
                <Button style={{backgroundColor: "#1f2431", color: "#efefef"}}>SUBMIT</Button>
                <Button disabled>TRACE</Button>

            </Space>
            </div>
            <Table
      columns={columns}
      dataSource={tableData}
      bordered
      pagination={pagination}
      onChange={handleTableChange}
      scroll={{
        y: 1300,
        x: 1300,
      }}
    />
                <Select
      defaultValue="Ekspor To"
      style={{ width: 120 }}
      onChange={handleExport}
      options={[
        { value: 'pdf', label: 'PDF' },
        { value: 'csv', label: 'CSV' },
      ]}
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
<LayoutContentWrapper style={{ height: '100%' }}>
        <LayoutContent>
            <Row justify="center"><Col sm={22} md={22}><TableComponent/>
      </Col></Row>
      </LayoutContent>
      </LayoutContentWrapper>
    </>
}