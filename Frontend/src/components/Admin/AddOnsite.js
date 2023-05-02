import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { uploadPackage } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@material-ui/core";
import { ImBin } from "react-icons/im"
const AddOnsite = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()

    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const [packageName, setPackageName] = useState()
    const [packagePrice, setPackagePrice] = useState()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [contact, setContact] = useState('')
    const [arr, setArr] = useState([])
    const [arr2, setArr2] = useState([])

    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);

    const saveMenu = async (e) => {
        e.preventDefault()

        dispatch(uploadPackage({
            name: packageName,
            price: packagePrice,
            contact: contact,
            subCategory: arr
        }))

        setArr([])
        setPackageName("")
        setPackagePrice("")
        setContact("")
    }

    const add = () => {
        if (!packageName) {
            toast.error("Package Name must be provided")
        } else if (!packagePrice) {
            toast.error("Package Price must be provided")
        } else if (!name) {
            toast.error("Sub Category Name must be provided")
        } else {
            setArr((arr) => [...arr, { "id": uuidv4(), "name": name, "subCat": arr2 }])
            setName("")
            setDescription("")
            setArr2([])
        }
    }
    const add2 = () => {
        if (!name) {
            toast.error("SubCateory Name must be provided")
        } else if (!description) {
            toast.error("Sub Category Description must be provided")
        } else {
            setArr2((arr2) => [...arr2, { "id": uuidv4(), "description": description }])
            setDescription("") 
        }
    }
    const deleteNow = (item) => {
        setArr(current => current.filter(arr => {
            return arr.id !== item.id;
        }),
        );
    }
    const deleteNow2 = (item) => {
        setArr2(current => current.filter(arr2 => {
            return arr2.id !== item.id;
        }),
        );
    }

    return (
        <>
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-md-6 col-sm-12">
                            <h2>Add Package</h2>
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-xl-6 col-lg-6 col-md-7">
                        <div className="card">
                            <div className="body">
                                <div className="row clearfix">
                                    <form>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Package Name</label>

                                                <input type="text" className="form-control" name="menuName" required value={packageName} onChange={(e) => setPackageName(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Package Price</label>
                                                <input type="text" className="form-control" name="menuName" required value={packagePrice} onChange={(e) => setPackagePrice(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Contact</label>
                                                <input type="text" className="form-control" name="menuName" required value={contact} onChange={(e) => setContact(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <label style={{ color: "#952B23", margin: "10px", fontSize: "20px" }}>Detail</label>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Sub Category Name</label>
                                                <input type="text" disabled={arr2.length > 0 ? true : false} className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Description</label>
                                                <input type="text" className="form-control" name="person" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "50%" }} />
                                                <Button variant="contained" onClick={add2}>+</Button>
                                            </div>


                                        </div>
                                        {arr2?.map((item, i) => (
                                            <div key={i} style={{ display: "flex", boxShadow: "-2px 3px 27px -6px rgba(0,0,0,0.75)", borderRadius: 5, alignItems: "center", justifyContent: "space-around", width: "50%", margin: "10px" }}>
                                                <div className="p-2" style={{ height: "100%", width: "80%" }}>
                                                    <span style={{ wordWrap: "break-all" }}>{item?.description}</span>
                                                </div>
                                                <div className="p-2" style={{ height: "100%", width: "20%" }}>
                                                    <button onClick={() => deleteNow2(item)} style={{ border: "none", background: "transparent" }}><ImBin /></button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <Button variant="contained" onClick={add}>Add</Button>
                                            </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className={arr.length > 0 ? "card" : ""}>
                            <div className="body">
                                <div className="clearfix">
                                    {arr?.map((item, i) => (
                                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, borderRadius: 7, width: "100%", margin: "10px", boxShadow: "-2px 3px 27px -6px rgba(0,0,0,0.75)", }}>

                                            <div className="form-group" style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                                                <span>Name : {item?.name}</span>
                                                <span>Description</span>
                                                <ul>
                                                    {item?.subCat?.map((item, i) => (
                                                        <li key={i} style={{ wordWrap: "break-all", width: "100%", marginBottom: 10 }}><p>{item?.description}</p></li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <button onClick={() => deleteNow(item)} style={{ border: "none", background: "transparent", width: "80%" }}><ImBin /></button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                {arr.length > 0 ? <div className="col-lg-12 col-md-12">
                                    <div className="form-group" style={{ display: "flex", alignItems: "center" }}>

                                        <button onClick={(e) => saveMenu(e)} style={{ backgroundColor: "#952B23", padding: "10px 15px", border: "none", color: "white", borderRadius: "9px" }} >Save</button>

                                    </div>
                                </div> : <></>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddOnsite;
