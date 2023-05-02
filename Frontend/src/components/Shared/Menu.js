import React, { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import MetisMenu from "react-metismenu";
import { Link, useLocation } from "react-router-dom";

import { setOffcanvas } from "../../actions/settingsAction";
import { metisMenu } from "./metisMenu";
import DefaultLink from "./DefaultLink";
import { Dropdown } from "react-bootstrap";
// import {
//   setMiniSidebarMenuOn,
//   setMiniHover,
// } from "../../actions/settingsAction";
import {FaWindowClose } from 'react-icons/all';
// import { signout } from "../../actions/userAction";
import ChangePass from "../Admin/ChangePassword"

const Menu = (props) => {
  // console.log(props)
  const location  = useLocation()
  //  console.log(location.pathname)
  const dispatch = useDispatch();

  // console.log(props)
  // const { user } = useSelector((state) => state.userReducer);
  const { offcanvas } = useSelector((state) => state.settings);
  const [can, setCan] = useState(offcanvas)
  // console.log(user, "ye data hai12");
 
  const toggleSubMenu = (e) => {
    let menucClass = "";
    if (e.itemId) {
      //  console.log(e)
      const subClass = e.items.map((menuItem) => {
        if (
          menuItem.id === "main" ||
          menuItem.id === "app" ||
          menuItem.id === "extra" ||
          menuItem.id === "ui"
        ) {
          menucClass = "header";
        }
        if (menuItem.to === location?.pathname) {
          menucClass = "";
        } else {
          menucClass = "collapse";
        }
        return menucClass;
      });
      return subClass;
      // return "collapse";
    } else {
      return e.visible ? "collapse" : "metismenu";
    }
  };

  // const minisidebarMouseOver = () => {
  //   props.setMiniSidebarMenuOn(false);
  //   props.setMiniHover(true);
  // };

  // const minisidebarMouseOut = () => {
  //   props.setMiniSidebarMenuOn(true);
  //   props.setMiniHover(false);
  // };

  // const signoutHendler = () => {
  //   dispatch(signout());
  // };
  const closeToggle = () => {
    setCan(false)
    dispatch(setOffcanvas(can))
}


  return (
    <>
      <div
        id="left-sidebar" 
        className={`sidebar${props.miniSideMenuOn ? " mini_sidebar_on" : ""}`}
      >
        <div className="navbar-brand"  >
          <Link to="/dashboard">
            <img
              src="../assets/images/AhPizzaLogo.png"
              style={{ width: 70 , height: 50 }}
              alt="AhPizza Logo"
              className="img-fluid logo ml-2"
            />
          </Link>
          <button
            type="button"
            className="btn-toggle-offcanvas btn btn-sm float-right"
            onClick={closeToggle}
          >
            <FaWindowClose style={{fontSize: '18px'}}/>
          </button>
        </div>
        <div className="sidebar-scroll">
          <div className="user-account d-flex ">
            <div className="user_div">
              {/* <img src="../assets/images/user.png" className="user-photo" alt="User Profile" /> */}
            </div>
            <div className="dropdown">
              <span>Welcome,</span>
              <br />
              {/* <strong>Admin</strong> */}
              <Dropdown className="ml-0">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="user-name left_dropdown_btn"
                >
                  <strong>Admin </strong> 
                </Dropdown.Toggle>

                <Dropdown.Menu style={{width:'auto'}}>
               < ChangePass />
                  {/* <Link className="abc-item" to="/change-password"><i className="icon-user"></i>Change Password</Link>
                  <change /> */}
                  {/* <Link className="dropdown-item" to="/app-inbox"><i className="icon-envelope-open"></i>Messages</Link>
										<Link className="dropdown-item" to="/"><i className="icon-settings"></i>Settings</Link> */}
                  {/* <li className="divider" /> */}
                  {/* <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={signoutHendler}
                    
                  >
                   <GiPowerButton/> Logout
                  </
                  
                  > */}
                </Dropdown.Menu>
              </Dropdown>
              <ul className="dropdown-menu dropdown-menu-right account vivify flipInY"></ul>
            </div>
          </div>
          <nav id="left-sidebar-nav" className="sidebar-nav">
            <MetisMenu
              content={ metisMenu }
              noBuiltInClassNames={true}
              classNameItemActive="active"
              classNameContainer={(e) => toggleSubMenu(e)}
              classNameContainerVisible="in"
              iconNamePrefix=""
              activeLinkFromLocation = {location?.pathname ? location?.pathname: '' }
              LinkComponent={(e) => <DefaultLink itemProps={e} />}
            />
          </nav>
        </div>
      </div>
    </>      
  );
};

export default Menu;
