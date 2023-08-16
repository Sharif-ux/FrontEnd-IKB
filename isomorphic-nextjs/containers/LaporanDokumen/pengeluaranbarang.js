import React, { useEffect, useState, useRef} from 'react';
import { Table, DatePicker, Select, Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import axios from 'axios';
import { saveAs } from 'file-saver';
// import { exportToPDF } from '../../components/utility/ExportDoc';
import { ExportToCsv } from 'export-to-csv';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs'; // Add this import statement
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = 'DD/MM/YYYY';

const PengeluaranBarang = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [exportType, setExportType] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [alert, setAlert] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [visible, setVisible] = useState(false);
  const [dataTrace, setDataTrace] = useState([])
  const searchInput = useRef(null);
      const tableRef = React.useRef(null);
  
  //  
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
    const getColumnDateProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            style={{ marginBottom: 8, display: 'block' }}
            value={selectedKeys[0]}
            onChange={(date) => setSelectedKeys(date ? [date] : [])}
            onPressEnter={() => {
              confirm();
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
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
        record[dataIndex] ? moment(record[dataIndex]).isSame(value, 'day') : false,
    });
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
  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      render: (text, record, index) => index + 1, // Generate automation numbering
    },
    {
      title: 'Jenis Dokumen',
      dataIndex: 'DOC_Type',
      key: 'DOC_Type',
      ...getColumnSearchProps('DOC_Type'),
    },
    {
      title: 'No Aju',
      dataIndex: 'NO_REG',
      key: 'NO_REG',
      ...getColumnSearchProps('NO_REG'),
    },
    {
      title: 'No. Pabean',
      dataIndex: 'DOC_NO',
      key: 'DOC_NO',
      ...getColumnSearchProps('DOC_NO'),
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
      ...getColumnDateProps('DOC_Date'),
    },
    {
      title: 'No. PO',
      dataIndex: 'DO_NO',
      key: 'DO_NO',
      ...getColumnSearchProps('DO_NO'),
    },
    {
      title: 'Tgl. Pengeluaran',
      dataIndex: 'DO_Date',
      key: 'DO_Date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
      ...getColumnDateProps('DO_Date'),

    },
    {
      title: 'Penerima Barang',
      dataIndex: 'Buyer_Name',
      key: 'Buyer_Name',
      ...getColumnSearchProps('Buyer_Name'),
  
    },
    {
      title: 'Kode Barang',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
      ...getColumnSearchProps('Kd_Brg'),
  
    },
    {
      title: 'Nama Barang',
      dataIndex: 'Nm_Brg',
      key: 'Nm_Brg',
      ...getColumnSearchProps('Nm_Brg'),
  
    },
    {
      title: 'Satuan',
      dataIndex: 'Unit_Code',
      key: 'Unit_Code',
      ...getColumnSearchProps('Unit_Code'),
  
    },
    {
      title: 'Jumlah',
      dataIndex: 'Item_Qty',
      key: 'Item_Qty',
      ...getColumnSearchProps('Item_Qty'),
  
    },
    {
      title: 'Harga CMT',
      dataIndex: 'CM_Price_Tot',
      key: 'CM_Price_Tot',
      ...getColumnSearchProps('CM_Price_Tot'),
  
    },
    {
      title: 'Harga FOB',
      dataIndex: 'FOB_Price_Tot',
      key: 'FOB_Price_Tot',
      ...getColumnSearchProps('FOB_Price_Tot'),
  
    },
    // {
    //   title: 'Tanggal Transaksi',
    //   dataIndex: 'TanggalTransaksi',
    //   key: 'TanggalTransaksi',
    //   render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    // },
  ];
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, dateRange]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.21:3000/pengeluaranbarang');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const exportToCSV = () => {
    const csvExporter = new ExportToCsv({
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,  // Set to true to include column headers
      showTitle: true,
      useTextFile: false,
      useBom: true,
      filename: "PengeluaranBarang"
    });
  
    const columnHeaders = {
      "Jenis Dokumen": "Jenis Dokumen",
      "No Aju": "No Aju",
      "No. Pabean": "No. Pabean",
      "Tgl. Pabean": "Tgl. Pabean",
      "No. PO": "No. PO",
      "Tgl. Pengeluaran": "Tgl. Pengeluaran",
      "Penerima Barang": "Penerima Barang",
      "Kode Barang": "Kode Barang",
      "Nama Barang": "Nama Barang",
      "Satuan": "Satuan",
      "Jumlah": "Jumlah",
      "Harga": "Harga",
      "Harga CMT": "Harga CMT",
      "Harga FOB": "Harga FOB",
    };
  
    const exportedData = [
      columnHeaders,  // Include the column headers as the first row
      ...filteredData.map((item) => ({
        "Jenis Dokumen": item.DOC_Type,
        "No Aju": item.NO_REG,
        "No. Pabean": item.DOC_NO,
        "Tgl. Pabean": item.DOC_Date,
        "No. PO": item.DO_NO,
        "Tgl. Pengeluaran": item.DO_Date,
        "Penerima Barang": item.Buyer_Name,
        "Kode Barang": item.Kd_Brg,
        "Nama Barang": item.Nm_Brg,
        "Satuan": item.Unit_Code,
        "Jumlah": item.Item_Qty,
        "Harga": item.Sub_Total,
        "Harga CMT": item.CM_Price_Tot,
        "Harga FOB": item.FOB_Price_Tot,
      }))
    ];
  
    csvExporter.generateCsv(exportedData);
  };
  

  const exportToExcel = () => {
    const exportedData = filteredData.map((item) => ({
      "Jenis Dokumen": item.DOC_Type,
      "No Aju": item.NO_REG,
      "No. Pabean": item.DOC_NO,
      "Tgl. Pabean": item.DOC_Date,
      "No. PO": item.DO_NO,
      "Tgl. Pengeluaran": item.DO_Date,
      "Penerima Barang": item.Buyer_Name,
      "Kode Barang": item.Kd_Brg,
      "Nama Barang": item.Nm_Brg,
      "Satuan": item.Unit_Code,
      "Jumlah": item.Item_Qty,
      "Harga": item.Sub_Total,
      "Harga CMT": item.CM_Price_Tot,
      "Harga FOB": item.FOB_Price_Tot,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'PengeluaranBarang.xlsx';
    link.click();
  };

  
  
// const exportToPDF = () => {
//     const exportedData = filteredData.map((item) => ({
//       "Jenis Dokumen": item.DOC_Type,
//       "No Aju": item.NO_REG,
//       "No. Pabean": item.DOC_NO,
//       "Tgl. Pabean": item.DOC_Date,
//       "No. PO": item.DO_NO,
//       "Tgl. Pengeluaran": item.DO_Date,
//       "Penerima Barang": item.Buyer_Name,
//       "Kode Barang": item.Kd_Brg,
//       "Nama Barang": item.Nm_Brg,
//       "Satuan": item.Unit_Code,
//       "Jumlah": item.Item_Qty,
//       "Harga": item.Sub_Total,
//       "Harga CMT": item.CM_Price_Tot,
//       "Harga FOB": item.FOB_Price_Tot,
//     }));
  
//     const columns = [
//       { header: 'Jenis Dokumen', dataKey: DOC_Type },
//       { header: 'No Aju', dataKey: 'NO_REG' },
//       { header: 'No. Pabean', dataKey: 'DOC_NO' },
//       { header: 'Tgl. Pabean', dataKey: 'DO_Date' },
//       { header: 'Tgl. Pengeluaran', dataKey: 'DO_Date' },
//       {header: "Penerima Barang", dataKey: "Buyer_Name"},
//       { header: "Kode Barang", dataKey: "Kd_Brg"},
//       {header: "Nama Barang", dataKey: "Nm_Brg"},
//       {header: "Satuan", dataKey: "Unit_Code"},
//       {header: "Jumlah", dataKey: "Item_Qty"},
//       {header: "Harga", datakey: "Sub_Total"},
//       {header: "Harga CMT", datakey: "CM_Price_Tot"},
//       {header: "Harga FOB", dataKey: "FOB_Price_Tot"}
//     ];
  
//     const doc = new jsPDF();
//     doc.autoTable({
//       head: [columns.map((column) => column.header)],
//       body: exportedData,
//       columns: columns.map((column) => column.dataKey),
//     });
  
//     doc.save('data.pdf');
//   };
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
const generatePDF = async () => {
  try {
        const response = await axios.get('http://192.168.1.21:3000/pengeluaranbarang');
    const tableData = filteredData;
    const pageSize = 10; // Number of items per page
    const totalPages = Math.ceil(tableData.length / pageSize); // Calculate the total number of pages

    const columns = [
      // Define your columns here, following the Ant Design (antd) column configuration
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
        title: 'No. PO',
        dataIndex: 'DO_NO',
        key: 'DO_NO',
        width: '5%'
      },
      {
        title: 'Tgl. Pengeluaran',
        dataIndex: 'DO_Date',
        key: 'DO_Date',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
        width: '8%'

      },
      {
        title: 'Penerima Barang',
        dataIndex: 'Buyer_Name',
        key: 'Buyer_Name',
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
        title: 'Harga CMT',
        dataIndex: 'CM_Price_Tot',
        key: 'CM_Price_Tot',
        width: '8%'
    
      },
      {
        title: 'Harga FOB',
        dataIndex: 'FOB_Price_Tot',
        key: 'FOB_Price_Tot',
        width: '8%'    
      },
      // {
      // Add more columns as needed
    ];

    const doc = new jsPDF();

    for (let page = 1; page <= totalPages; page++) {
      // Calculate the start and end index for the current page
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      // Fetch the data for the current page
      const currentPageData = tableData.slice(startIndex, endIndex);

      const dataChunks = splitDataIntoChunks(currentPageData, pageSize);

      for (let i = 0; i < dataChunks.length; i++) {
        if (i > 0) {
          doc.addPage(); // Add a new page for each chunk after the first one
        }
        generatePDFForChunk(dataChunks[i], doc, columns);
      }
    }

    doc.save('Pengeluaran_Barang.pdf');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
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
const handleClickAlert =() =>{
  setAlert(true);
}
  const handleRowClick = (record) => {
    const selectedRecord = data.find((item) => item.DOC_NO === record.DOC_NO);
    if (selectedRecord) {
      setSelectedRowKeys([record.DOC_NO]);
      setSelectedRow(selectedRecord);
      console.log("Selected Row: ", selectedRecord);
    } else {
      setSelectedRowKeys([]);
      setSelectedRow(null);
    }
  };
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onSelect: (record) => {
      handleRowClick(record);
    },
  };
  const tracepenerimaanbarang = () => {
    const DOC_NO = selectedRowKeys[0];
    const apiUrl = 'http://192.168.1.21:3000/sptracepengeluaranbarang'; 
    axios
      .get(apiUrl, {
        params: {
          DOC_NO,
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
const isButtonDisabled = !dateRange ; // Check if either dt_Awal or dt_Akhir is null
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleClick = () => {
    showModal();
    tracepenerimaanbarang();
  };
  const columnModal =[ 
    //   {
    //   title: 'No.',
    //   dataIndex: 'index',
    //   render: (text, record, index) => (
    //     <div
    
    //     >
    //       {index + 1}
    //     </div>
    //   ),
    //   // render: (text, record, index) => index + 1, // Generate automation numbering
    // },
    {
      title: 'Phase',
      dataIndex: 'Phase',
      key: 'Phase',
      ...getColumnSearchProps('Phase'),
    
    },
    {
      title: 'Type',
      dataIndex: 'No_Reference',
      key: 'No_Reference',
      ...getColumnSearchProps('No_Reference'),
    
    },
    {
      title: 'Tanggal',
      dataIndex: 'Tanggal',
      key: 'Tanggal',   
      render: (text) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const convertedDate = new Date(text).toLocaleDateString('id-ID', options);
        return <span>{convertedDate}</span>;
      },    
      ...getColumnDateProps('Tanggal')
    },
    {
      title: 'Harga',
      dataIndex: 'Harga',
      key: 'Harga',
      ...getColumnSearchProps('Harga'),
    },
    {
      title: 'Nm_Brg',
      dataIndex: 'Nm_Brg',
      key: 'Nm_Brg',
      ...getColumnSearchProps('Nm_Brg'),
    },
    {
      title: 'Kd_Brg',
      dataIndex: 'Kd_Brg',
      key: 'Kd_Brg',
      ...getColumnSearchProps('Kd_Brg'),
    
    },
    {
      title: 'QTY',
      dataIndex: 'Item_Qty',
      key: 'Item_Qty',
      ...getColumnSearchProps('Item_Qty'),
    
    },
    {
      title: 'Satuan',
      dataIndex: 'Unit_Code',
      key: 'Unit_Code',
      ...getColumnSearchProps('Unit_Code'),
    
    },
    {
      title: 'Jenis Dok.BC',
      dataIndex: 'DOC_Type',
      key: 'DOC_Type',
      ...getColumnSearchProps('DOC_Type'),
    
    },
    {
      title: 'Nomor Dok.BC',
      dataIndex: 'DOC_NO',
      key: 'DOC_NO',
      ...getColumnSearchProps('DOC_NO'),
    
    },
    {
      title: 'Tanggal Dok.BC',
      dataIndex: 'DOC_Date',
      key: 'DOC_Date',   
      render: (text) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const convertedDate = new Date(text).toLocaleDateString('id-ID', options);
        return <span>{convertedDate}</span>;
      },    
      ...getColumnDateProps('DOC_Date')
    },
  ]
  return (
    <LayoutContentWrapper style={{ height: '100%' }}>
    <LayoutContent>
    <div>
    <div style={{ marginBottom: 16,  display: "flex", width: "100%", justifyContent: "center"}}>
    <h1 style={{margin: "7px 10px 0 0"}}>Masukan Tanggal:</h1>
    <RangePicker format={dateFormat}
      renderExtraFooter={() => 'Custom footer'}
      onChange={handleDateChange} />
    <Button onClick={handleClickAlert} disabled={isButtonDisabled} style={{marginLeft: 16,  backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px"}}>Submit Tanggal</Button>
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
              generatePDF();
            }
          }}>
            Export {exportType.toUpperCase()}
          </Button>
        )}
          <Button onClick={handleClick}  style={{width: 130, marginLeft: 16,  backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px"}}>Trace</Button>
        <Modal
        title={`Trace Stock Kode Barang - ${selectedRowKeys}`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer
      >
        <div>
        <Table id="table-ref-modal"  columns={columnModal} dataSource={dataTrace} scroll={{ x: 400 }} ref={tableRef} />
        </div>
      </Modal>
      </div>
      {
      alert === false ? <div style={{position: "relative", top: "10", right: "10", display:alert === false ? "block" : "none", zIndex: "99"}}>  <Alert
      message="Catatan Informasi"
      description="Isi Date Range Sebelum Melihat Data"
      type="info"
      showIcon
    /></div> :
      filteredData.length > 0 ? (
        <Table id="table-ref" columns={columns} dataSource={filteredData}  rowSelection={rowSelection}    onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })} rowKey="DOC_NO" scroll={{ x: 400 }} ref={tableRef}/>
      ) : (
        <Table id="table-ref" columns={columns}    scroll={{ x: 400 }} ref={tableRef}/>      )}
    </div>
    </LayoutContent>
      </LayoutContentWrapper>
  );
};

export default PengeluaranBarang;
