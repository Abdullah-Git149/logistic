import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { onsiteDetailData, updateEvent } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";

const OnsiteDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { packageDetail } = useSelector((state) => state.userReducer);

    const [edit, setEdit] = useState(false)
    console.log("hellowoeld", packageDetail)
    console.log("ID", location?.state)

    const [eventName, setEventName] = useState()
    const [eventDescription, setEventDescription] = useState()
    const [eventDate, setEventDate] = useState()
    const [eventStart, setEventStart] = useState()
    const [eventEnd, setEventEnd] = useState()
    const [eventAddress, setEventAddress] = useState()
    const [eventPhone, setEventPhone] = useState()

    useEffect(() => {
        dispatch(onsiteDetailData(location?.state));
    }, []);

    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);



    const editDetail = (e) => {
        e.preventDefault()
        setEdit(true)
    }
    const saveEvent = (e) => {
        e.preventDefault()
        // dispatch(updateEvent({
        //     eventName: eventName ? eventName : eventDetail?.eventName,
        //     eventDescription: eventDescription ? eventDescription : eventDetail?.eventDescription,
        //     eventAddress: eventAddress ? eventAddress : eventDetail?.eventAddress,
        //     eventPhone: eventPhone ? eventPhone : eventDetail?.eventPhone,
        //     eventDate: eventDate ? eventDate : eventDetail?.eventDate,
        //     eventStart: eventStart ? eventStart : eventDetail?.eventStart,
        //     eventEnd: eventEnd ? eventEnd : eventDetail?.eventEnd,
        //     eventId: location?.state
        // }));
        // dispatch(eventDetailData(location?.state));
        setEdit(false)
        // dispatch(eventDetailData(location?.state));
        // console.log(event)


    }
    return (
        <>
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-md-6 col-sm-12">
                            <h2>Onsite Details</h2>
                            <div>
                                {/* <AsyncCsv id={state.id} /> */}
                            </div>
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
                                <div className="row clearfix">
                                    <form onSubmit={(e) => saveEvent(e)}>


                                        <div className="col-lg-12 col-md-12">

                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Package Name</label>
                                                <span>{packageDetail?.name}</span>
                                                {/* <input type="text" className="form-control" name="eventName" value={edit ? eventName : eventDetail.eventName} disabled={edit ? false : true} onChange={(e) => setEventName(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Package Price</label>
                                                <span>{packageDetail?.price}</span>
                                                {/* <input type="text" className="form-control" name="eventName" value={edit ? eventName : eventDetail.eventName} disabled={edit ? false : true} onChange={(e) => setEventName(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Package Detail</label>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <ul>
                                                    {
                                                        packageDetail?.subCategory?.map((data, index) => (
                                                            <>
                                                                <li>{data.name}</li>
                                                                <li>{data.person}</li>
                                                                <li>{data.dishes}</li>
                                                            </>
                                                        ))
                                                    }
                                                </ul>
                                                {/* <span>{packageDetail?.price}</span> */}
                                                {/* <input type="text" className="form-control" name="eventName" value={edit ? eventName : eventDetail.eventName} disabled={edit ? false : true} onChange={(e) => setEventName(e.target.value)} style={{ width: "50%" }} /> */}
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
export default OnsiteDetail;
