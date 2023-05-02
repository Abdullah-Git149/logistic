import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { userDetails } from "../../actions/adminAction";
import { saveRestaurantAction } from "../../actions/userAction";
import AsyncCsv from "./UserDetailsCsv";
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { useNavigate } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
const AddRestaurant = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { errors, userDetail } = useSelector((state) => state.agencyReducer);

    const [name, setname] = useState()
    const [address, setaddress] = useState()
    const [city, setcity] = useState()
    const [restaurantState, setrestaurantState] = useState()
    const [description, setdescription] = useState()
    const [lat, setlat] = useState()
    const [long, setlong] = useState()
    const [restaurantImage, setrestaurantImage] = useState(null)

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

    console.log(value?.label, "park")
    console.log(lat, long, "park")
    console.log(restaurantImage, "park")
    // for errors
    useEffect(() => {
        if (errors && errors.length > 0) {
            errors.map((error) => toast.error(error.message));
        }
    }, [errors]);



    const saveRestaurant = async (e) => {
        e.preventDefault()

        await dispatch(saveRestaurantAction(name, value?.label, city, restaurantState, description, lat, long, restaurantImage)).then((res) => {
            // navigate("/news-list")
            setname("")
            setrestaurantImage(null)
            setaddress("")
            setcity("")
            setdescription("")
            setrestaurantState("")
            setlat("")
            setlong("")
            setValue(null)

            navigate("/restaurant-list")

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
                            <h2>Add Restaurant</h2>
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-xl-12 col-lg-8 col-md-7">
                        <div className="card">
                            <div className="body">
                                <div className="row clearfix">
                                    <form onSubmit={(e) => saveRestaurant(e)}>
                                        <div className="col-lg-12 col-md-12">

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Restaurant Name</label>

                                                <input type="text" className="form-control" name="menuName" value={name} onChange={(e) => setname(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            {/* <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Address</label>

                                                <input type="text" className="form-control" name="menuName" value={address} onChange={(e) => setaddress(e.target.value)} style={{ width: "50%" }} />

                                            </div> */}
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>City</label>

                                                <input type="text" className="form-control" required name="menuName" value={city} onChange={(e) => setcity(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>State</label>

                                                <input type="text" className="form-control" required name="menuName" value={restaurantState} onChange={(e) => setrestaurantState(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Description</label>
                                                <textarea rows="10" cols="50" className="form-control" required name="newsDescription" value={description} onChange={(e) => setdescription(e.target.value)} style={{ width: "50%" }}>
                                                </textarea>
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Address</label>
                                                <div style={{ width: "50%" }}>
                                                    <GooglePlacesAutocomplete

                                                        apiKey={process.env.REACT_GOOGLE_MAPS_API_KEY}
                                                        selectProps={{
                                                            value,
                                                            onChange: setValue,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Latitude</label>
                                                <input type="text" className="form-control" required name="menuName" value={lat} onChange={(e) => setlat(e.target.value)} style={{ width: "50%" }} />
                                            </div>
                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Longitude</label>
                                                <input type="text" className="form-control" required name="menuName" value={long} onChange={(e) => setlong(e.target.value)} style={{ width: "50%" }} />
                                            </div> */}

                                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <label style={{ color: "#952B23", margin: "10px" }}>Image</label>
                                                <input type="file" name="file" required className="form-control" onChange={(e) => setrestaurantImage(e.target.files[0])} style={{ width: "50%" }} />
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
export default AddRestaurant;
