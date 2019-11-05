import React from "react";
import AppContext from "../AppContext";
import { Table } from "antd";

// Create an interface to show the reporting statistics for messages sent.
// Messages summary showing messages sent by status over time
// Status

const columns = [
  {
    title: "Time sent",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from"
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to"
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  }
];

function Report() {
  const color = React.useContext(AppContext);
  const reverseData = color.state.msg.reverse();
  return (
    <div>
      <h2>Report</h2>
      <Table dataSource={reverseData} columns={columns} />
    </div>
  );
}

export default Report;
