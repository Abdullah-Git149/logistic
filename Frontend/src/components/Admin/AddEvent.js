import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { uploadEvent } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import { useNavigate } from "react-router-dom";

const AddEvent = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { menuDetail } = useSelector((state) => state.userReducer)
    const [eventName, seteventName] = useState()
    const [eventDescription, seteventDescription] = useState()
    const [eventDate, seteventDate] = useState()
    const [eventStart, seteventStart] = useState()
    const [eventEnd, seteventEnd] = useState()
    const [eventPhone, seteventPhone] = useState()
    const [eventAddress, seteventAddress] = useState()

    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);

    const saveEvent = async (e) => {
        e.preventDefault()
        await dispatch(uploadEvent({
            eventName,
            eventDescription,
            eventDate,
            eventStart,
            eventEnd,
            eventAddress,
            eventPhone


        })).then(() => {
            navigate("/event-list")

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
                            <h2>Add Event</h2>
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
                                    <form onSubmit={(e) => saveEvent(e)}>


                                        <div className="col-lg-12 col-md-12">

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Name</label>

                                                <input type="text" className="form-control" required name="menuName" value={eventName} onChange={(e) => seteventName(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Description</label>
                                                <input type="text" className="form-control" required name="menuName" value={eventDescription} onChange={(e) => seteventDescription(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Date</label>
                                                <input type="date" min={new Date().toISOString().split('T')[0]} className="form-control" required name="menuName" value={eventDate} onChange={(e) => seteventDate(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Start Time</label>
                                                <input type="time" className="form-control" required name="menuName" value={eventStart} onChange={(e) => seteventStart(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event End Time</label>
                                                <input type="time" className="form-control" required name="menuName" value={eventEnd} onChange={(e) => seteventEnd(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Address</label>
                                                <input type="text" className="form-control" required name="menuName" value={eventAddress} onChange={(e) => seteventAddress(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Phone</label>
                                                <input type="number" className="form-control" required name="menuName" value={eventPhone} onChange={(e) => seteventPhone(e.target.value)} style={{ width: "50%" }} />
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
export default AddEvent;
