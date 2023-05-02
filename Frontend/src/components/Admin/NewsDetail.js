import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { newsDetailData, updateNews } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";

const NewsDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { eventDetail, newsDetail } = useSelector((state) => state.userReducer);
    console.log(newsDetail)
    const [edit, setEdit] = useState(false)



    const [newsTitle, setNewsTitle] = useState()
    const [newsDescription, setNewsDescription] = useState()
    const [newsDate, setNewsDate] = useState()
    const [newsImage, setnewsImage] = useState()

    useEffect(() => {
        dispatch(newsDetailData(location?.state));
    }, []);

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
    const saveNews = async (e) => {
        e.preventDefault()
        var formdata = new FormData()
        formdata.append("newsTitle", newsTitle ? newsTitle : newsDetail?.newsTitle)
        formdata.append("newsDescription", newsDescription ? newsDescription : newsDetail?.newsDescription)
        formdata.append("newsImage", newsImage ? newsImage : newsDetail?.newsImage)
        formdata.append("newsId", location?.state)
        await dispatch(updateNews(formdata)).then(() => {

            dispatch(newsDetailData(location?.state));


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
                            <h2>News Details</h2>
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
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", }}>News Title</label>
                                                <input type="text" className="form-control" name="newsTitle" value={edit ? newsTitle : newsDetail?.newsTitle} disabled={edit ? false : true} onChange={(e) => setNewsTitle(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>News Description</label>
                                                <textarea rows="10" cols="50" className="form-control" name="newsDescription" value={edit ? newsDescription : newsDetail?.newsDescription} disabled={edit ? false : true} onChange={(e) => setNewsDescription(e.target.value)} style={{ width: "50%" }}>
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <label style={{ color: "#952B23", margin: "10px" }}>Image</label>
                                            {
                                                edit ? <>                                            <input type="file" name="file" className="form-control" onChange={(e) => setnewsImage(e.target.files[0])} style={{ width: "50%" }} />
                                                </> : <>
                                                    <div style={{ width: "50%" }}>
                                                        <img style={{ width: "100%" }} src={process.env.REACT_APP_API_URL + `/${newsDetail.newsImage}`} />

                                                    </div>
                                                </>
                                            }
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
export default NewsDetail;
