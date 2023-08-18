import React, { useEffect, useState, useRef} from 'react';
import { Table, Select, Button, Modal, InputNumber } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Input, Space, Spin  } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import axios from 'axios';
import Greater from "../../assets/images/greater.svg"
import Less from "../../assets/images/less.svg"
import Equal from "../../assets/images/equal.svg"
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
// import locale from 'antd/es/date-picker/locale/id_ID';
const { DatePicker } = require('antd');
const dateFormat = 'DD/MM/YYYY';

const { RangePicker } = DatePicker;
const { Option } = Select;

const BahanBaku = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [exportType, setExportType] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dt_Awal, setDt_Awal] = useState(null);
  const [Kd_Brg, setKd_Brg] = useState('');
  const [loading, setLoading] = useState(false);
  const [dt_Akhir, setDt_Akhir] = useState(null);
  const [dataTrace, setDataTrace] = useState([])
  const [visible, setVisible] = useState(false);
  const [clickedFilterDate, setClickedFilterDate] = useState(false)
  // const [filteredInfo, setFilteredInfo] = useState({});
  // const [sortedInfo, setSortedInfo] = useState({});
  // const [filterOption, setFilterOption] = useState(null);
  // const [filterValue, setFilterValue] = useState(null);
  // const [inputValue, setInputValue] = useState('');
  const [userInputNumber, setUserInputNumber] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState(null);
  const [disabledInput, setDisabledInput] = useState(true);
  const searchInput = useRef(null);
  const tableRef = useRef(null);
  // const handleFilterClick = () => {
  //   setFilterVisible(false);
  // };

  // const handleFilterChange = (value) => {
  //   setFilterValues(value);
  // };

  // const handleFilterConfirm = (selectedKeys, confirm, dataIndex) => {
  //   setFilterVisible(false);
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleFilterReset = () => {
  //   setFilterValues(null);
  //   setFilterVisible(false);
  // };

  // const handleFilterVisibleChange = (visible) => {
  //   setFilterVisible(visible);
  // };
  // const handleChange = (pagination, filters, sorter) => {
  //   console.log('Various parameters', pagination, filters, sorter);
  //   setFilteredInfo(filters);
  //   setSortedInfo(sorter);
  // };
  
  const getFilterDataInput = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Select
          style={{ width: 120, marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          onChange={(value) => setSelectedKeys(value ? [value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        >
          <Option value="less"><img src={Less} width="10" height="10"/></Option>
          <Option value="equal"><img src={Equal} width="10" height="10"/></Option>
          <Option value="greater"><img src={Greater} width="10" height="10"/></Option>
        </Select>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[1]}
          onChange={(e) => setSelectedKeys([selectedKeys[0], e.target.value ? e.target.value : undefined])}
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
    filterIcon: (filtered) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      const [operator, filterValue] = value;
      const dataIndexValue = record[dataIndex];
        if (operator === 'less') {
          return dataIndexValue <= parseInt(filterValue);
        }else if(operator === 'equal'){
          return dataIndexValue === parseInt(filterValue)
        }
         else if (operator === 'greater') {
          return dataIndexValue >= parseInt(filterValue);
        }
        console.log("Hasil dataIndexValue", dataIndexValue)
        console.log("Hasil Value", value)
      return false;
    },
  });

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
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    // const handleTableClick = (record) => {
    //   setSelectedRowKeys([record.Kd_Brg]);
    
      
    //   const selectedRecord = data.find((item) => item.Kd_Brg === record.Kd_Brg);
    //   console.log("cek selectedRecord" ,selectedRecord)

    //   if (selectedRecord) {
    //     setKd_Brg(selectedRecord.Kd_Brg);
    //     console.log("cek", selectedRecord.KodeBarang)
    //   } else {
    //     setKd_Brg('');
    //   }
    // };  
    const dataGeneratefile = `${dt_Awal} - ${dt_Akhir}` 
    const handleRowClick = (record) => {
      const selectedRecord = data.find((item) => item.Kd_Brg === record.Kd_Brg);
  
      if (selectedRecord) {
        setSelectedRowKeys([record.Kd_Brg]);
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
    // const callStoredProc = () => {
    //   const Kd_Brg = selectedRowKeys[0];
    //   const apiUrl = 'http://192.168.1.21:3000/storedprocedure'; 
  
    //   axios
    //     .get(apiUrl, {
    //       params: {
    //         Kd_Brg,
    //         dt_Awal: dt_Awal.format('YYYY-MM-DD'),
    //         dt_Akhir: dt_Akhir.format('YYYY-MM-DD'),
    //       },
    //     })
    //     .then((response) => {
        
    //       setDataTrace(response.data);
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };
    // const callStoredProc = () => {
    //   const apiUrl = 'http://192.168.1.21:3000/spalat';
    //   const token = cookie.get('token');
    //   const decodedToken = jwt.decode(token);
    //   const User_id = decodedToken.User_id;
    //   console.log('User_Id:', User_id);
    //   console.log('Kategori:', Kategori);
    
    //   axios
    //     .get(apiUrl, {
    //       params: {
    //         User_id,
    //         dt_Awal: dt_Awal.format('YYYY-MM-DD'),
    //         dt_Akhir: dt_Akhir.format('YYYY-MM-DD'),
    //         Kategori: "ALAT",
    //       },
    //     }
    //     )
    //     .then((response) => {
    //       setDataTrace(response.data);
    //       console.log("LaporanMutasiBahanBaku",response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };
    useEffect(() => {
      const token = cookie.get('token');
      console.log('Token:', token);
    }, []);
    const fetchData = async () => {
      try {
        const token = cookie.get('token');
        const response = await fetch('http://192.168.1.21:3000/bahanbaku', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Data:', data);
          setData(data.data);
        } else {
          const errorData = await response.json();
          console.log('Error:', errorData);
        }
      } catch (error) {
        console.error('Error occurred during API request:', error);
      }
    };
    
    useEffect(() => {
      fetchData();
    
      // Fetch data periodically
      const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds (adjust the interval as needed)
    
      return () => {
        // Clear the interval when the component is unmounted
        clearInterval(interval);
      };
    }, []);
    
    const callStoredProc = async () => {
      try {
        setLoading(true);
    
        const token = cookie.get('token');
        const User_Id = token;
    
        const response = await axios.get('http://192.168.1.21:3000/spbb', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            User_Id,
            dt_Awal: dt_Awal.format('YYYY-MM-DD'),
            dt_Akhir: dt_Akhir.format('YYYY-MM-DD'),
            Kategori: 'BB/BP',
          },
        });
    
        if (response.status === 200) {
          setData(response.data);
          setLoading(false);
          console.log('Data after stored procedure:', response.data);
        } else {
          console.error('Error occurred during stored procedure:', response.data);
        }
      } catch (error) {
        console.error('Error occurred during stored procedure:', error);
      }finally {
        setLoading(false);
      }
    };
    

    console.log('setDataTrace', dataTrace);
    const traceStock = () => {
      const Kd_Brg = selectedRowKeys[0];
      const apiUrl = 'http://192.168.1.21:3000/tracebystock'; 
  
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
      //this are the option for filter column
      const filters = [
        {
          text: '>=',
          value: 'greaterandequal',
        },
        {
          text: '<=',
          value: 'lessandequal',
        },
        {
          text: '>',
          value: 'greater',
        },
        {
          text: '<',
          value: 'less',
        },
        {
          text: '==',
          value: 'equal',
        },
      ];
    //this for filter generate column number input by value option arithmetic
      const CustomFilter = ({ value, onChange }) => {
        const handleInputChange = (inputValue) => {
          const numberValue = Number(inputValue);
          if (!isNaN(numberValue)) {
            onChange(numberValue);
          } else {
            onChange(null);
          }
        };
    
        return (
                  <InputNumber
          style={{ margin: "10px", width: "80px" }}
          value={value}
          onChange={handleInputChange}
        />
        );
      };
      const handleFilter = (value, record, dataIndex) => {
        switch (value) {
          case 'greaterandequal':
            return record[dataIndex] >= userInputNumber;
            case 'lessandequal':
              return record[dataIndex] <= userInputNumber;
          case 'greater':
            return record[dataIndex] > userInputNumber;
          case 'less':
            return record[dataIndex] < userInputNumber;
          case 'equal':
            return record[dataIndex] === userInputNumber;
          default:
            return true; // Return true for all other cases
        }
      };
    
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
      render: (text) => {
        
        <h1 style={{ overflow: "hidden", whiteSpace: "nowrap"}}>{text}</h1>
      },
      ...getColumnSearchProps('Kd_Brg'),
    },
    {
      title: 'Nama Barang',
      dataIndex: 'Nm_Brg',
      key: 'Nm_Brg',
      width: 200,
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
      align: "right", 
      filters: filters,
      onFilter:(value, record) => handleFilter(value, record, 'Saldo_Awal'),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, dataIndex, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 60 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys([value])}
            onBlur={confirm}
          >
            {filters.map((filter) => (
              <Option key={filter.value} value={filter.value}>
                {filter.text}
              </Option>
            ))}
          </Select>
          <CustomFilter
            value={userInputNumber}
            onChange={(value) => setUserInputNumber(value)}
          />
          <Space style={{margin: "10px"}}>
          <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </Button>
            <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      // ...getColumnSearchProps('Saldo_Awal')
      render: (text) => parseInt(text).toLocaleString(),

    },
    {
      title: 'Pemasukan',
      dataIndex: 'pemasukan',
      key: 'pemasukan',
      align: "right", 
      filters: filters,
      onFilter:(value, record) => handleFilter(value, record, 'pemasukan'),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, dataIndex, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 60 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys([value])}
            onBlur={confirm}
          >
            {filters.map((filter) => (
              <Option key={filter.value} value={filter.value}>
                {filter.text}
              </Option>
            ))}
          </Select>
          <CustomFilter
            value={userInputNumber}
            onChange={(value) => setUserInputNumber(value)}
          />
          <Space style={{margin: "10px"}}>
          <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </Button>
            <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      // ...getColumnSearchProps('pemasukan'),
      render: (text) => parseInt(text).toLocaleString(),
    },
    {
      title: 'Pengeluaran',
      dataIndex: 'pengeluaran',
      key: 'pengeluaran',
      align: "right", 
      filters: filters,
      onFilter:(value, record) => handleFilter(value, record, 'pengeluaran'),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, dataIndex, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 60 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys([value])}
            onBlur={confirm}
          >
            {filters.map((filter) => (
              <Option key={filter.value} value={filter.value}>
                {filter.text}
              </Option>
            ))}
          </Select>
          <CustomFilter
            value={userInputNumber}
            onChange={(value) => setUserInputNumber(value)}
          />
          <Space style={{margin: "10px"}}>
          <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </Button>
            <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      render: (text) => parseInt(text).toLocaleString(),

    },
    //   onFilter: (value, record) => {
    //     if (filterValues === null) {
    //       return true; // Return true if no filter value is set
    //     }

    //     switch (value) {
    //       case 'greater':
    //         return record.pengeluaran > filterValue;
    //       case 'less':
    //         return record.pengeluaran < filterValue;
    //       case 'equal':
    //         return record.pengeluaran === filterValue;
    //       default:
    //         return true; // Return true for all other cases
    //     }
    //   },
    //   filterMultiple: false,
    //   filterDropdown: ({
    //     setSelectedKeys,
    //     selectedKeys,
    //     confirm,
    //     clearFilters,
    //   }) => (
    //     <div style={{ padding: 8 }}>
    //       <InputNumber
    //         style={{ width: 120, marginRight: 8 }}
    //         min={0}
    //         placeholder="Enter a number"
    //         value={selectedKeys[0]}
    //         onChange={handleFilterChange}
    //         onPressEnter={handleFilterConfirm}
    //       />
    //       <Button
    //         type="primary"
    //         onClick={handleFilterConfirm}
    //         size="small"
    //         style={{ marginRight: 8 }}
    //       >
    //         Filter
    //       </Button>
    //       <Button onClick={handleFilterReset} size="small">
    //         Reset
    //       </Button>
    //     </div>
    //   ),
    //   filterIcon: (filtered) => (
    //     <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    //   ),
    //   onFilterDropdownVisibleChange: handleFilterVisibleChange,
    // },
    {
      title: 'Penyesuaian',
      dataIndex: 'Adjust_Brg',
      key: 'Adjust_Brg',
      align: "right", 
      filters: filters,
      onFilter:(value, record) => handleFilter(value, record, 'Adjust_Brg'),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, dataIndex, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 60 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys([value])}
            onBlur={confirm}
          >
            {filters.map((filter) => (
              <Option key={filter.value} value={filter.value}>
                {filter.text}
              </Option>
            ))}
          </Select>
          <CustomFilter
            value={userInputNumber}
            onChange={(value) => setUserInputNumber(value)}
          />
          <Space style={{margin: "10px"}}>
          <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </Button>
            <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      render: (text) => parseInt(text).toLocaleString(),

      // ...getColumnSearchProps('Adjust_Brg'),
      },
    {
      title: 'Qty Fisik',
      dataIndex: 'Qty_Fisik',
      key: 'Qty_Fisik',
      align: "right", 
      filters: filters,
      onFilter:(value, record) => handleFilter(value, record, 'Qty_Fisik'),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, dataIndex, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 60 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys([value])}
            onBlur={confirm}
          >
            {filters.map((filter) => (
              <Option key={filter.value} value={filter.value}>
                {filter.text}
              </Option>
            ))}
          </Select>
          <CustomFilter
            value={userInputNumber}
            onChange={(value) => setUserInputNumber(value)}
          />
          <Space style={{margin: "10px"}}>
          <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </Button>
            <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      // ...getColumnSearchProps('Qty_Fisik'),
      render: (text) => parseInt(text).toLocaleString(),

    },
    {
      title: 'Saldo Akhir',
      dataIndex: 'Qty_System',
      key: 'Qty_System',
      align: "right", 
      filters: filters,
      onFilter:(value, record) => handleFilter(value, record, 'Qty_System'),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, dataIndex, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 60 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys([value])}
            onBlur={confirm}
          >
            {filters.map((filter) => (
              <Option key={filter.value} value={filter.value}>
                {filter.text}
              </Option>
            ))}
          </Select>
          <CustomFilter
            value={userInputNumber}
            onChange={(value) => setUserInputNumber(value)}
          />
          <Space style={{margin: "10px"}}>
          <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </Button>
            <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      // filters: [
      //   {
      //     text: 'Greater',
      //     value: 'greater',
      //   },
      //   {
      //     text: 'Less',
      //     value: 'less',
      //   },
      //   {
      //     text: 'Equal',
      //     value: 'equal',
      //   },
      // ],
      
      // onFilter: (value, record) => {
      //   switch (value) {
      //     case 'greater':
      //       return record.Qty_System > parseInt();
      //     case 'less':
      //       return record.Qty_System < 0;
      //     case 'equal':
      //       return record.Qty_System === 0;
      //     default:
      //       return true; // Return true for all other cases
      //   }
      // }
      // ...getFilterDataInput('Qty_System')
      render: (text) => parseInt(text).toLocaleString(),

    },
    {
      title: 'Selisih',
      dataIndex: 'selisih',
      key: 'selisih',
      align: "right", 
      filters: filters,
      onFilter:(value, record) => handleFilter(value, record, 'selisih'),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, dataIndex, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 60 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys([value])}
            onBlur={confirm}
          >
            {filters.map((filter) => (
              <Option key={filter.value} value={filter.value}>
                {filter.text}
              </Option>
            ))}
          </Select>
          <CustomFilter
            value={userInputNumber}
            onChange={(value) => setUserInputNumber(value)}
          />
          <Space style={{margin: "10px"}}>
          <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{ width: 90 }}>
            Search
          </Button>
            <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      // ...getColumnSearchProps('selisih'),
      render: (text) => parseInt(text).toLocaleString(),

  
    },
    // {
    //   title: 'Tanggal Transaksi',
    //   dataIndex: 'TanggalTransaksi',
    //   key: 'TanggalTransaksi',
    //   render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    // },
  ];
  const isButtonDisabled = !dt_Awal || !dt_Akhir || rowSelection == null; // Check if either dt_Awal or dt_Akhir is null


  useEffect(() => {
    filterData();
  }, [data, dateRange]);
 

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
  const handleClick = () => {
    showModal();
    traceStock();
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
      filename: `LaporanMutasiBahanBakuTrace ${dataGeneratefile}`
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
        "Masuk": item.pemasukan,
        "Keluar": item.pengeluaran,
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
      "Masuk": item.pemasukan,
      "Keluar": item.pengeluaran,
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
    link.download = `LaporanMutasiBahanBakuTrace ${dataGeneratefile}.xlsx`;
    link.click();
  };
  const exportToPDF2 = () => {
    const doc = new jsPDF();

    const tableContent2 = [];
    const columns2 = Object.keys(dataTrace[0]);

    dataTrace.forEach(row => {
      const rowData = Object.values(row);
      tableContent2.push(rowData);
    });

  const customHeader2 = ['Sumber Trans', 'No Refrensi', 'Nama Barang', 'Satuan', 'Saldo Awal', 'Pemasukan', 'Pengeluaran', 'Penyesuaian', 'Stock Opname', 'Saldo Akhir', 'Selisih'];
  doc.autoTable({
      head: [customHeader2],
      body: tableContent2,
    });

    doc.save('LaporanMutasiBahanBakuTrace.pdf');
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
      filename: `LaporanMutasiBahanBaku ${dataGeneratefile}`
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
        "Kode Barang": item.Kd_Brg,
        "Nama Barang": item.Nm_Brg,
        "Satuan": item.Unit_Desc,
        "Saldo Awal": item.Saldo_Awal,
        "Pemasukan": item.pemasukan,
        "Pengeluaran": item.pengeluaran,
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
      "Kode Barang": item.Kd_Brg,
      "Nama Barang": item.Nm_Brg,
      "Satuan": item.Unit_Desc,
      "Saldo Awal": item.Saldo_Awal,
      "Pemasukan": item.pemasukan,
      "Pengeluaran": item.pengeluaran,
      "Penyesuaian": item.Adjust_Brg,
      "Stock Opname": item.Qty_Fisik,
      "Nama Barang": item.Nm_Brg,
      "Saldo Akhir": item.Qty_System,
      "Selisih": item.selisih,
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
    link.download = `LaporanMutasiBahanBaku ${dataGeneratefile}.xlsx`;
    link.click();
  };

  
  const exportToPDF = async (data) => {
    const doc = new jsPDF();
    const tableContent = [];
    const columns = Object.keys(data[0]);
  
    data.forEach((row) => {
      const rowData = Object.values(row);
      tableContent.push(rowData);
    });
    const customHeader = ['No', 'Kode Barang', 'Nama Barang', 'Satuan', 'Saldo Awal', 'Pemasukan', 'Pengeluaran', 'Penyesuaian', 'Stock Opname', 'Saldo Akhir', 'Selisih'];
    await doc.autoTable({
      head: [customHeader],
      body: tableContent,
    });
  
    doc.save(`LaporanMutasiBahanBaku${dataGeneratefile}.pdf`);
  };
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
    ...getColumnSearchProps('Source_Trans'),
  
  },
  {
    title: 'No Refrensi',
    dataIndex: 'No_Reference',
    key: 'No_Reference',
    ...getColumnSearchProps('No_Reference'),
  
  },
  {
    title: 'Keterangan',
    dataIndex: 'Keterangan',
    key: 'Keterangan',
    ...getColumnSearchProps('Keterangan'),
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
    ...getColumnDateProps('Date_Transaction')
  },
  {
    title: 'Harga',
    dataIndex: 'Harga',
    key: 'Harga',
    ...getColumnSearchProps('Harga'),
  },
  {
    title: 'Masuk',
    dataIndex: 'pemasukan',
    key: 'pemasukan',
    ...getColumnSearchProps('pemasukan'),
  },
  {
    title: 'Keluar',
    dataIndex: 'pengeluaran',
    key: 'pengeluaran',
    ...getColumnSearchProps('pengeluaran'),
  
  },
  {
    title: 'Penyesuaian',
    dataIndex: 'Adjust_Brg',
    key: 'Adjust_Brg',
    ...getColumnSearchProps('Adjust_Brg'),
  
  },
  {
    title: 'Kode Barang',
    dataIndex: 'Kd_Brg',
    key: 'Kd_Brg',
    ...getColumnSearchProps('Kd_Brg'),
  
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
    title: 'Saldo(QTY)',
    dataIndex: 'Balance_QTY',
    key: 'Balance_QTY',
    ...getColumnSearchProps('Balance_QTY'),
  
  }]
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <LayoutContentWrapper style={{ height: '100%' }}>
    <LayoutContent>
    <div>
    <div style={{ marginBottom: 16,  display: "flex", width: "100%", justifyContent: "center"}} className='topRow'>
    <h1 style={{margin: "7px 10px 0 0"}}>Masukan Tanggal:</h1>
    <DatePicker.RangePicker
  value={[dt_Awal, dt_Akhir]}
  format={dateFormat}
  onChange={(dates) => {
    if (dates === null) {
      setDt_Awal(null);
      setDt_Akhir(null);
    } else {
      setDt_Awal(dates[0]);
      setDt_Akhir(dates[1]);
    }
  }}
/>
<Button type='primary' onClick={() => {callStoredProc(); setClickedFilterDate(true);}} style={{marginLeft: 16,  backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px"}}>Submit Tanggal</Button>

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
              <Button onClick={handleClick} disabled={isButtonDisabled} style={{marginLeft: 16,  backgroundColor: "#1f2431", color: "#efefef", borderRadius: "5px"}}>Kartu Stock</Button>
              <Modal
        title={`Trace Stock Kode Barang - ${selectedRowKeys}`}
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
              exportToPDF2();
            }
          }}>
            Export {exportType.toUpperCase()}
          </Button>)}
          </div>
        <Table id="table-ref-modal" columns={columnModal} dataSource={dataTrace} scroll={{ x: 400 }} ref={tableRef} />
        </div>
      </Modal>
      </div>
      {loading ? (
        <div style={{width: "100%",display: "flex", justifyContent: "center", marginTop: "4rem"}}>
        <Spin size="large" delay={5}/> 
        </div>// Display the loading indicator while loading is true
      ) : (
      <Table id="table-ref" columns={columns} dataSource={clickedFilterDate !== null ? data : ''} scroll={{ x: 100  }} ref={tableRef}  rowKey="Kd_Brg"
        rowSelection={rowSelection}    onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      )} 
    </div>

    </LayoutContent>
      </LayoutContentWrapper>
  );
};

export default BahanBaku;
