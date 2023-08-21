import React, { useState } from 'react';
import { Table, Input, Button, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const data = [
  {
    key: '1',
    name: 'John Doe',
    age: 25,
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 30,
  },
  {
    key: '3',
    name: 'Jane Smithh',
    age: 301,
  },  
  {
    key: '4',
    name: 'Jane Smithh',
    age: 0,
  },
  {
    key: '5',
    name: 'Jane Smithh',
    age: -100,
  },
  // Add more data items...
];

const NumberFilterTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [operator, setOperator] = useState('=');

  let searchInput;

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Select
            defaultValue={operator}
            onChange={value => setOperator(value)}
            style={{ width: 120 }}
          >
            <Option value="=">Equal</Option>
            <Option value="<">Less than</Option>
            <Option value="<=">Less than or equal</Option>
            <Option value=">">Greater than</Option>
            <Option value=">=">Greater than or equal</Option>
          </Select>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      const numericValue = parseFloat(value);
      const numericAge = parseFloat(record[dataIndex]);

      switch (operator) {
        case '=':
          return numericAge === numericValue;
        case '<':
          return numericAge < numericValue;
        case '<=':
          return numericAge <= numericValue;
        case '>':
          return numericAge > numericValue;
        case '>=':
          return numericAge >= numericValue;
        default:
          return true;
      }
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <span>
          {text.toString()}
        </span>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      ...getColumnSearchProps('age'),
    },
    // Add more columns...
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  return <Table columns={columns} dataSource={data} />;
};

export default NumberFilterTable;
