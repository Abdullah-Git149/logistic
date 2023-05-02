import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
// import configureStore from "../../store";
// import ReactExport from 'react-data-export';
// let store = configureStore();

const headers = [
  { label: "User Name", key: "name", width: { wpx: 300 } },
  { label: "User Email", key: "email", width: { wpx: 300 } },
  { label: "User Phone Number", key: "phone" },
  { label: "User Device Type", key: "user_device_type" },
  { label: "User Address", key: "address" },
  { label: "User City", key: "city" },
  { label: "User State", key: "state" },
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
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    return fetch(process.env.REACT_APP_API_URL + `/api/admin/user-list`, config).then(
      (res) => res.json()
    );
  };

  downloadReport = async () => {

    const userdata = await this.getUserList();

    console.log(userdata?.users, "hello")
    const data = userdata?.users;
    // console.log("newdata",userdata)
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  };

  render() {
    const { data } = this.state;
    console.log("data=>", data)
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
          filename="CustomersList.csv"
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
