import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetailData } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import axios from "axios";

const UserDetails = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location?.state);
  const { errors } = useSelector((state) => state.userReducer);

  const [userDetail, setuserDetail] = useState()
  const [totalspending, settotalspending] = useState()
  const [state, setState] = useState({
    id: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    // stripe_id: "",
    numReviews: "",
    // user_image: "",
    // cover_image: "",
    // interest: "",
    // preferences: [],
  });

  console.log(userDetail, "po")

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("myToken")
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/user-detail/${location?.state}`, config)
      settotalspending(data?.data?.totalSpending)
      setuserDetail(data?.data?.user)
    } catch (error) {
      console.log(error.message)
    }



  }
  useEffect(() => {
    getUserData()
    // dispatch(allAgency());
    // dispatch(userDetailData(location?.state));

  }, []);

  // for errors
  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.map((error) => toast.error(error.message));
    }
  }, [errors]);


  return (
    <>
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-12">
              <h2>User Details</h2>

            </div>
          </div>
        </div>
        <div className="row clearfix">
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
                fontSize: "17px",
              },
            }}
          />
          <div className="col-xl-12 col-lg-8 col-md-7">
            <div className="card">
              <div className="body">
                <div className=" clearfix">
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Name</label>
                      <p>{userDetail?.name}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Email</label>
                      <p>{userDetail?.email}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Address</label>
                      <p>{userDetail?.address}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>City</label>
                      <p>{userDetail?.city}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>State</label>
                      <p>{userDetail?.state}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Allergies</label>
                      <p>{userDetail?.allergies}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Total Amout Spend</label>
                      <p>{totalspending ? `$ ${totalspending}` : "No Spending Yet"}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Image</label>
                      {userDetail?.image ? <>
                        <img style={{ width: "50%", marginLeft: "10px" }} src={process.env.REACT_APP_API_URL + `/${userDetail.image}`} /></> :
                        <><span>No Image Found</span></>}


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDetails;
