import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { saveDriverAction } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const AddDriver = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const [name, setname] = useState()
    const [phone, setphone] = useState()
    const [cnic, setcnic] = useState()
    const [license, setlicense] = useState()
 

    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);


    const saveNews = async (e) => {
        e.preventDefault()

        const data = { name , phone , cnic , license }
        await dispatch(saveDriverAction(data)).then(() => {
            navigate("/driver-list")

        }).catch((e) => {
            console.log(e)
        })



    }
    return (
        <>
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-md-6 col-sm-12">
                            <h2>Add Driver</h2>
                     
                        </div>
                    </div>
                </div>
                <div className="row clearfix">

                    <div className="col-xl-12 col-lg-8 col-md-7">
                        <div className="card">
                            <div className="body">
                                <div className="row clearfix">
                                    <form onSubmit={(e) => saveNews(e)}>


                                        <div className="col-lg-12 col-md-12">

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Driver Name</label>
                                                <input type="text" className="form-control" required name="menuName" value={name} onChange={(e) => setname(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Driver Phone</label>
                                                <input type="number" className="form-control" required name="menuName" value={phone} onChange={(e) => setphone(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Driver CNIC</label>

                                                <input type="text" className="form-control" required name="menuName" value={cnic} onChange={(e) => setcnic(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Driver License</label>

                                                <input type="text" className="form-control" required name="menuName" value={license} onChange={(e) => setlicense(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                      


                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <input type="submit" value="Save" style={{ backgroundColor: "#952B23", padding: "10px 15px", border: "none", color: "white", borderRadius: "9px" }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddDriver;
