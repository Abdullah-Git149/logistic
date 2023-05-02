import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { orderDetailData, orderStatusAction } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import { useNavigate } from "react-router-dom";

const OrderStatus = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { orderDetail } = useSelector((state) => state.userReducer);
    const [newsTitle, setnewsTitle] = useState()
    const [newsDescription, setnewsDescription] = useState()
    const [newsImage, setnewsImage] = useState()
    const [orderStatus, setorderStatus] = useState()

    useEffect(() => {
        dispatch(orderDetailData(location?.state));
    }, []);


    console.log(orderDetail?.order_status?.slice(-1)[0]?.status, "io")


    const changeOrderStatus = async (e) => {
        e.preventDefault()

        console.log(orderStatus)

        await dispatch(orderStatusAction({
            orderId: location?.state,
            order_status: orderStatus


        })).then(() => {
            // navigate("/event-list")
            dispatch(orderDetailData(location?.state));

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
                            <h2>Change Order Status</h2>
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
                                    <form onSubmit={(e) => changeOrderStatus(e)}>


                                        <div className="col-lg-12 col-md-12">

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Order Number</label>
                                                <span>{orderDetail?.order_number}</span>
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Sub Total</label>
                                                <span>$ {orderDetail?.sub_total}</span>
                                                {/* <input type="text" className="form-control" name="menuName" value={newsDescription} onChange={(e) => setnewsDescription(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Total price</label>
                                                <span>$ {orderDetail?.total_price}</span>
                                                {/* <input type="text" className="form-control" name="menuName" value={newsDescription} onChange={(e) => setnewsDescription(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>
                                            {
                                                orderDetail?.total_price - orderDetail?.sub_total === 10 ? <>
                                                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <label style={{ color: "#952B23", margin: "10px" }}>Discount Price</label>
                                                        <span>$ 10</span>
                                                    </div>
                                                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <label style={{ color: "#952B23", margin: "10px" }}>Discount Avail</label>
                                                        <span>$ {orderDetail?.total_price - orderDetail?.sub_total}</span>
                                                    </div></> : <>
                                                </>
                                            }

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Order Status</label>
                                                <span>{orderDetail?.order_status?.slice(-1)[0]?.status}</span>
                                                {/* <input type="text" className="form-control" name="menuName" value={newsDescription} onChange={(e) => setnewsDescription(e.target.value)} style={{ width: "50%" }} /> */}
                                            </div>

                                            {
                                                orderDetail?.order_status?.slice(-1)[0]?.status === "Delivered" ? <></> :
                                                    <>
                                                        <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                            <label style={{ color: "#952B23", margin: "10px" }}>Change Order Status</label>
                                                            <select
                                                                name="user_country"
                                                                value={orderStatus}
                                                                id=""
                                                                style={{ width: "50%", textAlign: "center", fontSize: "15px", padding: "5px" }}
                                                                onChange={(e) => setorderStatus(e.target.value)}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {/* <option value="Recieved"> Received </option> */}
                                                                <option value="Delivered">Delivered</option>
                                                                <option value="On The Way">On The Way</option>
                                                            </select>
                                                        </div>
                                                    </>
                                            }

                                        </div>
                                        {
                                            orderDetail?.order_status?.slice(-1)[0]?.status === "Delivered"   ? <></> :  
                                                <div className="col-lg-12 col-md-12">

                                                    <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <input type="submit" value="Save" style={{ backgroundColor: "#952B23", padding: "10px 15px", border: "none", color: "white", borderRadius: "9px" }} />

                                                    </div>
                                                </div>
                                               
                                        }
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
export default OrderStatus;
