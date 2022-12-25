import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "./CsvToTable.scss";
import CsvFileUploader from "./csvFileUploader";
import TableResults from "./DataTable";
import FilesTable from "./filesTable";

const CsvToTable = () => {
  const [tableData, setTableData] = useState([]);
  const [tableStatus, setTableStatus] = useState("");
  const OnReceivedData = (response) => {
    setTableData(response);
  };
  const OnReceiveStatus = (response) => {
    setTableStatus(response);
  };
  return (
    <div className="mainSection-2">
      <Row justify="end">
        <Col>
          <Button
            type="primary"
            size="medium"
            href={`${process.env.PUBLIC_URL}` + "./assets/sampleFile.csv"}
            icon={<DownloadOutlined />}
            download
          >
            Download Sample Csv
          </Button>
        </Col>
      </Row>
      <Row justify="center" className="uploader">
        <Col>
          <CsvFileUploader onTableData={OnReceivedData} />
        </Col>
      </Row>
      {tableData?.length > 0 && (
        <TableResults
          onReceivableData={tableData}
          OnReceiveStatus={OnReceiveStatus}
        />
      )}

      <FilesTable tableStatus={tableStatus} />
    </div>
  );
};

export default CsvToTable;
