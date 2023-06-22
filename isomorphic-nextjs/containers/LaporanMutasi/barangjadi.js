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
import { exportToPDF } from '../../components/utility/ExportDoc';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import 'jspdf-autotable';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
const { RangePicker } = DatePicker;
const { Option } = Select;


const BarangJadi = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [exportType, setExportType] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
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
      title: 'Kode Barang',
      dataIndex: 'KodeBarang',
      key: 'KodeBarang',
      ...getColumnSearchProps('KodeBarang'),
    },
    {
      title: 'Nama Barang',
      dataIndex: 'Nm_Brg',
      key: 'Nm_Brg',
      ...getColumnSearchProps('Nm_Brg'),
    },
    {
      title: 'Satuan',
      dataIndex: 'Unit_Desc',
      key: 'Unit_Desc',
      ...getColumnSearchProps('Unit_Desc'),
    },
    {
      title: 'Saldo Awal',
      dataIndex: 'Saldo_Awal',
      key: 'Saldo_Awal',           
      ...getColumnSearchProps('Saldo_Awal')

    },
    {
      title: 'Pemasukan',
      dataIndex: 'IN_Brg',
      key: 'IN_Brg',
      ...getColumnSearchProps('IN_Brg'),
  
    },
    {
      title: 'Pengeluaran',
      dataIndex: 'OUT_Brg',
      key: 'OUT_Brg',

      ...getColumnSearchProps('OUT_Brg')
  
    },
    {
      title: 'Penyusaian',
      dataIndex: 'Adjust_Brg',
      key: 'Adjust_Brg',
      ...getColumnSearchProps('Adjust_Brg'),
  
    },
    {
      title: 'Stock Opname',
      dataIndex: 'Qty_Fisik',
      key: 'Qty_Fisik',
      ...getColumnSearchProps('Qty_Fisik'),
  
    },
    {
      title: 'Saldo Akhir',
      dataIndex: 'Qty_System',
      key: 'Qty_System',
      ...getColumnSearchProps('Qty_System'),
  
    },
    {
      title: 'Selisih',
      dataIndex: 'selisih',
      key: 'selisih',
      ...getColumnSearchProps('selisih'),
  
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
      const response = await axios.get('http://localhost:3000/barangjadi');
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
      // 'Tanggal Transaksi': moment(item.TanggalTransaksi).format('YYYY-MM-DD'),
    }));

    csvExporter.generateCsv(exportedData);
  };

  const exportToExcel = () => {
    const exportedData = filteredData.map((item) => ({
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
  //   const tableNode = tableRef.current;
  
  //   html2canvas(tableNode).then((canvas) => {
  //     const contentWidth = canvas.width;
  //     const contentHeight = canvas.height;
  //     const pageHeight = (contentWidth / 592.28) * 841.89;
  //     const leftHeight = contentHeight;
  //     let position = 0;
  
  //     const imgWidth = 595.28;
  //     const imgHeight = (592.28 / contentWidth) * contentHeight;
  
  //     const pdf = new jsPDF('p', 'pt', 'a4');
  //     const pageData = canvas.toDataURL('image/jpeg', 1.0);
  //     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  
  //     leftHeight -= pageHeight;
  //     while (leftHeight > 0) {
  //       position = leftHeight - contentHeight;
  
  //       html2canvas(tableNode, {
  //         y: position,
  //       }).then((newCanvas) => {
  //         const newPageData = newCanvas.toDataURL('image/jpeg', 1.0);
  //         pdf.addPage();
  //         pdf.addImage(newPageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  //         leftHeight -= pageHeight;
  
  //         if (leftHeight > 0) {
  //           pdf.setPage(pdf.internal.getNumberOfPages() + 1); // Increment the page number using getPageCount() + 1
  //         }
  //       });
  //     }
  
  //     pdf.save('data.pdf');
  //   });
  // };
  // const exportToPDF = async  ()  => {
  //   const MyDocument = () => (
  //     <Document>
  //       <Page style={styles.page}>
  //         <View style={styles.section}>
  //           <Text style={styles.header}>Data Table</Text>
  //           <View style={styles.table}>
  //             <View style={styles.tableRow}>
  //               <View style={styles.tableColHeader}>
  //                 <Text style={styles.tableCellHeader}>Kode barang</Text>
  //               </View>
  //               <View style={styles.tableColHeader}>
  //                 <Text style={styles.tableCellHeader}>No Aju</Text>
  //               </View>
  //               <View style={styles.tableColHeader}>
  //                 <Text style={styles.tableCellHeader}>No. Pabean</Text>
  //               </View>
  //             </View>
  //             {data.map((item, index) => (
  //               <View style={styles.tableRow} key={index}>
  //                 <View style={styles.tableCol}>
  //                   <Text style={styles.tableCell}>{item.Kd_Brg}</Text>
  //                 </View>
  //                 <View style={styles.tableCol}>
  //                   <Text style={styles.tableCell}>{item.Nm_Brg}</Text>
  //                 </View>
  //                 <View style={styles.tableCol}>
  //                   <Text style={styles.tableCell}>{item.DOC_NO}</Text>
  //                 </View>
  //               </View>
  //             ))}
  //           </View>
  //         </View>
  //       </Page>
  //     </Document>
  //   );

  //   const pdfBlob = PDFViewer.render(<MyDocument />).toBlob();
  //   const url = URL.createObjectURL(pdfBlob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'data.pdf';
  //   link.click();
  //   URL.revokeObjectURL(url);
  // };


// const exportToPDF = () => {
//   const tableRef = document.getElementById('table-ref');

//   html2canvas(tableRef).then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'pt', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     pdf.addImage(imgData, 'PNG', 30, 30, pageWidth - 60, pageHeight - 60);
//     pdf.save('data.pdf');
//   });
// };
// const exportToPDF = () => {
//   const doc = new jsPDF();
//   doc.setFontSize(8);
//   doc.text('Penerimaan Barang', 5, 5);

//   let yPos = 10;
//   data.forEach((item, index) => {
//     doc.text(item.Kd_Brg, 10, yPos);
//     doc.text(item.Nm_Brg.toString(), 60, yPos);
//     doc.text(item.DOC_NO.toString(), 40, yPos);
//     yPos += 10;
//   });

//   doc.save('data.pdf');
// };
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
              <Button style={{marginLeft: 16,  backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px"}}>Kartu Stock</Button>

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

export default BarangJadi;
