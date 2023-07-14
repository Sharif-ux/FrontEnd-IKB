import React from 'react';
import { Select, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const getFilterDataInput = (dataIndex, handleSearch, handleReset) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
    const handleInputChange = (e) => {
      setSelectedKeys([selectedKeys[0], e.target.value]);
    };

    const handleOperatorChange = (value) => {
      setSelectedKeys([value, selectedKeys[1]]);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    return (
      <div style={{ padding: 8 }}>
        <Select
          style={{ width: 120, marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          onChange={handleOperatorChange}
        >
          <Option value="less">Less</Option>
          <Option value="equal">Equal</Option>
          <Option value="greater">Greater</Option>
        </Select>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[1]}
          onChange={handleInputChange}
          onPressEnter={handleSearch}
          onKeyPress={handleKeyPress}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <button onClick={handleSearch} style={{ width: 90 }}>
            Search
          </button>
          <button onClick={handleReset} style={{ width: 90 }}>
            Reset
          </button>
        </Space>
      </div>
    );
  },
  filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record) => {
    const [operator, filterValue] = value;
    const dataIndexValue = record[dataIndex];

    console.log(dataIndexValue, typeof dataIndexValue); // Check the data type

    if (typeof dataIndexValue === 'number' && !isNaN(dataIndexValue) && !isNaN(filterValue)) {
      const filterNumValue = parseFloat(filterValue); // or parseInt(filterValue)

      if (operator === 'less') {
        return dataIndexValue < filterNumValue;
      } else if (operator === 'equal') {
        return dataIndexValue === filterNumValue;
      } else if (operator === 'greater') {
        return dataIndexValue > filterNumValue;
      }
    }

    return false;
  },
});

export default getFilterDataInput;
