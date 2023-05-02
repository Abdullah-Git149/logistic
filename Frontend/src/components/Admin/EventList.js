import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@material-ui/core";
// import {Spinner} from "../UI/Loader";
import AsyncCsv from "./UserCsv";
import { allUsers, blockUser, unblockUser } from "../../actions/adminAction";
import { eventListData } from "../../actions/userAction";
import { Button } from "@material-ui/core";
import moment from "moment";

const EventList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userList, blockuser, unBlockUser } = useSelector((state) => state.agencyReducer);
    const { eventList } = useSelector((state) => state?.userReducer);

    const [tablebody, setTableBody] = useState([]);
    console.log(eventList, "reduceer");

    useEffect(() => {
        dispatch(eventListData());
    }, []);


    useEffect(() => {
        if (!eventList) {
            return <></>;
        } else if (eventList) {
            const userDataFiltered = eventList?.map((x) => {
                x.eventName = x?.eventName?.substring(0, 30) + "....."
        
                let jsx = (
                    <>
                        {/* <Link to={`user-details/${x._id}`}> */}
                        <button
                            type="button"
                            className="btn btn-sm btn-default"
                            title="View Details"
                            data-for="send"
                            data-tip="true"
                            currentitem="false"
                            onClick={() => navigate("/event-detail", { state: x?._id })}
                        >
                            <i className="icon-eye"></i>
                            {/* <i className="icon-eye"></i> */}
                        </button>




                    </>
                );

                x.action = jsx;
                return x;
            });

            setTableBody({
                columns: [
                    //   {
                    //     label: "Image",
                    //     field: "image",
                    //     sort: "asc",
                    //     width: 50,
                    //   },
                    {
                        label: "Event Name",
                        field: "eventName",
                        width: 50,
                    },
                    {
                        label: "Location",
                        field: "eventAddress",
                        width: 50,
                    },
                    {
                        label: "Date",
                        field: "eventDate",
                        width: 50,
                    },
                    {
                        label: "Start Time",
                        field: "eventStart",
                        width: 50,
                    },
                    {
                        label: "End Time",
                        field: "eventEnd",
                        width: 50,
                    },
                    // {
                    //   label: "Gender",
                    //   field: "user_gender",
                    //   width: 50,
                    // },
                    // {
                    //     label: "Device Type",
                    //     field: "user_device_type",
                    //     width: 50,
                    // },
                    {
                        label: "Action",
                        field: "action",
                        width: 50,
                    },
                ],

                rows: userDataFiltered ? userDataFiltered : [],
            });
        }
    }, [eventList]);
    console.log(tablebody)
    return (
        <>
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="header" style={{ marginTop: 20 }}>
                            <h4>Event List </h4>
                            {/* <Link
                to="/branch-add"
                className="btn btn-sm btn-primary mr-1"
                title=""
              >
                Add New Branch
              </Link> */}
                            <div>
                                {/* <AsyncCsv /> */}
                                <Link to="/add-event"><Button variant="contained">Add Event</Button></Link>
                            </div>

                            <Toaster
                                position="top-center"
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
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                {eventList?.length < 0 ? (
                                    <CircularProgress
                                        className="progress"
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "#952B23",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex",
                                        }}
                                    />
                                ) : (
                                    <MDBDataTableV5
                                        noBottomColumns
                                        className="table table-hover js-basic-example dataTable table-custom spacing5"
                                        entriesOptions={[5, 10, 20, 25]}
                                        entries={5}
                                        paging
                                        pagesAmount={15}
                                        data={tablebody}

                                    // searchTop
                                    // sortRows={['user_name']}
                                    //searchBottom={true}
                                    // onPageChange={()=>{ activePage: 2, pagesAmount: 5 }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EventList;
