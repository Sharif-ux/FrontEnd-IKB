import React, { useEffect, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, DatePicker, Select, Button, Space, Modal } from 'antd';
import { Input } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { exportToPDF } from '../../components/utility/ExportDoc';
import { ExportToCsv } from 'export-to-csv';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs'; // Add this import statement
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { IoMdCreate, IoIosTrash, IoMdAdd, IoIosCopy } from "react-icons/io";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import ModalComponent from './addMaterial';
const { RangePicker } = DatePicker;
const { Option } = Select;



const TableMaterial = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [exportType, setExportType] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };
  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText('');
  // };
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
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1, 

    },
    {
      title: 'Tanggal',
      dataIndex: 'rawin_date',
      key: 'rawin_date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
      ...getColumnSearchProps('rawin_date'),
    },
    {
      title: 'No Bukti',
      dataIndex: 'rawin_no',
      key: 'rawin_no',
      ...getColumnSearchProps('rawin_no'),
    },
    {
      title: 'Kode Barang',
      dataIndex: 'kd_brg',
      key: 'kd_brg',
      ...getColumnSearchProps('kd_brg'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {<>    <Button style={{ backgroundColor: "#efefef", color: "#1f2431", borderRadius: "5px",   display: "inline-flex",
      alignItems: "center", gap: "5px"}} icon={<IoIosCopy size={17} />}>Hapus</Button></>}, 

    },
  ];
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, dateRange]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rawin');
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
      const itemDate = moment(item.TanggalTransaksi, 'YYYY-MM-DD');
      return (
        itemDate.isSameOrAfter(dateRange[0], 'day') &&
        itemDate.isSameOrBefore(dateRange[1], 'day')
      );
    });
    setFilteredData(filtered);
  };
 
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  }
  const exportToCSV = () => {
    const csvExporter = new ExportToCsv({
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
    });

    const exportedData = filteredData.map((item) => ({
      KONTRAK_NO: item.KONTRAK_NO,
      Kd_Brg: item.Kd_Brg,
      Item_Qty: item.Item_Qty,
      'Tanggal Transaksi': moment(item.TanggalTransaksi).format('YYYY-MM-DD'),
    }));

    csvExporter.generateCsv(exportedData);
  };

  const exportToExcel = () => {
    const exportedData = filteredData.map((item) => ({
      KONTRAK_NO: item.KONTRAK_NO,
      Kd_Brg: item.Kd_Brg,
      Item_Qty: item.Item_Qty,
      'Tanggal Transaksi': moment(item.TanggalTransaksi).format('YYYY-MM-DD'),
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

//   const exportToPDF = () => {
//     const tableRef = React.useRef(null);
//     const tableNode = tableRef.current;
  
//     html2canvas(tableNode).then((canvas) => {
//       const contentWidth = canvas.width;
//       const contentHeight = canvas.height;
//       const pageHeight = (contentWidth / 592.28) * 841.89;
//       const leftHeight = contentHeight;
//       let position = 0;
  
//       const imgWidth = 595.28;
//       const imgHeight = (592.28 / contentWidth) * contentHeight;
  
//       const pdf = new jsPDF('p', 'pt', 'a4');
//       const pageData = canvas.toDataURL('image/jpeg', 1.0);
//       pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  
//       leftHeight -= pageHeight;
//       while (leftHeight > 0) {
//         position = leftHeight - contentHeight;
  
//         html2canvas(tableNode, {
//           y: position,
//         }).then((newCanvas) => {
//           const newPageData = newCanvas.toDataURL('image/jpeg', 1.0);
//           pdf.addPage();
//           pdf.addImage(newPageData, 'JPEG', 0, 0, imgWidth, imgHeight);
//           leftHeight -= pageHeight;
  
//           if (leftHeight > 0) {
//             pdf.setPage(pdf.internal.getNumberOfPages() + 1); // Increment the page number using getPageCount() + 1
//           }
//         });
//       }
  
//       pdf.save('data.pdf');
//     });
//   };
// const exportToPDF = () => {
//     const exportedData = filteredData.map((item) => ({
//       Code: item.code,
//       Description: item.description,
//       Category: item.category,
//       'Tanggal Transaksi': moment(item.TanggalTransaksi).format('YYYY-MM-DD'),
//     }));
  
//     const columns = [
//       { header: 'Code', dataKey: 'Code' },
//       { header: 'Description', dataKey: 'Description' },
//       { header: 'Category', dataKey: 'Category' },
//       { header: 'Tanggal Transaksi', dataKey: 'Tanggal Transaksi' },
//     ];
  
//     const doc = new jsPDF();
//     doc.autoTable({
//       head: [columns.map((column) => column.header)],
//       body: exportedData,
//       columns: columns.map((column) => column.dataKey),
//     });
  
//     doc.save('data.pdf');
//   };
  
  return (

    <div>
    <div style={{ marginBottom: 16,  display: "flex", width: "100%", justifyContent: "center", gap: "12px"}}>
        {/* <RangePicker onChange={handleDateChange} />
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
        )} */}
         <Button onClick={openModal} style={{ backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px",   display: "inline-flex",
  alignItems: "center", gap: "5px"}} icon={<IoMdAdd size={17}  />}>Baru</Button>
    <Button style={{ backgroundColor: "#efefef", color: "#1f2431", borderRadius: "5px",   display: "inline-flex",
  alignItems: "center", gap: "5px"}} icon={<IoIosCopy size={17} />}>Impor Excell</Button>

  <ModalComponent visible={modalVisible} closeModal={closeModal}/>
      </div>
      {filteredData.length > 0 ? (
        <Table id="table-ref" columns={columns} dataSource={filteredData}  rowKey={(record, index) => index}/>
      ) : (
        <p>No data available</p>
      )}
    </div>

  );
};

export default TableMaterial;