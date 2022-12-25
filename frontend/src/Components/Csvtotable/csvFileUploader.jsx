import { Col, Row, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { Dragger } = Upload;

const CsvFileUploader = ({ onTableData }) => {
  const [state, setState] = useState({ loading: false });

  const normFile = (e) => {
    return e.file;
  };
  const uploadProps = {
    name: "upload",
    multiple: false,

    onDrop(e) {
      console.log({ e });
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv";
      if (!isCSV) {
        console.error("You can only upload CSV file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        console.error("File must smaller than 2MB!");
      }
      return isCSV && isLt2M;
    },
    accept: ".csv",
    maxCount: 1,
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    onTableData(newArray);
  };

  const handleChange = (info) => {
    const { status } = info.file;

    if (status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (status === "done") {
      setState({ loading: false });
      if (!info.fileList[0]) {
        return;
      }
      const file = info.fileList[0];

      const reader = new FileReader();
      reader.onload = (evt) => {
        if (!evt?.target?.result) {
          return;
        }
        const { result } = evt.target;
        processCSV(result);
      };
      reader.readAsText(file?.originFileObj);

      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Dragger
      {...uploadProps}
      listType="picture"
      customRequest={dummyRequest}
      onChange={handleChange}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};

export default CsvFileUploader;
