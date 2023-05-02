import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
// import {Spinner} from "../UI/Loader";
import AsyncCsv from "./UserCsv";
import { allUsers, blockUser, unblockUser } from "../../actions/adminAction";
import { listOfRestaurant, delete_restraunt } from "../../actions/userAction";
import { Button } from "@material-ui/core";

const RestaurantList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { restaurant } = useSelector((state) => state?.userReducer);

    const [tablebody, setTableBody] = useState([]);

    useEffect(() => {
        dispatch(listOfRestaurant());
    }, []);

    const deleteRestraunt = async (resId, e) => {
        e.preventDefault();

        await dispatch(delete_restraunt(resId)).then(() => {
            dispatch(listOfRestaurant());
        })

    };

    useEffect(() => {
        if (!restaurant) {

        } else if (restaurant) {
            const userDataFiltered = restaurant?.map((x) => {

                //Getting user image
                x.image = x.restaurantImage ? (
                    <img
                        src={process.env.REACT_APP_API_URL + `/${x.restaurantImage}`}
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
                        <button
                            type="button"
                            className="btn btn-sm btn-default"
                            title="View Details"
                            data-for="send"
                            data-tip="true"
                            currentitem="false"
                            onClick={() => navigate("/restaurant-detail", { state: x?._id })}
                        >
                            <i className="icon-eye"></i>
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-default"
                            title="View Details"
                            data-for="send"
                            data-tip="true"
                            currentitem="false"
                            onClick={(e) => deleteRestraunt(x._id, e)}
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
                    {
                        label: "Image",
                        field: "image",
                        sort: "asc",
                        width: 50,
                    },
                    {
                        label: "Name",
                        field: "name",
                        width: 50,
                    },
                    {
                        label: "City",
                        field: "city",
                        width: 50,
                    },
                    {
                        label: "State",
                        field: "state",
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
    }, [restaurant]);
    console.log(tablebody)
    return (
        <>
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="header" style={{ marginTop: 20 }}>
                            <h4>Restaurants</h4>
                            <div>
                                <Link to="/add-restaurant"><Button variant="contained">Add Restaurant</Button></Link>
                            </div>

                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                {restaurant?.length < 1 ? (
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
                                        entries={10}
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
export default RestaurantList;
