import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { uploadMenu } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import { useNavigate } from "react-router-dom";

const AddOffsite = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { menuDetail } = useSelector((state) => state.userReducer)
    const [menuName, setmenuName] = useState()
    const [menuhalfPrice, setmenuhalfPrice] = useState()
    const [menuFullPrice, setmenuFullPrice] = useState()
    const [contact, setContact] = useState()
    const [category, setCategory] = useState()

    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);

    const saveMenu = async (e) => {
        e.preventDefault()
        console.log(category, menuName, menuhalfPrice, menuFullPrice)
        await dispatch(uploadMenu({
            menuName,
            halfPrice: menuhalfPrice,
            fullPrice: menuFullPrice,
            category,
            contact

        })).then(() => {
            setmenuName("")
            setCategory("")
            setContact("")
            setmenuFullPrice("")
            setmenuhalfPrice("")

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
                            <h2>Add Menu</h2>
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
                                    <form onSubmit={(e) => saveMenu(e)}>


                                        <div className="col-lg-12 col-md-12">

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Menu Name</label>

                                                <input type="text" required className="form-control" name="menuName" value={menuName} onChange={(e) => setmenuName(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Half Price</label>
                                                <input type="number" required className="form-control" name="menuName" value={menuhalfPrice} onChange={(e) => setmenuhalfPrice(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Full Price</label>
                                                <input type="number" required className="form-control" name="menuName" value={menuFullPrice} onChange={(e) => setmenuFullPrice(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Category</label>
                                                {/* <input type="number" className="form-control" name="menuName" value={menuFullPrice} onChange={(e) => setmenuFullPrice(e.target.value)} style={{ width: "50%" }} /> */}
                                                <select
                                                    name="user_country"
                                                    value={category}
                                                    id=""
                                                    required
                                                    style={{ width: "50%", textAlign: "center", fontSize: "15px", padding: "5px" }}
                                                    onChange={(e) => setCategory(e.target.value)} >
                                                    <option value="">--Select--</option>
                                                    <option value="Salads"> Salads </option>
                                                    <option value="Appetizers">Appetizers</option>
                                                    <option value="Pasta">Pasta</option>
                                                    <option value="Entrees">Entrees</option>
                                                </select>
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Contact</label>
                                                <input type="number" required className="form-control" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} style={{ width: "50%" }} />
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
export default AddOffsite;
