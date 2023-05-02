import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
// import configureStore from "../../store";
// import ReactExport from 'react-data-export';
// let store = configureStore();

const headers = [
  { label: "User Name", key: "user_name", width: { wpx: 300 } },
  { label: "User Email", key: "user_email", width: { wpx: 300 } },
  { label: "User Phone Number", key: "user_phone" },
  { label: "User Type", key: "user_type" },
  { label: "User Device Type", key: "user_device_type" },
];

class AsyncCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.csvLinkEl = React.createRef();
  }

  getUserList = async () => {
    return fetch(process.env.REACT_APP_API_URL + "/admin/sellers").then((res) =>
      res.json()
    );
  };

  downloadReport = async () => {
    const userdata = await this.getUserList();
    const data = userdata.data.sellers;
    // console.log("newdata",userdata)
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <input
          className="btn mt-2"
          type="button"
          value="Export List"
          onClick={this.downloadReport}
          style={{
            borderRadius: "10px",
            fontSize: "15px",
            outline: "none",
            backgroundColor: "#FF7F00",
            color: "white",
          }}
        />
        <CSVLink
          headers={headers}
          filename="SellersList.csv"
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}

function mapStateToProps(rec) {
  // console.log("alalalala:", rec.userReducer.users);
  return {
    users: rec.userReducer.users,
  };
}

// export default AsyncCSV;
export default connect(mapStateToProps, null)(AsyncCSV);
