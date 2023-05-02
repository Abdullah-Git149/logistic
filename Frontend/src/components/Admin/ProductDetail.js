import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { newsDetailData, updateProduct } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import axios from "axios";

const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { eventDetail, newsDetail } = useSelector((state) => state.userReducer);

    const [edit, setEdit] = useState(false)
    const [restaurantData, setrestaurantData] = useState([])

    console.log(location?.state, 'asd')

    const [productName, setproductName] = useState()
    const [productDescription, setproductDescriptionn] = useState()
    const [productPrice, setproductPrice] = useState()
    const [category, setcategory] = useState()
    const [subCategory, setsubCategory] = useState()
    const [productImage, setproductImage] = useState()
    const [restraunt, setrestraunt] = useState()
    const [productDetail, setproductDetail] = useState()

    console.log(productDetail?.restaurantId?.name, "hhh")
    useEffect(() => {
        const resData = async () => {
            const token = localStorage.getItem("myToken")
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }

            await axios.get(process.env.REACT_APP_API_URL + "/api/admin/all-restaurant", config).then((res) => {
                console.log(res)
                setrestaurantData(res?.data?.restaurat)
            }).catch((err) => {

            })

        }

        resData()
    }, [errors]);
    useEffect(() => {
        const resData = async () => {
            const token = localStorage.getItem("myToken")
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }

            await axios.get(process.env.REACT_APP_API_URL + `/api/admin/product-detail/${location?.state?._id}`, config).then((res) => {
                console.log("product", res?.data?.product)
                setproductDetail(res?.data?.product)

            }).catch((err) => {
                console.log(err.response)
            })

        }

        resData()
    }, [errors]);
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
    const saveProduct = async (e) => {
        e.preventDefault()
        console.log(productImage)

 


        var formdata = new FormData()
        formdata.append("productName", productName ? productName : location.state?.productName)
        formdata.append("productDescription", productDescription ? productDescription : location.state?.productDescription)
        formdata.append("productPrice", productPrice ? productPrice : location.state?.productPrice)
        formdata.append("category", category ? category : location.state?.category)
        formdata.append("subCategory", subCategory ? subCategory : location.state?.subCategory)
        formdata.append("productImage", productImage ? productImage : location.state?.productImage)
        formdata.append("restaurantId", restraunt ? restraunt : productDetail?.restaurantId?._id)
        await dispatch(updateProduct(formdata, location.state?._id)).then(() => {
            navigate("/product-list")

            setEdit(false)
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
                            <h2>Product Details</h2>
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
                                    {/* <form onSubmit={(e) => saveNews(e)}>
                                        <div className="col-lg-12 col-md-12">
                               
                                            <div className="form-group" style={{ display: "flex" }}>
                                                <label style={{ color: "#952B23", marginRight: "10px" }}>Name</label>
                                                <p>{location.state?.productName}</p>
                                            </div>
                                            <div className="form-group" style={{ display: "flex" }}>
                                                <label style={{ color: "#952B23", marginRight: "10px" }}>Description</label>
                                                <p>{location.state?.productDescription}</p>
                                            </div>
                                            <div className="form-group" style={{ display: "flex" }}>
                                                <label style={{ color: "#952B23", marginRight: "10px" }}>Price</label>
                                                <p>$ {location.state?.productPrice}</p>
                                            </div>
                                            <div className="form-group" style={{ display: "flex" }}>
                                                <label style={{ color: "#952B23", marginRight: "10px" }}>Category</label>
                                                <p>{location.state?.category}</p>
                                            </div>
                                            <div className="form-group" style={{ display: "flex" }}>
                                                <label style={{ color: "#952B23", marginRight: "10px" }}>Sub Category</label>
                                                <p>{location.state?.subCategory}</p>
                                            </div>
                                            <div className="form-group" style={{ display: "flex" }}>
                                                <label style={{ color: "#952B23", marginRight: "10px" }}>Restaurant Name</label>
                                                <p>{location.state?.restaurantId?.name}</p>
                                            </div>

                                        </div>
                                    </form> */}

                                    <form onSubmit={(e) => saveProduct(e)}>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", }}>Product Name</label>
                                                <input type="text" className="form-control" name="productName" value={edit ? productName : location.state?.productName} disabled={edit ? false : true} onChange={(e) => setproductName(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Product Description</label>
                                                <input type="text" className="form-control" name="productDescription" value={edit ? productDescription : location.state?.productDescription} disabled={edit ? false : true} onChange={(e) => setproductDescriptionn(e.target.value)} style={{ width: "50%" }} />

                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Product Price</label>
                                                <input type="text" className="form-control" name="productPrice" value={edit ? productPrice : location.state?.productPrice} disabled={edit ? false : true} onChange={(e) => setproductPrice(e.target.value)} style={{ width: "50%" }} />

                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Restaurant</label>
                                                {
                                                    edit ?
                                                        <>
                                                            <select
                                                                name="restraunt"
                                                                value={restraunt}
                                                                id=""
                                                                style={{ width: "50%", textAlign: "center", fontSize: "15px", padding: "5px" }}
                                                                onChange={(e) => setrestraunt(e.target.value)}  >
                                                                <option value=""> --Select--</option>
                                                                {
                                                                    restaurantData.map((data, index) => (
                                                                        <>
                                                                            <option value={data._id} key={index}> {data.name}</option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </select>
                                                        </> :
                                                        <>
                                                            <input type="text" className="form-control" name="productPrice" value={productDetail?.restaurantId?.name} disabled style={{ width: "50%" }} />


                                                        </>
                                                }

                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Category</label>
                                                {/* <input type="text" className="form-control" name="category" value={edit ? category : location.state?.category} disabled={edit ? false : true} onChange={(e) => setcategory(e.target.value)} style={{ width: "50%" }} /> */}

                                                <select
                                                    name="category"
                                                    value={edit ? category : location.state?.category}
                                                    disabled={edit ? false : true}
                                                    id=""
                                                    style={{ width: "50%", textAlign: "center", fontSize: "15px", padding: "5px" }}
                                                    onChange={(e) => setcategory(e.target.value)}  >

                                                    <option value="">--Select--</option>
                                                    <option value="Main Menu">Main Menu</option>
                                                    <option value="Happy Hour">Happy Hour</option>
                                                    <option value="Brunch">Brunch</option>
                                                    <option value="Lunch">Lunch</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>SubCategory</label>
                                                <input type="text" className="form-control" name="category" value={edit ? subCategory : location.state?.subCategory} disabled={edit ? false : true} onChange={(e) => setsubCategory(e.target.value)} style={{ width: "50%" }} />


                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Product Image</label>
                                                {
                                                    edit ?
                                                        <>
                                                            <input type="file" name="file" className="form-control" onChange={(e) => setproductImage(e.target.files[0])} style={{ width: "50%" }} />
                                                        </> :
                                                        <>
                                                            <div style={{ backgroundColor: "red", width: "20%" }}>
                                                                <img width="100%" height="50%" src={process.env.REACT_APP_API_URL + `/${location.state?.productImage}`} />

                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                {edit ? <input style={{ backgroundColor: "#952B23", padding: "10px 15px", border: "none", color: "white", borderRadius: "9px" }} type="submit" value="Save" /> : <button style={{ backgroundColor: "#952B23", padding: "10px 15px", border: "none", color: "white", borderRadius: "9px" }} onClick={(e) => editDetail(e)}> Edit </button>}

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
export default ProductDetail;
