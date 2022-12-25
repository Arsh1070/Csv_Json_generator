import React, { useState } from "react";
import MyForm from "./form";
import "./Tabletocsv.scss";
import TableResults from "./Table";

const TableToCSV = () => {
  const [tableDataStatus, setTableDataStatus] = useState("");

  const OnReceivedData = (response) => {
    setTableDataStatus(response);
  };
  return (
    <div className="mainSection">
      <MyForm OnReceivedData={OnReceivedData} />
      <TableResults tableDataStatus={tableDataStatus} />
    </div>
  );
};

export default TableToCSV;
