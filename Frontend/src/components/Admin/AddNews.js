import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { saveNewsAction } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import { useNavigate } from "react-router-dom";

const AddNews = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const [newsTitle, setnewsTitle] = useState()
    const [newsDescription, setnewsDescription] = useState()
    const [newsImage, setnewsImage] = useState()

    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);

    var formdata = new FormData()
    formdata.append("newsTitle", newsTitle)
    formdata.append("newsDescription", newsDescription)
    formdata.append("newsImage", newsImage)
    const saveNews = async (e) => {
        e.preventDefault()

        console.log(formdata)
        await dispatch(saveNewsAction(formdata)).then(() => {
            navigate("/news-list")

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
                            <h2>Add News</h2>
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
                                    <form onSubmit={(e) => saveNews(e)}>


                                        <div className="col-lg-12 col-md-12">

                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>News Title</label>

                                                <input type="text" className="form-control" required name="menuName" value={newsTitle} onChange={(e) => setnewsTitle(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>News Description</label>
                                                <textarea rows="10" cols="50" required className="form-control" name="newsDescription" value={newsDescription} onChange={(e) => setnewsDescription(e.target.value)} style={{ width: "50%" }}>
                                                </textarea>
                                                {/* <input type="text" className="form-control" name="menuName" value={newsDescription} onChange={(e) => setnewsDescription(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>
                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Image</label>
                                                <input type="file" name="file" required className="form-control" onChange={(e) => setnewsImage(e.target.files[0])} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
export default AddNews;
