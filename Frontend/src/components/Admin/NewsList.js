import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@material-ui/core";
// import {Spinner} from "../UI/Loader";
import AsyncCsv from "./UserCsv";
import { allUsers, blockUser, unblockUser } from "../../actions/adminAction";
import { newsListData } from "../../actions/userAction";
import { Button } from "@material-ui/core";
import moment from "moment"
const NewsList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { userList, blockuser, unBlockUser } = useSelector((state) => state.agencyReducer);
    const { newsList } = useSelector((state) => state?.userReducer);

    const [tablebody, setTableBody] = useState([]);
    console.log(newsList, "reduceer");

    useEffect(() => {
        dispatch(newsListData());
    }, []);



    useEffect(() => {
        if (!newsList) {

        } else if (newsList) {
            const userDataFiltered = newsList?.map((x) => {

                //Getting user image
                x.description = x?.newsDescription?.substring(0, 20) + "....."
                x.newsDate = moment(x?.newsDate).format("MMMM Do YYYY")
            

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
                            onClick={() => navigate("/news-detail", { state: x?._id })}
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
                        label: "News Title",
                        field: "newsTitle",
                        width: 50,
                    },
                    {
                        label: "Description",
                        field: "description",
                        width: 50,
                    },
                    {
                        label: "Date",
                        field: "newsDate",
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
    }, [newsList]);
    console.log(tablebody)
    return (
        <>
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="header" style={{ marginTop: 20 }}>
                            <h4>News List </h4>
                            {/* <Link
                to="/branch-add"
                className="btn btn-sm btn-primary mr-1"
                title=""
              >
                Add New Branch
              </Link> */}
                            <div>
                                <Link to="/add-news"><Button variant="contained">Add News</Button></Link>
                            </div>


                        </div>
                        <div className="body">
                            <div className="table-responsive">
           
                                    <MDBDataTableV5
                                        noBottomColumns
                                        className="table table-hover js-basic-example dataTable table-custom spacing5"
                                        entriesOptions={[5, 10, 20, 25]}
                                        entries={10}
                                        paging
                                        pagesAmount={15}
                                        data={tablebody}

                                    // searchTop
                                    // sortRows={['user_name']}
                                    //searchBottom={true}
                                    // onPageChange={()=>{ activePage: 2, pagesAmount: 5 }}
                                    />
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NewsList;
