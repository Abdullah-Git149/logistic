import React, { useEffect } from "react";
// import Cookies from "universal-cookie";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { askForPermissioToReceiveNotifications } from "./firebase"
import "./App.css";
// import Layout from "./components/Shared/Layout";
import Header from "./components/Shared/Header";
import Menu from "./components/Shared/Menu";
import Login from "./components/Authentication/login";
import Notfound from "./components/Authentication/404";
import ForgotPassword from "./components/Authentication/forgotpassword";
import Dashboard from "./components/Dashboard/dashboard";
import PP from "./components/Admin/PP";
import TC from "./components/Admin/TC";
import Notification from "./components/Admin/Notification";
import ChangePassword from "./components/Admin/ChangePassword";
import SellerList from "./components/Admin/SellerList";
import UserList from "./components/Admin/UserList";
import UserDetails from "./components/Admin/UserDetails";

import { useSelector } from "react-redux";
import OrderList from "./components/Admin/OrderList";
import EventList from "./components/Admin/EventList";
import EventDetail from "./components/Admin/EventDetail";
import NewsList from "./components/Admin/NewsList";
import NewsDetail from "./components/Admin/NewsDetail";
import OnsiteList from "./components/Admin/OnSiteList";
import OnsiteDetail from "./components/Admin/OnsiteDetail";
import OffSiteList from "./components/Admin/OffSiteList";
import OffSiteDetail from "./components/Admin/OffSiteDetail";
import AddOffsite from "./components/Admin/AddOffsite";
import AddOnsite from "./components/Admin/AddOnsite";
import AddEvent from "./components/Admin/AddEvent";
import AddNews from "./components/Admin/AddNews";
import OrderStatus from "./components/Admin/OrderStatus";
import AddRestaurant from "./components/Admin/AddRestaurant";
import RestaurantList from "./components/Admin/RestaurantList";
import RestaurantDetail from "./components/Admin/RestrauntDetail";
import ProductList from "./components/Admin/ProductList";
import ProductDetail from "./components/Admin/ProductDetail";
import AddProduct from "./components/Admin/AddProduct";
import PumpList from "./components/LogisticComponents/PumpList";

import toast from "react-hot-toast";
import PumpDetail from "./components/LogisticComponents/PumpDetail";
import TruckList from "./components/LogisticComponents/TruckList";
import TruckDetail from "./components/LogisticComponents/TruckDetail";
import DriverList from "./components/LogisticComponents/DriverList";
import DriverDetail from "./components/LogisticComponents/DriverDetail";
import AddPump from "./components/LogisticComponents/AddPump";
import AddTruck from "./components/LogisticComponents/AddTruck";
import AddDriver from "./components/LogisticComponents/AddDriver";




function App() {
  // useEffect(() => {
  //   // const messaging = firebase.messaging()
  //   // messaging.requestPermission()
  //   //   .then(() => {
  //   //     return messaging.getToken()
  //   //   }).then((token) => {
  //   //     console.log("token...", token)
  //   //   }).catch((error) => {
  //   //     console.log(error)
  //   //   })

  // }, [])

  useEffect(() => {
    askForPermissioToReceiveNotifications()
  },)
  const { settings } = useSelector((state) => state);
  const tokens = useSelector((state) => state.userReducer.token);

  const {
    themeColor,
    fontStyle,
    lightVersion,
    RtlVersion,
    offcanvas,
    miniSidebar,
    horizontalMenu,
    miniHover,
  } = settings;
  document.getElementsByTagName(
    "body"
  )[0].className = `${themeColor} ${fontStyle}${lightVersion ? " light_version" : ""
  }${RtlVersion ? " rtl" : ""}${offcanvas ? " offcanvas-active" : ""}${horizontalMenu ? " h-menu" : ""
    }${miniSidebar ? " mini_sidebar" : ""}${miniHover ? " mini_hover" : ""}`;

  //   requestFirebaseNotificationPermission()
  // .then((firebaseToken) => {
  //   // eslint-disable-next-line no-console
  //   console.log(firebaseToken);
  // })
  // .catch((err) => {
  //   return err;
  // });


  // onMessageListener()
  // .then((payload) => {
  //   const { title, body } = payload.data;
  //   toast.info(`${title}; ${body}`);
  // })
  // .catch((err) => {
  //   toast.error(JSON.stringify(err));
  // });

  return (


    <Router>
      {tokens ? (
        <>

          {/* <Layout /> */}

          <div className="overlay" />
          <div id="wrapper">
            <Menu />
            <Header />
            <div id="main-content">
              <Routes>
                <Route exact path="/" element={<Navigate to="/dashboard" />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/customer-list" element={<UserList />} />
                <Route exact path="/order-list" element={<OrderList />} />

                <Route exact path="/add-event" element={<AddEvent />} />
                <Route exact path="/event-list" element={<EventList />} />
                <Route exact path="/event-detail" element={<EventDetail />} />

                <Route exact path="/add-news" element={<AddNews />} />
                <Route exact path="/news-list" element={<NewsList />} />
                <Route exact path="/news-detail" element={<NewsDetail />} />

                <Route exact path="/onsite-list" element={<OnsiteList />} />
                <Route exact path="/onsite-detail" element={<OnsiteDetail />} />
                <Route exact path="/add-onsite" element={<AddOnsite />} />

                <Route exact path="/offsite-list" element={<OffSiteList />} />
                <Route exact path="/offsite-detail" element={<OffSiteDetail />} />
                <Route exact path="/add-offsite" element={<AddOffsite />} />

                <Route exact path="/add-restaurant" element={<AddRestaurant />} />
                <Route exact path="/restaurant-list" element={<RestaurantList />} />
                <Route exact path="/restaurant-detail" element={<RestaurantDetail />} />

                <Route exact path="/product-list" element={<ProductList />} />
                <Route exact path="/product-detail" element={<ProductDetail />} />
                <Route exact path="/add-product" element={<AddProduct />} />



                <Route exact path="/order-status" element={<OrderStatus />} />

                <Route exact path="/user-details" element={<UserDetails />} />
                {/* <Route exact path="/seller-list/user-details/:edit?" element={<UserDetails />} /> */}
                <Route exact path="/seller-list" element={<SellerList />} />
                <Route exact path="/change-password" element={<ChangePassword />} />
                <Route exact path="/notifications" element={<Notification />} />
                <Route exact path="/contents/pp" element={<PP />} />
                <Route exact path="/contents/tc" element={<TC />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />

                <Route exact path="/pump-list" element={<PumpList />} />
                <Route exact path="/pump-detail" element={<PumpDetail />} />
                <Route exact path="/truck-list" element={<TruckList />} />
                <Route exact path="/truck-detail" element={<TruckDetail />} />
                <Route exact path="/driver-list" element={<DriverList />} />
                <Route exact path="/driver-detail" element={<DriverDetail />} />
                <Route exact path="/add-pump" element={<AddPump />} />
                <Route exact path="/add-truck" element={<AddTruck />} />
                <Route exact path="/add-driver" element={<AddDriver />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            {/* 404 rounte */}
            <Route path="*" element={<Notfound />} />
          </Routes>

        </>
      )}
    </Router>

  );
}

export default App;
