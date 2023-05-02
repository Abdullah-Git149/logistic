import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@material-ui/core";
// import {Spinner} from "../UI/Loader";
import AsyncCsv from "./UserCsv";
import { onsiteListData } from "../../actions/userAction";
import { Button } from "@material-ui/core";
import axios from "axios";

const OnsiteList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userList, blockuser, unBlockUser } = useSelector((state) => state.agencyReducer);
    const { onsiteList } = useSelector((state) => state?.userReducer);

    const [tablebody, setTableBody] = useState([]);


    useEffect(() => {
        dispatch(onsiteListData());
    }, []);

    const deleteOnSite = async (id, e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("myToken")
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/delete-onsite/${id}`, config);
            toast.success(data?.data?.message)
            dispatch(onsiteListData());

        } catch (error) {
            console.log(error.response)
        }


    };


    useEffect(() => {
        if (!onsiteList) {

        } else if (onsiteList) {
            const userDataFiltered = onsiteList?.map((x) => {

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
                        <button
                            type="button"
                            className="btn btn-sm btn-default"
                            title="View Details"
                            data-for="send"
                            data-tip="true"
                            currentitem="false"
                            onClick={() => navigate("/onsite-detail", { state: x?._id })}
                        >
                            <i className="icon-eye"></i>
                            {/* <i className="icon-eye"></i> */}
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-default"
                            title="View Details"
                            data-for="send"
                            data-tip="true"
                            currentitem="false"
                            onClick={(e) => deleteOnSite(x._id, e)}
                        >
                            <i className="icon-trash"></i>
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
                        label: "Name",
                        field: "name",
                        width: 50,
                    },
                    {
                        label: "Price",
                        field: "price",
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
    }, [onsiteList]);

    return (
        <>
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="header" style={{ marginTop: 20 }}>
                            <h4>Onsite List </h4>
                            {/* <Link
                to="/branch-add"
                className="btn btn-sm btn-primary mr-1"
                title=""
              >
                Add New Branch
              </Link> */}
                            <div>
                                {/* <AsyncCsv /> */}
                                <Link to="/add-onsite"><Button variant="contained">Add Package</Button></Link>
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
                                {onsiteList?.length < 1 ? (
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
export default OnsiteList;
