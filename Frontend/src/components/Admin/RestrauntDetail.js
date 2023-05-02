import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { restrauntDetailData, updateRestraunt } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';


const AnyReactComponent = ({ text }) => <div>{text}</div>;


const RestaurantDetail = (props) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);
    const { packageDetail, restaurantDetail } = useSelector((state) => state.userReducer);

    const [edit, setEdit] = useState(false)
    console.log(restaurantDetail?.location?.coordinates, "resss")

    const [name, setName] = useState()
    const [address, setAdress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [description, setDescription] = useState()
    const [lat, setlat] = useState()
    const [long, setlong] = useState()
    const [restaurantImage, setRestrauntImage] = useState()
    const [restrauntPhone, setrestrauntPhone] = useState()

    const [value, setValue] = useState(null);

    if (value) {
        geocodeByPlaceId(value?.value?.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setlat(lat)
                setlong(lng)
            }
            )
            .catch(error => console.error(error));
    }

    useEffect(() => {
        dispatch(restrauntDetailData(location?.state));
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
    const saveRestraunt = async (e) => {
        e.preventDefault()
        var formdata = new FormData()

        formdata.append("resId", location?.state)
        formdata.append("name", name ? name : restaurantDetail?.name)
        formdata.append("address", value?.label ? value?.label : restaurantDetail?.address)
        formdata.append("city", city ? city : restaurantDetail?.city)
        formdata.append("state", state ? state : restaurantDetail?.state)
        formdata.append("description", description ? description : restaurantDetail?.description)
        formdata.append("restaurantImage", restaurantImage ? restaurantImage : restaurantDetail?.restaurantImage)
        formdata.append("lat", lat ? lat : restaurantDetail?.location?.coordinates[0])
        formdata.append("long", long ? long : restaurantDetail?.location?.coordinates[1])
        await dispatch(updateRestraunt(formdata)).then(() => {
            navigate("/restaurant-list")
        })

        setEdit(false)



    }
    return (
        <>
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-md-6 col-sm-12">
                            <h2>Restaurant Details</h2>
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


                                    <form onSubmit={(e) => saveRestraunt(e)}>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", }}>Restraunt Name</label>
                                                <input type="text" className="form-control" name="name" value={edit ? name : restaurantDetail?.name} disabled={edit ? false : true} onChange={(e) => setName(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Restraunt Address</label>
                                                {
                                                    edit ? <>
                                                        <div style={{ width: "50%" }}>
                                                            <GooglePlacesAutocomplete

                                                                apiKey={process.env.REACT_GOOGLE_MAPS_API_KEY}
                                                                selectProps={{
                                                                    value,
                                                                    onChange: setValue,
                                                                }}
                                                            />
                                                        </div></> : <div style={{ width: "50%" }}><textarea style={{ width: "100%" }} disabled >{restaurantDetail?.address}</textarea> </div>
                                                }

                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Restraunt City</label>
                                                <input type="text" className="form-control" name="city" value={edit ? city : restaurantDetail?.city} disabled={edit ? false : true} onChange={(e) => setCity(e.target.value)} style={{ width: "50%" }} />

                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Restraunt State</label>
                                                <input type="text" className="form-control" name="state" value={edit ? state : restaurantDetail?.state} disabled={edit ? false : true} onChange={(e) => setState(e.target.value)} style={{ width: "50%" }} />

                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23" }}>Restraunt Description</label>
                                                <textarea rows="10" cols="50" className="form-control" name="description" value={edit ? description : restaurantDetail?.description} disabled={edit ? false : true} onChange={(e) => setDescription(e.target.value)} style={{ width: "50%" }}>
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <label style={{ color: "#952B23", margin: "10px" }}>Image</label>
                                            {
                                                edit ?
                                                    <>
                                                        <input type="file" name="file" className="form-control" onChange={(e) => setRestrauntImage(e.target.files[0])} style={{ width: "50%" }} />
                                                    </> :
                                                    <>
                                                        <div style={{ width: "50%" }}>
                                                            <img style={{ width: "100%" }} src={process.env.REACT_APP_API_URL + `/${restaurantDetail.restaurantImage}`} />

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

                                    <div style={{ height: '100vh', width: '100%' }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RestaurantDetail;
