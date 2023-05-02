import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { uploadProduct } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddProduct = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { menuDetail } = useSelector((state) => state.userReducer)

    const [productName, setproductName] = useState()
    const [productDescription, setproductDescription] = useState()
    const [productPrice, setproductPrice] = useState()
    const [category, setcategory] = useState()
    const [restraunt, setrestraunt] = useState()
    const [subCategory, setsubCategory] = useState()
    const [productImage, setproductImage] = useState()

    const [restaurantData, setrestaurantData] = useState([])


    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);
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

    const saveEvent = async (e) => {
        e.preventDefault()
        await dispatch(uploadProduct({
            productName,
            productDescription,
            productPrice,
            category,
            subCategory,
            restraunt,
            productImage
        })).then(() => {
            navigate("/product-list")

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
                            <h2>Add Product</h2>
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
                                                <label style={{ color: "#952B23", margin: "10px" }}>Product Name</label>
                                                <textarea rows="2" cols="50" required className="form-control" name="newsDescription" value={productName} onChange={(e) => setproductName(e.target.value)} style={{ width: "50%" }}>
                                                </textarea>
                                                {/* <input type="text" className="form-control" required name="productName" value={productName} onChange={(e) => setproductName(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Product Description</label>
                                                {/* <input type="text" className="form-control" required name="productDescription" value={productDescription} onChange={(e) => setproductDescription(e.target.value)} style={{ width: "50%" }} /> */}
                                                <textarea rows="5" cols="50" required className="form-control" name="newsDescription" value={productDescription} onChange={(e) => setproductDescription(e.target.value)} style={{ width: "50%" }}>
                                                </textarea>
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Price</label>
                                                <input type="number" className="form-control" required name="productPrice" value={productPrice} onChange={(e) => setproductPrice(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Category</label>
                                                <select
                                                    name="category"
                                                    value={category}
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
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Restaurant</label>
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
                                                                <option value={data._id}> {data.name}</option>
                                                            </>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Sub Category</label>
                                                <input type="text" className="form-control" required name="subCategory" value={subCategory} onChange={(e) => setsubCategory(e.target.value)} style={{ width: "50%" }} />
                                            </div>

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Image</label>
                                                <input type="file" className="form-control" required name="productImage" onChange={(e) => setproductImage(e.target.files[0])} style={{ width: "50%" }} />
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
export default AddProduct;
