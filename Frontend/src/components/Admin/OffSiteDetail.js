import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { offSiteDetailData, updateMenu } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";

const OffSiteDetail = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { menuDetail } = useSelector((state) => state.userReducer);

    const [edit, setEdit] = useState(false)


    const [menuName, setmenuName] = useState()
    const [menuhalfPrice, setmenuhalfPrice] = useState()
    const [menuFullPrice, setmenuFullPrice] = useState()
    const [category, setCategory] = useState()


    useEffect(() => {
        dispatch(offSiteDetailData(location?.state));
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
    const saveMenu = async (e) => {
        e.preventDefault()

        await dispatch(updateMenu({
            menuName: menuName ? menuName : menuDetail?.menuName,
            halfPrice: menuhalfPrice ? menuhalfPrice : menuDetail?.halfPrice,
            fullPrice: menuFullPrice ? menuFullPrice : menuDetail?.fullPrice,
            category: category ? category : menuDetail?.category,
            menuId: location?.state
        })).then(() => {
            dispatch(offSiteDetailData(location?.state));
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
                            <h2>OffSite Details</h2>
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
                                    <form onSubmit={(e) => saveMenu(e)}>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Menu Name</label>

                                                <input type="text" className="form-control" name="menuName" value={edit ? menuName : menuDetail.menuName} disabled={edit ? false : true} onChange={(e) => setmenuName(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Half Price</label>
                                                <input type="number" className="form-control" name="menuhalfPrice" value={edit ? menuhalfPrice : menuDetail.halfPrice} disabled={edit ? false : true} onChange={(e) => setmenuhalfPrice(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Full Price</label>
                                                <input type="text" className="form-control" name="menuFullPrice" value={edit ? menuFullPrice : menuDetail.fullPrice} disabled={edit ? false : true} onChange={(e) => setmenuFullPrice(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Category</label>
                                                <select
                                                    name="user_country"
                                                    value={edit ? category : menuDetail.category}
                                                    id=""
                                                    style={{ width: "50%"  , textAlign:"center" , fontSize:"15px" , padding:"5px"}}
                                                    disabled={edit ? false : true}
                                                    onChange={(e) => setCategory(e.target.value)}  >
                                                    <option value="">--Select--</option>
                                                    <option value="Salads"> Salads </option>
                                                    <option value="Appetizers">Appetizers</option>
                                                    <option value="Pasta">Pasta</option>
                                                    <option value="Entrees">Entrees</option>
                                                </select>
                                                {/* <input type="text" className="form-control" name="category" value={edit ? category : menuDetail.category} disabled={edit ? false : true} onChange={(e) => setCategory(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>

                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group"  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    {edit ? <input  style={{backgroundColor:"#952B23" , padding:"10px 15px" , border:"none" , color:"white" , borderRadius:"9px"}} type="submit" value="Save" /> : <button  style={{backgroundColor:"#952B23" , padding:"10px 15px" , border:"none" , color:"white" , borderRadius:"9px"}} onClick={(e) => editDetail(e)}> Edit </button>}

                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Detail</label>
                                                <input type="text" className="form-control" name="eventDescription" value={edit ? eventDescription : eventDetail.eventDescription} disabled={edit ? false : true} onChange={(e) => setEventDescription(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Date</label>
                                                <input type="text" className="form-control" name="eventDate" value={edit ? eventDate : eventDetail.eventDate} disabled={edit ? false : true} onChange={(e) => setEventDate(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Address</label>
                                                <input type="text" className="form-control" name="eventAddress" value={edit ? eventAddress : eventDetail.eventAddress} disabled={edit ? false : true} onChange={(e) => setEventAddress(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Phone</label>
                                                <input type="text" className="form-control" name="eventPhone" value={edit ? eventPhone : eventDetail.eventPhone} disabled={edit ? false : true} onChange={(e) => setEventPhone(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event Start</label>
                                                <input type="time" className="form-control" name="eventStart" value={edit ? eventStart : eventDetail.eventStart} disabled={edit ? false : true} onChange={(e) => setEventStart(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Event End</label>
                                                <input type="time" className="form-control" name="eventEnd" value={edit ? eventEnd : eventDetail.eventEnd} disabled={edit ? false : true} onChange={(e) => setEventEnd(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                {edit ? <input type="submit" value="Save" /> : <button onClick={(e) => editDetail(e)}> Edit </button>}

                                            </div>
                                        </div> */}
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
export default OffSiteDetail;
