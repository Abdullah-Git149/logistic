import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";


const headers = [
  { label: "User Name", key: "user_name", width: { wpx: 300 } },
  { label: "User Email", key: "user_email", width: { wpx: 300 } },
  { label: "User Phone Number", key: "user_phone" },
  { label: "User Type", key: "user_type" },
  { label: "No of reviews", key: "numReviews" },
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
    return fetch(
      process.env.REACT_APP_API_URL + `/admin/user/${this.props.id}`
    ).then((res) => res.json());
  };

  downloadReport = async () => {
    let newdata = [];
    const userdata = await this.getUserList();
    console.log(userdata);
    const data = userdata.data.user;
    newdata.push({
      user_name: data.user_name,
      user_email: data.user_email,
      user_phone: data.user_phone,
      user_type: data.user_type,
      numReviews: data.numReviews,
    });

    console.log("newdata", data);
    this.setState({ data: newdata }, () => {
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
          filename="UserDetails.csv"
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}

function mapStateToProps(rec) {
  return {
    users: rec.userReducer.users,
  };
}

// export default AsyncCSV;
export default connect(mapStateToProps, null)(AsyncCSV);
