import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@material-ui/core";
// import {Spinner} from "../UI/Loader";
import AsyncCsv from "./UserCsv";
import { allUsers, blockUser, unblockUser } from "../../actions/adminAction";
import { productListData, delete_product } from "../../actions/userAction";
import { Button } from "@material-ui/core";


const ProductList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userList, blockuser, unBlockUser } = useSelector((state) => state.agencyReducer);
    const { menuList, productList } = useSelector((state) => state?.userReducer);

    const [tablebody, setTableBody] = useState([]);
    console.log(productList, "reduceer");

    useEffect(() => {
        dispatch(productListData());
    }, []);

    const deleteRestraunt = async (productId, e) => {
        e.preventDefault();
        console.log(productId)


        await dispatch(delete_product(productId)).then(() => {

            dispatch(productListData());
        })

    };

    useEffect(() => {
        if (!productList) {

        } else if (productList) {
            const userDataFiltered = productList?.map((x) => {

                x.name = (<div>{x?.restaurantId?.name}</div>)

                //Getting user image
                x.image = x.productImage ? (
                    <img
                        src={process.env.REACT_APP_API_URL + `/${x.productImage}`}
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
                            onClick={() => navigate("/product-detail", {
                                state: {
                                    _id: x?._id,
                                    productName: x?.productName,
                                    productDescription: x?.productDescription,
                                    productImage: x?.productImage,
                                    category: x?.category,
                                    productPrice: x?.productPrice,
                                    subCategory: x?.subCategory,
                                    restaurantId: x?.restaurantId
                                }
                            })}
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
                        field: "productName",
                        width: 50,
                    },
                    {
                        label: "Price",
                        field: "productPrice",
                        width: 50,
                    },
                    {
                        label: "Category",
                        field: "category",
                        width: 50,
                    },
                    {
                        label: "Sub Category",
                        field: "subCategory",
                        width: 50,
                    },
                    {
                        label: "Restraunt Name",
                        field: "name",
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
    }, [productList]);
    console.log(tablebody)
    return (
        <>
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="header" style={{ marginTop: 20 }}>
                            <h4>Product List </h4>
                            {/* <Link
                                to="/branch-add"
                                className="btn btn-sm btn-primary mr-1"
                                title=""
                            >
                                Add New Branch
                            </Link> */}
                            <div>
                                {/* <AsyncCsv /> */}

                                <Link to="/add-product"><Button variant="contained">Add Product</Button></Link>
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
                                {productList?.length < 1 ? (
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
export default ProductList;
