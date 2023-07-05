import React, { useEffect, useState, useRef} from 'react';
import { Table, DatePicker, Select, Button,Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space,  } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import axios from 'axios';
import { saveAs } from 'file-saver';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
// import { exportToPDF } from '../../components/utility/ExportDoc';
import { ExportToCsv } from 'export-to-csv';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs'; // Add this import statement
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import 'jspdf-autotable';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
const { RangePicker } = DatePicker;
const { Option } = Select;


const Wip = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [exportType, setExportType] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dt_Awal, setDt_Awal] = useState(null);
  const [Kd_Brg, setKd_Brg] = useState('');
  const [dt_Akhir, setDt_Akhir] = useState(null);
  const [dataTrace, setDataTrace] = useState([])
  const [visible, setVisible] = useState(false);

  const searchInput = useRef(null);
  const tableRef = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </button>
          <button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>
            Reset
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    })
  
    // filterIcon: (filtered) => (
    //   <SearchOutlined
    //     style={{
    //       color: filtered ? '#1677ff' : undefined,
    //     }}
    //   />
    // ),
    // onFilter: (value, record) =>
    //   record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    // onFilterDropdownOpenChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.current?.select(), 100);
    //   }
    // },
    const handleTableClick = (record) => {
      setSelectedRowKeys([record.Kd_Brg]);
    
      
      const selectedRecord = data.find((item) => item.Kd_Brg === record.Kd_Brg);
      console.log("cek selectedRecord" ,selectedRecord)

      if (selectedRecord) {
        setKd_Brg(selectedRecord.Kd_Brg);
        console.log("cek", selectedRecord.KodeBarang)
      } else {
        setKd_Brg('');
      }
    };  


    //     const handleDateRangeChange = (dates) => {
    //      setDt_Awal(dates[0]);
    //   setDt_Akhir(dates[1]);
    // };
    const handleDateRangeChange = (dates) => {
      if (dates && dates.length > 0) {
        // Handle date range picker change event and set dt_Awal and dt_Akhir states
        setDt_Awal(dates[0]);
        setDt_Akhir(dates[1]);
      } else {
        // Handle null or empty dates scenario
        setDt_Awal(null);
        setDt_Akhir(null);
      }
    };
    const callStoredProc = () => {
      const Kd_Brg = selectedRowKeys[0];
      const apiUrl = 'http://localhost:3000/storedprocedure'; 
  
      axios
        .get(apiUrl, {
          params: {
            Kd_Brg,
            dt_Awal: dt_Awal.format('YYYY-MM-DD'),
            dt_Akhir: dt_Akhir.format('YYYY-MM-DD'),
          },
        })
        .then((response) => {
        
          setDataTrace(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    console.log("setDataTrace", dataTrace)
    const handleClick = () => {
      showModal();
      callStoredProc();
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
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
      )
      const columnModal =[ {
        title: 'No.',
        dataIndex: 'index',
        render: (text, record, index) => (
          <div
            style={{ cursor: 'pointer', fontWeight: selectedRowKeys.includes(record) ? 'bold' : 'normal' }}
            onClick={() => handleTableClick(record)}
          >
            {index + 1}
          </div>
        ),
        // render: (text, record, index) => index + 1, // Generate automation numbering
      },
      {
        title: 'Sumber Trans',
        dataIndex: 'Source_Trans',
        key: 'Source_Trans',
      },
      {
        title: 'No Refrensi',
        dataIndex: 'No_Reference',
        key: 'No_Reference',
      },
      {
        title: 'Keterangan',
        dataIndex: 'Keterangan',
        key: 'Keterangan',
      },
      {
        title: 'Tanggal',
        dataIndex: 'Date_Transaction',
        key: 'Date_Transaction',   
        render: (text) => {
          const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
          const convertedDate = new Date(text).toLocaleDateString('id-ID', options);
          return <span>{convertedDate}</span>;
        },    
      },
      {
        title: 'Harga',
        dataIndex: 'Harga',
        key: 'Harga',
      },
      {
        title: 'Masuk',
        dataIndex: 'IN_Brg',
        key: 'IN_Brg',
      },
      {
        title: 'Keluar',
        dataIndex: 'OUT_Brg',
        key: 'OUT_Brg',
      },
      {
        title: 'Penyusaian',
        dataIndex: 'Adjust_Brg',
        key: 'Adjust_Brg',
      },
      {
        title: 'Kode Barang',
        dataIndex: 'Kd_Brg',
        key: 'Kd_Brg',
      },
      {
        title: 'Stock Opname',
        dataIndex: 'Qty_Fisik',
        key: 'Qty_Fisik',
      },
      {
        title: 'Saldo Akhir',
        dataIndex: 'Qty_System',
        key: 'Qty_System',
      },
      {
        title: 'Saldo(QTY)',
        dataIndex: 'Balance_QTY',
        key: 'Balance_QTY',
      }]
      
      
  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (text, record, index) => index + 1, // Generate automation numbering
    },
    {
      title: 'Kode Barang',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', fontWeight: selectedRowKeys.includes(record) ? 'bold' : 'normal' }}
          onClick={() => handleTableClick(record)}
        >
          {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      ),
      ...getColumnSearchProps('kodebarang'),
    },
    {
      title: 'Nama Barang',
      dataIndex: 'namabarang',
      key: 'namabarang',
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', fontWeight: selectedRowKeys.includes(record) ? 'bold' : 'normal' }}
          onClick={() => handleTableClick(record)}
        >
          {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      ),
      ...getColumnSearchProps('namabarang'),
    },
    {
      title: 'Qty',
      dataIndex: 'Qty',
      key: 'Qty',    
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', fontWeight: selectedRowKeys.includes(record) ? 'bold' : 'normal' }}
          onClick={() => handleTableClick(record)}
        >
          {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      ),       
      ...getColumnSearchProps('Qty')

    },
    {
      title: 'Satuan',
      dataIndex: 'Satuan',
      key: 'Satuan',
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', fontWeight: selectedRowKeys.includes(record) ? 'bold' : 'normal' }}
          onClick={() => handleTableClick(record)}
        >
          {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      ),
      ...getColumnSearchProps('Satuan'),
    },

  
  ];
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, dateRange]);
  useEffect(() => {
    // Retrieve the token from the cookie
    const token = cookie.get('token');
    
    // Use the token here or send it to another function or API request
    console.log('Token:', token);
  }, []);
  const fetchData = async () => {
    try {
      // Retrieve the token from the local storage
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhIiwiaWF0IjoxNjg3NzQ2MjQ0LCJleHAiOjE2ODc4MzI2NDR9.43cykjUUw80sCbAinLXSLiJlAp7oz-rQVmthToZuh2M8';
      const token = cookie.get('token');

      // Make the API request with the token included in the headers
      const response = await fetch('http://localhost:3000/wip', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // Handle the successful response
        const data = await response.json();
        console.log('Data:', data);
        setData(data.data)
      } else {
        // Handle the error response
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      // Handle network or server error
      console.error('Error occurred during API request:', error);
    }
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange(null);
    }
  };

  const handleExportTypeChange = (value) => {
    setExportType(value);
  };

  const filterData = () => {
    if (dateRange === null) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((item) => {
      const itemDate = moment(item.DOC_Date, 'YYYY-MM-DD');
      return (
        itemDate.isSameOrAfter(dateRange[0], 'day') &&
        itemDate.isSameOrBefore(dateRange[1], 'day')
      );
    });
    setFilteredData(filtered);
  };
  const exportToCSVModal = () => {
    const csvExporter = new ExportToCsv({
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,  // Set to true to include column headers
      showTitle: true,
      useTextFile: false,
      useBom: true,
    });
  
    const columnHeaders = {
      "Sumber Trans": "Sumber Trans",
      "No Refrensi": "No Refrensi",
      "Keterangan": "Keterangan",
      "Tanggal" : "Tanggal",
      "Harga" : "Harga",
      "Masuk" : "Masuk",
      "Keluar" : "Keluar",
      "Penyesuaian" : "Penyesuaian",
      "Kode Barang" : "Kode Barang",
      "Stock Opname" : "Stock Opname",
      "Saldo Akhir" : "Saldo Akhir",
      "Saldo(QTY)" : "Saldo(QTY)"
    };
  
    const exportedData = [
      columnHeaders,  // Include the column headers as the first row
      ...dataTrace.map((item) => ({
        "Sumber Trans": item.Source_Trans,
        "No Refrensi": item.No_Reference,
        "Keterangan": item.Keterangan,
        "Tanggal": item.Date_Transaction,
        "Harga": item.Harga,
        "Masuk": item.IN_Brg,
        "Keluar": item.OUT_Brg,
        "Penyesuaian": item.ADJ_Brg,
        "Kode Barang": item.Kd_Brg,
        "Stock Opname": item.Qty_Fisik,
        "Saldo Akhir": item.Qty_System,
        "Saldo(QTY)": item.Balance_QTY,
      }))
    ];
  
    csvExporter.generateCsv(exportedData);
  };
  const exportToExcelModal = () => {
    const exportedData = dataTrace.map((item) => ({
      "Sumber Trans": item.Source_Trans,
      "No Refrensi": item.No_Reference,
      "Keterangan": item.Keterangan,
      "Tanggal": item.Date_Transaction,
      "Harga": item.Harga,
      "Masuk": item.IN_Brg,
      "Keluar": item.OUT_Brg,
      "Penyesuaian": item.ADJ_Brg,
      "Kode Barang": item.Kd_Brg,
      "Stock Opname": item.Qty_Fisik,
      "Saldo Akhir": item.Qty_System,
      "Saldo(QTY)": item.Balance_QTY,
      // 'Tanggal Transaksi': moment(item.TanggalTransaksi).format('YYYY-MM-DD'),
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'data.xlsx';
    link.click();
  };
const pageSize = 20; // Number of rows per page

const splitDataIntoChunks = (data, pageSize) => {
  const chunks = [];
  let index = 0;

  while (index < data.length) {
    chunks.push(data.slice(index, index + pageSize));
    index += pageSize;
  }

  return chunks;
};

const generatePDFForChunk = (chunk, doc, columns) => {
  const tableContent = chunk.map((row) => columns.map((column) => row[column.dataIndex]));
  const customHeader = columns.map((column) => column.title);

  doc.autoTable({
    head: [customHeader],
    body: tableContent,
    theme: 'striped', // Apply striped theme for alternating row colors
    styles: {
      cellPadding: 1,
      fontSize: 5,
    },
    columnStyles: columns.reduce((styles, column, index) => {
      styles[index] = { fontStyle: 'light' }; // Apply bold font style to each column
      return styles;
    }, {}),
    columnWidth: 'auto', // Set the initial column width to 'auto'
    margin: { top: 15 }, // Add top margin to the table
    didParseCell: (data) => {
      // Adjust the column width based on the content
      const col = data.column.index;
      const headers = customHeader.length;
      const colWidth = headers > col ? doc.getStringUnitWidth(customHeader[col]) * doc.internal.getFontSize() + 10 : 50;
      data.cell.width = colWidth;
    },
  });
};
  const exportToCSV = () => {
    const csvExporter = new ExportToCsv({
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,  // Set to true to include column headers
      showTitle: true,
      useTextFile: false,
      useBom: true,
    });
  
    const columnHeaders = {
      "Kode Barang": "Kode Barang",
      "Nama Barang": "Nama Barang",
      "Satuan": "Satuan",
      "Saldo Awal" : "Saldo Awal",
      "Pemasukan" : "Pemasukan",
      "Pengeluaran" : "Pengeluaran",
      "Penyesuaian" : "Penyesuaian",
      "Stock Opname" : "Stock Opname",
      "Nama Barang" : "Nama Barang",
      "Saldo Akhir" : "Saldo Akhir",
      "Selisih" : "Selisih"
    };
  
    const exportedData = [
      columnHeaders,  // Include the column headers as the first row
      ...filteredData.map((item) => ({
        "Kode Barang": item.KodeBarang,
        "Nama Barang": item.Nm_Brg,
        "Satuan": item.Unit_Desc,
        "Saldo Awal": item.Saldo_Awal,
        "Pemasukan": item.IN_Brg,
        "Pengeluaran": item.OUT_Brg,
        "Penyesuaian": item.Adjust_Brg,
        "Stock Opname": item.Qty_Fisik,
        "Nama Barang": item.Nm_Brg,
        "Saldo Akhir": item.Qty_System,
        "Selisih": item.selisih,
      }))
    ];
  
    csvExporter.generateCsv(exportedData);
  };

  const exportToExcel = () => {
    const exportedData = filteredData.map((item) => ({
      "Kode Barang": item.KodeBarang,
      "Nama Barang": item.namabarang,
      "Satuan": item.Satuan,
      "Qty": item.Qty,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'data.xlsx';
    link.click();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const exportToPDF = async (data) => {
    const doc = new jsPDF();
    const tableContent = [];
    const columns = Object.keys(data[0]);
  
    data.forEach((row) => {
      const rowData = Object.values(row);
      tableContent.push(rowData);
    });
    const customHeader = ['No', 'Kode Barang', 'Nama Barang', 'Qty', 'Satuan'];
    await doc.autoTable({
      head: [customHeader],
      body: tableContent,
    });
  
    doc.save('Wip.pdf');
  };
  return (
    <LayoutContentWrapper style={{ height: '100%' }}>
    <LayoutContent>
    <div>
    <div style={{ marginBottom: 16,  display: "flex", width: "100%", justifyContent: "center"}}>
        <RangePicker onChange={handleDateRangeChange} />
        <Select
          defaultValue="Export Type"
          style={{ width: 120, marginLeft: 16 }}
          onChange={handleExportTypeChange}
        >
          <Option value="csv">CSV</Option>
          <Option value="excel">Excel</Option>
          <Option value="pdf">PDF</Option>
        </Select>
        {exportType && (
          <Button type="primary" onClick={() => {
            if (exportType === 'csv') {
              exportToCSV();
            } else if (exportType === 'excel') {
              exportToExcel();
            } else if (exportType === 'pdf') {
              exportToPDF(data);
            }
          }}>
            Export {exportType.toUpperCase()}
          </Button>
        )}
              <Button onClick={handleClick} style={{marginLeft: 16,  backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px"}}>Kartu Stock</Button>
              <Modal
        title={`Trace Style Kode Barang - ${selectedRowKeys}`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer
      >
        <div>
        <div style={{ marginBottom: 16,  display: "flex", width: "100%", justifyContent: "center"}}>
        <Select
          defaultValue="Export Type"
          style={{ width: 120, marginLeft: 16 }}
          onChange={handleExportTypeChange}
        >
          <Option value="csvmodal">CSV</Option>
          <Option value="excelmodal">Excel</Option>
          <Option value="pdfmodal">PDF</Option>
        </Select>
        {exportType && (
          <Button type="primary" onClick={() => {
            if (exportType === 'csvmodal') {
              exportToCSVModal();
            } else if (exportType === 'excelmodal') {
              exportToExcelModal();
            } else if (exportType === 'pdfmodal') {
              generatePDFForChunk();
            }
          }}>
            Export {exportType.toUpperCase()}
          </Button>)}
          </div>
        <Table id="table-ref-modal" columns={columnModal} dataSource={dataTrace} scroll={{ x: 400 }} ref={tableRef} />
        </div>
      </Modal>
      </div>
      {filteredData.length > 0 ? (
        <Table id="table-ref" columns={columns} dataSource={filteredData} scroll={{ x: 400 }} ref={tableRef}/>
      ) : (
        <p>No data available</p>
      )}
    </div>
    </LayoutContent>
      </LayoutContentWrapper>
  );
};

export default Wip;
