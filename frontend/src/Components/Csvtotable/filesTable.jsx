import { Col, Row, Table, Typography, message } from "antd";
import React, { useState } from "react";
import apiClient from "../../util/apiClient";

const API_CONFIG = {
  GET_TABLE_DATA: {
    method: "get",
    url: "/secondPage/",
    data: {},
  },
};

const FilesTable = ({ tableStatus }) => {
  const [tableData, setTableData] = useState([]);

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
  const exportToJson = (record) => {
    let fileData = record?.csvData;
    let fileName = record?.fileName;

    downloadFile({
      data: JSON.stringify(fileData),
      fileName: fileName,
      fileType: "text/json",
    });
  };

  const columns = [
    {
      title: "Sr No.",
      render: (text, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "FileName",
      dataIndex: "fileName",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (item) => {
        return <p>{new Date(item).toLocaleString() || ""}</p>;
      },
    },
    {
      title: "TotalCount",
      dataIndex: "totalCount",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => exportToJson(record)}>
            Download
          </Typography.Link>
        );
      },
    },
  ];

  const apiCall = () => {
    let apiPayload = { ...API_CONFIG.GET_TABLE_DATA };

    apiClient(apiPayload)
      .then((result) => {
        console.log(result);
        setTableData(result?.data?.results);
      })
      .catch((err) => {
        message.error("Some error occurred !");
      });
  };

  useState(() => {
    if (tableStatus) {
      apiCall();
    }
  }, [tableStatus]);

  useState(() => {
    apiCall();
  }, []);

  return (
    <div className="result-table">
      <Row justify="center">
        <Col>
          <h1>JSON Files Table</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            bordered
            dataSource={tableData || []}
            columns={columns}
            scroll={{ y: 600 }}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FilesTable;
