import React, { useEffect, useState, useRef } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Table, DatePicker, Select, Button, Space, Modal, Popconfirm, message } from 'antd';
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
import ModalUpdateComponent from './updateMaterial';
const { RangePicker } = DatePicker;
const { Option } = Select;


const dateFormat = 'DD/MM/YYYY';

const TableMaterial = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [exportType, setExportType] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const tableRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [insertVisible, setInsertVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [getDetail, setGetDetail] = useState([]);
  const handleRowClick = (record) => {
    const selectedRecord = data.find((item) => item.RAWIN_NO === record.RAWIN_NO);
    if (selectedRecord) {
      setSelectedRowKeys([record.RAWIN_NO]);
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
  console.log("rowSelection",rowSelection)
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
    const handleDelete = async (RAWIN_NO) => {
      try {
        const response = await axios.delete(`http://192.168.1.21:3000/deleteform/${RAWIN_NO}`);
        message.success(response.data.message);
        // After deletion, refetch the updated data
        fetchData();
      } catch (error) {
        console.error('Error deleting data:', error.message);
        message.error('Failed to delete data.');
      }
    };
    const getData = () => {
      const RAWIN_NO = selectedRowKeys[0];
      const apiUrl = 'http://192.168.1.21:3000/getDataforUpdate'; 
  
      axios
        .get(apiUrl, {
          params: {
            RAWIN_NO,
          },
        })
        .then((response) => {
        
          setDataUpdate(response.data);
          console.log("getData",response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const getDetailLaporanMutasi = () => {
      const rawinNo = selectedRowKeys[0];
      const apiUrl = 'http://192.168.1.21:3000/detaillaporanmutasi'; 
      axios
        .get(apiUrl, {
          params: {
            rawinNo,
          },
        })
        .then((response) => {
          setGetDetail(response.data);
          console.log("getDetail111", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleDataUpdate = async (updatedData) => {
      // // Implement the data update logic here (e.g., using fetch or Axios)
      // Make a PUT request to your backend API to update the data
  const RAWIN_NO = selectedRowKeys[0];
  const response = await fetch(`http://192.168.1.21:3000/updateform/${RAWIN_NO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchData(); // Fetch updated data after successful update
        message.success('Data Berhasil di update')

      }
      handleCloseModal();
    };
    const executeStoredProc = async () => {
      const RAWIN_NO =  selectedRowKeys[0];
      try {
        const response = await axios.get('http://192.168.1.21:3000/updateIdForRAWIN', {
          params: {
            RAWIN_NO,
          },
        });
        // setMessage(response.data.message);
        console.log('berhasil:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  const updateData = () => {
    if (selectedRowKeys.length !== 0){
      getData();
      getDetailLaporanMutasi();
      handleOpenModal();
    } else {
      message.info('Please choose the row')
    }
  }  
  const handleUpdate = (Kd_Brg) => {
      // Perform update operation based on the Kd_Brg
      message.info(`Update item with Kd_Brg ${Kd_Brg}`);
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
      const handleTableDataChange = () => {
        // Fetch updated data and set the getDetail state
        getDetailLaporanMutasi();
      };
  const columns = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1, 

    },
    {
      title: 'NO. REFF',
      dataIndex: 'RAWIN_NO',
      key: 'RAWIN_NO',
      ...getColumnSearchProps('RAWIN_NO'),

    },
    {
      title: 'No. Po',
      dataIndex: 'PO_NO',
      key: 'PO_NO',
      ...getColumnSearchProps('PO_NO'),
    },
    {
      title: 'Tanggal',
      dataIndex: 'RAWIN_Date',
      key: 'RAWIN_Date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
      ...getColumnDateProps('RAWIN_Date'),
    },
   
    {
      title: 'Jenis Transaksi',
      dataIndex: 'RAWIN_Type',
      key: 'RAWIN_Type',
      ...getColumnSearchProps('RAWIN_Type'),
    },
    {
      title: 'Pengirim',
      dataIndex: 'Pengirim',
      key: 'Pengirim',
      ...getColumnSearchProps('Pengirim'),
    },
    {
      title: 'Keterangan',
      dataIndex: 'RAWIN_Desc',
      key: 'RAWIN_Desc',
      ...getColumnSearchProps('RAWIN_Desc'),
    },
    {
      title: 'Jenis Dokumen',
      dataIndex: 'DOC_Type',
      key: 'DOC_Type',
      ...getColumnSearchProps('DOC_Type'),
    },

    {
      title: 'Tanggal Dok.BC',
      dataIndex: 'DOC_Date',
      key: 'DOC_Date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
      ...getColumnDateProps('DOC_Date'),
    },
    {
      title: 'No Dok.BC',
      dataIndex: 'DOC_NO',
      key: 'DOC_NO',
      ...getColumnSearchProps('DOC_NO'),
    },
    {
      title: 'Keterangan Gudang',
      dataIndex: 'Gudang_Desc',
      key: 'Gudang_Desc',
      ...getColumnSearchProps('Gudang_Desc'),
    },
       {
      title: 'No. Invoice',
      dataIndex: 'INV_NO',
      key: 'INV_NO',
      ...getColumnSearchProps('INV_NO'),
    },
    {
      title: 'No. BL',
      dataIndex: 'BL_NO',
      key: 'BL_NO',
      ...getColumnSearchProps('BL_NO'),
    },
 
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <div>
    //       <Button type="primary" onClick={() => handleUpdate(record.kd_brg)}>
    //         Update
    //       </Button>
    //       <Popconfirm
    //         title="Are you sure to delete this item?"
    //         onConfirm={() => handleDelete(record.kd_brg)}
    //       >
    //         <Button type="danger" style={{ }}>
    //           Delete
    //         </Button>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];
  console.log(getDetail)
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, dateRange]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.21:3000/rawin');
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
      const itemDate = moment(item.RAWIN_Date, 'YYYY-MM-DD');
      return (
        itemDate.isSameOrAfter(dateRange[0], 'day') &&
        itemDate.isSameOrBefore(dateRange[1], 'day')
      );
    });
    setFilteredData(filtered);
  };
 
  const openModalInsert = () => {
    setInsertVisible(true);
  };

  const closeModalInsert = () => {
    setInsertVisible(false);
    fetchData();
  }
  const handleOpenModal = () => {
    setUpdateVisible(true);
    executeStoredProc()
  };

  const handleCloseModal = () => {
    setUpdateVisible(false);
  };

  const exportToExcel = () => {
    let counter = 1; // Initialize the counter for the "No" column
  
    const exportedData = filteredData.map((item) => ({
      "No": counter++, // Increment counter and use it as the "No" value
      "No. Refrensi": item.RAWIN_NO,
      "Tanggal": item.RAWIN_Date,
      "Jenis Transaksi": item.RAWIN_Type,
      "Pengirim": item.Pengirim,
      "Keterangan": item.RAWIN_Desc,
      "Jenis Dokumen": item.DOC_Type,
      "Tanggal Dok.BC": item.DOC_Date,
      "No Dok.BC": item.DOC_NO,
      "Keterangan Gudang": item.Gudang_Desc,
      "No. Invoice": item.INV_NO,
      "No. BL": item.BL_NO,
      // 'Tanggal Transaksi': moment(item.TanggalTransaksi).format('YYYY-MM-DD'),
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
    // Autofit column widths
    const columnNames = Object.keys(exportedData[0]);
    const columnWidths = columnNames.map((columnName) => ({
      wch: columnName.length + 5, // Add some extra width for better readability
    }));
    worksheet['!cols'] = columnWidths;
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `LaporanMutasiBarangJadi.xlsx`;
    link.click();
  };
  
  
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
         <Button onClick={openModalInsert} style={{ backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px",   display: "inline-flex",
  alignItems: "center", gap: "5px"}} icon={<IoMdAdd size={17}  />}>Baru</Button>
    <Button onClick={updateData} type='primary' style={{borderRadius: "5px",   display: "inline-flex",
  alignItems: "center", gap: "5px"}} icon={<EditOutlined size={17}/>}>Edit</Button>
      <Button
        type='danger'
        style={{
          borderRadius: '5px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '10px', // Adjust the margin as needed
        }}
        icon={<DeleteOutlined size={17} />}
        onClick={() => handleDelete(selectedRowKeys)}
      >
        Hapus
      </Button>
    <RangePicker format={dateFormat}
      renderExtraFooter={() => 'Custom footer'}
      onChange={handleDateChange} />
    <Button onClick={exportToExcel} style={{ backgroundColor: "#efefef", color: "#1f2431", borderRadius: "5px",   display: "inline-flex",
  alignItems: "center", gap: "5px"}} icon={<IoIosCopy size={17} />}>Impor Excell</Button>
{/* <ModalUpdateComponent visible={updateVisible} closeModal={closeModalUpdate}  initialData={dataUpdate}/> */}
<Modal         title="Update Form"
        visible={updateVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={1400}
        >
<ModalUpdateComponent
  detailmutasi={getDetail}
  setDetailMutasi={setGetDetail}
  updateid={executeStoredProc}
  onTableDataChange={handleTableDataChange}
  selectedRow={selectedRowKeys[0]}
  initialData={selectedRow}
  onUpdate={handleDataUpdate}
  onClose={handleCloseModal}
  disableclosemodal={handleCloseModal}
/></Modal>
  <ModalComponent visible={insertVisible} closeModal={closeModalInsert}/>
      </div>
      {filteredData.length > 0 ? (
        <Table id="table-ref" columns={columns} dataSource={filteredData} rowKey="RAWIN_NO"
        rowSelection={rowSelection} scroll={{ x: 400 }} ref={tableRef} onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}/>
      ) : (
        <p>No data available</p>
      )}
    </div>

  );
};

export default TableMaterial;
