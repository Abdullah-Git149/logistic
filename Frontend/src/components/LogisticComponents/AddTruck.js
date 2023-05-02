import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { saveTruckAction } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const AddTruck = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const [truckNumber, settruckNumber] = useState()
    const [chassisNumber, setchassisNumber] = useState()
    const [truckOwner, settruckOwner] = useState()
    const [frameNumber, setframeNumber] = useState()
    const [wheels, setwheels] = useState()


    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);


    const saveNews = async (e) => {
        e.preventDefault()

        const data = { truckNumber, truckOwner, wheels, chassisNumber, frameNumber }
        await dispatch(saveTruckAction(data)).then(() => {
            navigate("/truck-list")

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
                            <h2>Add Truck</h2>
                            <div>
                                {/* <AsyncCsv id={state.id} /> */}
                            </div>
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
                                                <label style={{ color: "#952B23", margin: "10px" }}>Truck Number</label>
                                                <input type="text" className="form-control" required name="menuName" value={truckNumber} onChange={(e) => settruckNumber(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Chassis Number</label>
                                                <input type="text" className="form-control" required name="menuName" value={chassisNumber} onChange={(e) => setchassisNumber(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Truck Owner</label>

                                                <input type="text" className="form-control" required name="menuName" value={truckOwner} onChange={(e) => settruckOwner(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Frame Number</label>

                                                <input type="text" className="form-control" required name="menuName" value={frameNumber} onChange={(e) => setframeNumber(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Wheels</label>

                                                <input type="number" className="form-control" required name="menuName" value={wheels} onChange={(e) => setwheels(e.target.value)} style={{ width: "50%" }} />
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
export default AddTruck;
