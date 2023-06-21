import React, { useEffect, useState, useRef} from 'react';
import { Table, DatePicker, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space,  } from 'antd';
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


const PengeluaranBarang = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [exportType, setExportType] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
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
      ...getColumnSearchProps('DOC_Date'),
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
      ...getColumnSearchProps('DO_Date'),

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
      const response = await axios.get('http://localhost:3000/pengeluaranbarang');
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
      showLabels: true,
      showTitle: true,
      useTextFile: false,
      useBom: true,
    });

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

      // 'Tanggal Transaksi': moment(item.TanggalTransaksi).format('YYYY-MM-DD'),
    }));

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
    link.download = 'data.xlsx';
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
const exportToPDF = () => {
  const tableRef = document.getElementById('table-ref');

  html2canvas(tableRef).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 30, 30, pageWidth - 60, pageHeight - 60);
    pdf.save('data.pdf');
  });
};
  return (
    <LayoutContentWrapper style={{ height: '100%' }}>
    <LayoutContent>
    <div>
    <div style={{ marginBottom: 16,  display: "flex", width: "100%", justifyContent: "center"}}>
        <RangePicker onChange={handleDateChange} />
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
      </div>
      {filteredData.length > 0 ? (
        <Table id="table-ref" columns={columns} dataSource={filteredData} scroll={{ x: 400 }} rowKey={(record, index) => index} ref={tableRef}/>
      ) : (
        <p>No data available</p>
      )}
    </div>
    </LayoutContent>
      </LayoutContentWrapper>
  );
};

export default PengeluaranBarang;
