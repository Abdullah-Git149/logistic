import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@material-ui/core";
// import {Spinner} from "../UI/Loader";
import AsyncCsv from "./UserCsv";
import { allUsers, blockUser, unblockUser } from "../../actions/adminAction";
import { orderList } from "../../actions/userAction";

const OrderList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userList, blockuser, unBlockUser } = useSelector((state) => state.agencyReducer);
    const { listOfOrders } = useSelector((state) => state.userReducer);

    const [tablebody, setTableBody] = useState([]);
    console.log(listOfOrders)

    useEffect(() => {
        dispatch(orderList());
    }, []);

    const BlockUser = (user_id, e) => {
        e.preventDefault();
        dispatch(blockUser(user_id));

    };

    const UnblockUser = (user_id, e) => {
        e.preventDefault();
        dispatch(unblockUser(user_id));
    };

    useEffect(() => {
        if (blockuser) {
            toast.success(blockuser.message);
        }

    }, [blockuser]);

    // unBlock User
    useEffect(() => {
        if (unBlockUser) {
            toast.success(unBlockUser.message);
        }

    }, [unBlockUser]);

    useEffect(() => {
        if (!listOfOrders) {
            return <></>;
        } else if (listOfOrders) {
            var userDataFiltered = listOfOrders?.map((x) => {

                x.name = (<div>{x?.userId?.name}</div>)
                x.city = (<div>{x?.userId?.city}</div>)
                x.user_device_type = (<div>{x?.userId?.user_device_type}</div>)
                x.status = x?.order_status?.slice(-1)[0]?.status
                console.log("==>", x?.order_status?.slice(-1)[0]?.status)
                //Getting user image
                x.image = x.image ? (
                    <img
                        src={process.env.REACT_APP_API_URL + `/${x.image}`}
                        alt="image"
                        className="someImgClass"
                        width="50px"
                        height="50px"
                    />
                ) : (
                    <img
                        src={"../assets/images/avatar.png"}
                        alt="image"
                        className="someImgClass"
                        width="50px"
                        height="50px"
                    />
                );


                let jsx = (
                    <>
                        {/* <Link to={`user-details/${x._id}`}> */}
                        {/* <button
                            type="button"
                            className="btn btn-sm btn-default"
                            title="View Details"
                            data-for="send"
                            data-tip="true"
                            currentitem="false"
                            onClick={() => navigate("/user-details", { state: x?._id })}
                        >
                            <i className="icon-eye"></i>
                        </button> */}

                        <button
                            onClick={() => navigate("/order-status", { state: x?._id })}
                            className="btn btn-sm mr-1 ml-1"
                            title=""
                            style={{ backgroundColor: "#952B23", color: "white" }}
                        >
                            Update Status
                        </button>

                    </>
                );

                x.action = jsx;
                return x;
            });

            setTableBody({

                columns: [
                    {
                        label: "Order Number",
                        field: "order_number",
                        width: 50,
                    },
                    {
                        label: "Order Status",
                        field: "status",
                        width: 50,
                    },
           
                    // {
                    //     label: "Order Status",
                    //     field: "order_status",
                    //     width: 50,
                    // },
                    {
                        label: "Customer Name",
                        field: "name",
                        width: 50,
                    },
                    {
                        label: "City",
                        field: "city",
                        width: 50,
                    },
                    // {
                    //   label: "Gender",
                    //   field: "user_gender",
                    //   width: 50,
                    // },
                    {
                        label: "Device Type",
                        field: "user_device_type",
                        width: 50,
                    },
                    {
                        label: "Action",
                        field: "action",
                        width: 50,
                    },
                ],

                rows: userDataFiltered ? userDataFiltered : [],
            });
        }
    }, [listOfOrders]);
    return (
        <>
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="header" style={{ marginTop: 20 }}>
                            <h4>Order List </h4>
                            {/* <Link
                to="/branch-add"
                className="btn btn-sm btn-primary mr-1"
                title=""
              >
                Add New Branch
              </Link> */}
                            {/* <div>
                                <AsyncCsv />
                            </div> */}

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
                                {listOfOrders?.length < 1 ? (
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
export default OrderList;
