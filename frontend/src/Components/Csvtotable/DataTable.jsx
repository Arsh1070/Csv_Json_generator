import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import apiClient from "../../util/apiClient";

const API_CONFIG = {
  POST_FORM_DATA: {
    method: "post",
    url: "/secondPage/",
    data: {},
  },
};

const TableResults = ({ onReceivableData, OnReceiveStatus }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableData, setTableData] = useState(onReceivableData);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1890ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const onInputChange = (key, index) => (e) => {
    const newData = [...tableData];
    newData[index][key] = e.target.value;
    setTableData(newData);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      ...getColumnSearchProps("Id"),
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("Id", index)} />
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      ...getColumnSearchProps("Name"),
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("Name", index)} />
      ),
    },
    {
      title: "Mobile",
      dataIndex: "Mobile",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("Mobile", index)} />
      ),
    },
    {
      title: "Country",
      dataIndex: "Country",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("Country", index)} />
      ),
    },
    {
      title: "Address",
      dataIndex: "Address",
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("Address", index)} />
      ),
    },
  ];

  const onConfirm = () => {
    const body = tableData;
    let apiPayload = { ...API_CONFIG.POST_FORM_DATA };
    apiPayload.data = body;
    apiClient(apiPayload)
      .then((result) => {
        message.success(result?.data?.status);
        OnReceiveStatus(result?.data?.status);
      })
      .catch((err) => {
        message.error("Some error occurred !");
      });
  };

  return (
    <div className="result-table">
      <Row justify="center">
        <Col>
          <h1>Uploaded File Table</h1>
        </Col>
      </Row>
      <Row justify="end" className="saveTable">
        <Col>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="medium"
            onClick={onConfirm}
          >
            Save Table
          </Button>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={24}>
          <Table
            bordered
            dataSource={tableData}
            columns={columns}
            scroll={{ y: 600 }}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
};
export default TableResults;
