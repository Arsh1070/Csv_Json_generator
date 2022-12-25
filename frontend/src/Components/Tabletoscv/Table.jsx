import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import apiClient from "../../util/apiClient";

const API_CONFIG = {
  GET_TABLE_DATA: {
    method: "get",
    url: "/firstPage/",
    data: {},
  },
  PUT_FORM_DATA: {
    method: "put",
    url: "/firstPage/",
    data: {},
  },
  DELETE_FORM_DATA: {
    method: "delete",
    url: "/firstPage/",
    data: {},
  },
};

const TableResults = ({ tableDataStatus }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableData, setTableData] = useState([]);
  const [rowStatus, setRowStatus] = useState("");
  const searchInput = useRef(null);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record._id === editingKey;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      dataIndex === "dob" ? <DatePicker format={"DD-MM-YYYY"} /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const onEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      country: record.country,
      address: record.address,
      dob: moment(record.dob, "DD-MM-YYYY"),

      //dob: moment(record.dob, "DD-MM-YYYY"),
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const onSave = async (recordId) => {
    try {
      const row = await form.validateFields();
      const body = {
        _id: recordId,
        name: row.name,
        email: row.email,
        dob: row.dob,
        country: row.country,
        address: row.address,
      };
      let apiPayload = { ...API_CONFIG.PUT_FORM_DATA };
      apiPayload.data = body;
      apiClient(apiPayload)
        .then((result) => {
          message.success(result?.data?.status);
          setRowStatus(result?.data?.status);
        })
        .catch((err) => {
          message.error("Some error occurred !");
        });

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = (recordId) => {
    try {
      const body = {
        _id: recordId,
      };
      let apiPayload = { ...API_CONFIG.DELETE_FORM_DATA };
      apiPayload.data = body;
      apiClient(apiPayload)
        .then((result) => {
          message.success(result?.data?.status);
          setRowStatus(result?.data?.status);
        })
        .catch((err) => {
          message.error("Some error occurred !");
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      editable: true,
      render: (item) => {
        return <p>{new Date(item).toLocaleDateString() || ""}</p>;
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => onSave(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => onEdit(record)}
            >
              Edit
            </Typography.Link>
            {<span style={{ paddingLeft: "15px" }}></span>}
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record._id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "dob" ? "date" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const exportToCsv = (e) => {
    e.preventDefault();

    // Headers for each column
    let headers = ["Name, Email, DOB, Country, Address"];

    // Convert users data to a csv
    let usersCsv = tableData.reduce((acc, user) => {
      const { name, email, dob, country, address } = user;
      acc.push([name, email, dob, country, address].join(","));
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...usersCsv].join("\n"),
      fileName: "tableSummary.csv",
      fileType: "text/csv",
    });
  };

  const apiCall = () => {
    const apiPayload = { ...API_CONFIG.GET_TABLE_DATA };
    // setLoading(true);
    apiClient(apiPayload)
      .then((result) => {
        setTableData(result?.data?.results);
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        message.error(err);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);
  useEffect(() => {
    if (tableDataStatus || rowStatus) {
      apiCall();
    }
  }, [tableDataStatus, rowStatus]);

  return (
    <div className="result-table">
      <Row justify="center" gutter={[32, 32]}>
        <h1>Table Results</h1>
        <Col span={22}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={tableData}
              columns={mergedColumns}
              scroll={{ y: 600 }}
              pagination={false}
              /*  rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }} */
            />
          </Form>
        </Col>
      </Row>
      <div className="csvDownload">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="medium"
          onClick={exportToCsv}
        >
          Download .csv
        </Button>
      </div>
    </div>
  );
};
export default TableResults;
