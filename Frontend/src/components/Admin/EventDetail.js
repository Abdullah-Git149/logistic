import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { eventDetailData, updateEvent } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import moment from "moment";
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';


const EventDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { eventDetail } = useSelector((state) => state.userReducer);

    const [edit, setEdit] = useState(false)

    console.log(eventDetail, "detail paras");

    const [eventName, setEventName] = useState()
    const [eventDescription, setEventDescription] = useState()
    const [eventDate, setEventDate] = useState()
    const [eventStart, setEventStart] = useState()
    const [eventEnd, setEventEnd] = useState()
    const [eventAddress, setEventAddress] = useState()
    const [eventPhone, setEventPhone] = useState()

    const [value, setValue] = useState(null);

    if (value) {
        geocodeByPlaceId(value?.value?.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {

            }
            )
            .catch(error => console.error(error));
    }

    useEffect(() => {
        dispatch(eventDetailData(location?.state));
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
    const saveEvent = async (e) => {
        e.preventDefault()
        await dispatch(updateEvent({
            eventName: eventName ? eventName : eventDetail?.eventName,
            eventDescription: eventDescription ? eventDescription : eventDetail?.eventDescription,
            eventAddress: value?.label ? value?.label : eventDetail?.eventAddress,
            eventPhone: eventPhone ? eventPhone : eventDetail?.eventPhone,
            eventDate: eventDate ? eventDate : eventDetail?.eventDate,
            eventStart: eventStart ? eventStart : eventDetail?.eventStart,
            eventEnd: eventEnd ? eventEnd : eventDetail?.eventEnd,
            eventId: location?.state
        })).then(() => {

            dispatch(eventDetailData(location?.state));
            setEdit(false)
        }).catch((e) => {
            console.log(e)
        })
        // dispatch(eventDetailData(location?.state));
        // console.log(event)


    }
    return (
        <>
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-md-6 col-sm-12">
                            <h2>Event Details</h2>
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



                                        <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
                                            <label style={{ color: "#952B23", margin: "10px", width: "50%" }}>Event Name</label>

                                            <input type="text" className="form-control" name="eventName" value={edit ? eventName : eventDetail.eventName} disabled={edit ? false : true} onChange={(e) => setEventName(e.target.value)} style={{ width: "70%" }} />
                                        </div>


                                        <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
                                            <label style={{ color: "#952B23", margin: "10px", width: "50%" }}>Event Detail</label>
                                            <textarea rows="10" cols="50" className="form-control" name="description" value={edit ? eventDescription : eventDetail.eventDescription} disabled={edit ? false : true} onChange={(e) => setEventDescription(e.target.value)} style={{ width: "70%" }}>
                                            </textarea>
                                        </div>


                                        <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
                                            <label style={{ color: "#952B23", margin: "10px", width: "50%" }}>Event Date</label>
                                            {
                                                edit ? <input type="date" className="form-control" name="eventDate" value={edit ? eventDate : eventDetail.eventDate} onChange={(e) => setEventDate(e.target.value)} style={{ width: "70%" }} /> :
                                                    <input type="text" className="form-control" name="eventDate" value={eventDetail.eventDate} disabled onChange={(e) => setEventDate(e.target.value)} style={{ width: "70%" }} />
                                            }

                                        </div>
                                        <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
                                            <label style={{ color: "#952B23", margin: "10px", width: "50%" }}>Event Address</label>
                                            {
                                                edit ? <>
                                                    <div style={{ width: "70%" }}>
                                                        <GooglePlacesAutocomplete

                                                            apiKey={process.env.REACT_GOOGLE_MAPS_API_KEY}
                                                            selectProps={{
                                                                value,
                                                                onChange: setValue,
                                                            }}
                                                        />
                                                    </div></> :
                                                    <> <input type="text" className="form-control" name="eventAddress" value={edit ? eventAddress : eventDetail.eventAddress} disabled={edit ? false : true} onChange={(e) => setEventAddress(e.target.value)} style={{ width: "70%" }} />
                                                    </>
                                            }
                                        </div>


                                        <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
                                            <label style={{ color: "#952B23", margin: "10px", width: "50%" }}>Event Phone</label>
                                            <input type="text" className="form-control" name="eventPhone" value={edit ? eventPhone : eventDetail.eventPhone} disabled={edit ? false : true} onChange={(e) => setEventPhone(e.target.value)} style={{ width: "70%" }} />
                                        </div>


                                        <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
                                            <label style={{ color: "#952B23", margin: "10px", width: "50%" }}>Event Start</label>
                                            <input type="time" className="form-control" name="eventStart" value={edit ? eventStart : eventDetail.eventStart} disabled={edit ? false : true} onChange={(e) => setEventStart(e.target.value)} style={{ width: "70%" }} />
                                        </div>


                                        <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around" }}>
                                            <label style={{ color: "#952B23", margin: "10px", width: "50%" }}>Event End</label>
                                            <input type="time" className="form-control" name="eventEnd" value={edit ? eventEnd : eventDetail.eventEnd} disabled={edit ? false : true} onChange={(e) => setEventEnd(e.target.value)} style={{ width: "70%" }} />
                                        </div>


                                        {edit ? <input type="submit" value="Save" style={{ backgroundColor: "#952B23", padding: "10px 15px", border: "none", color: "white", borderRadius: "9px" }} /> : <button style={{ backgroundColor: "#952B23", padding: "10px 15px", marginLeft: 10, border: "none", color: "white", borderRadius: "9px" }} onClick={(e) => editDetail(e)}> Edit </button>}
                                        <div className="form-group" style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-around", marginLeft: 10, }}>

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
export default EventDetail;
