import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetailData } from "../../actions/userAction";
 
import axios from "axios";

const   PumpDetail = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();


  console.log(location?.state,"====");
  const { errors } = useSelector((state) => state.userReducer);

  const [pumpDetail, setPumpDetail] = useState(null)
  

 

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("myToken")
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/pump-detail/${location?.state}`, config)
      
      setPumpDetail(data?.data?.data)
    } catch (error) {
      console.log(error.message)
    }



  }
  useEffect(() => {
    getUserData()
    
    // dispatch(pumpDetailData(location?.state));

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
                      <p>{pumpDetail?.name}</p>
                    </div>
     
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Address</label>
                      <p>{pumpDetail?.address}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Owner name</label>
                      <p>{pumpDetail?.ownerName}</p>
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ color: "#952B23", marginRight: "10px" }}>Phone Number</label>
                      <p>{pumpDetail?.phoneNumber}</p>
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
export default PumpDetail;
