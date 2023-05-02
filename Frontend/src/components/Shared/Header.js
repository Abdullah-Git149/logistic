import React, { useState} from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  toggleMegamenu,
  toggleSearchBar,
  toggleNotificationBar,
  setOffcanvas,
} from "../../actions/settingsAction";
import { signout } from "../../actions/userAction";
// import { format } from "timeago.js";

const Header = ({
  toggleMegamenu,
  isMegaMenu,
  toggleNotificationBar,
  toggleSearchBar,
  setOffcanvas,
  offcanvas,
}) => {
  // const { user } = useSelector((state) => state.userReducer);
  // const{socket} = useSelector((state) => state.messangerReducer);

  // const [notification, setNotification] = useState([]);
  // const [status, setStatus] = useState([]);
  // const [chatmsg, setChatMsg] = useState([]);

  // For New order
  // useEffect(() => {
  //     socket.on("newOrder", (data) => {
  //       //console.log('mil gya 123',data);
  //       setNotification([...notification, data])
  //     });
  //     console.log('noti',notification);
  //   }, [notification]);

  // For order status
  // useEffect(() => {
  //     socket.on("chatMsg", (data) => {
  //       console.log('mil gya 123',data);
  //       setChatMsg([...chatmsg, data])
  //     });
  //     console.log('chatmsg',chatmsg);
  //   }, [chatmsg]);

  //   // For order status
  // useEffect(() => {
  //     socket.on("orderStatus", (data) => {
  //       //console.log('mil gya 123',data);
  //       setStatus([...status, data])
  //     });
  //     console.log('status',status);
  //   }, [status]);

  const dispatch = useDispatch();

  const signoutHendler = () => {
    dispatch(signout());
  };

  const [scrolled, setScrolled] = useState(0);
  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolleda = `${(scrollPx / winHeightPx) * 100}%`;
    setScrolled(scrolleda);
  };
  window.addEventListener("scroll", scrollProgress);

  // const progressContainerStyle = {
  //   background: "#f8bbd0",
  //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  //   height: "2px",
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   width: "100vw",
  //   zIndex: 99,
  // };

  const progressBarStyle = {
    // height: "2px",
    // background: "#e91e63",
    width: scrolled,
  };
  //console.log(scrolled, 'nbnvhffhfgh');
  return (
    <>
      <nav className="navbar top-navbar"  >
        <div className="container-fluid">
          <div className="navbar-left">
            <div className="navbar-btn">
              {/* <Link to="/"><img src="../assets/images/icon.svg" alt="Oculux Logo" className="img-fluid logo" /></Link> */}
              <button
                type="button"
                className="btn-toggle-offcanvas"
                onClick={() => setOffcanvas(!offcanvas)}
              >
                <i
                  className="lnr lnr-menu fa fa-bars"
               
                ></i>
              </button>
            </div>
          </div>

          <div className="navbar-right">
            <div id="navbar-menu">
              <ul className="nav navbar-nav">
                {/* <li><span onClick={() => toggleSearchBar(true)} className="search_toggle icon-menu" title="Search Result"><i className="icon-magnifier"></i></span></li>
                                <li><span onClick={() => toggleNotificationBar(true)} className="right_toggle icon-menu" title="Right Menu"><i className="icon-bubbles"></i><span className="notification-dot bg-pink">2</span></span></li> */}
                <li>
                  <Link
                    to="/login"
                    onClick={signoutHendler}
                    className="icon-menu"
              
                  >Logout 
                    <i
                      className="icon-power border-white"
                      style={{ color: "white", marginLeft: "5px" }}
                    ></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="progress-container">
          <div
            style={progressBarStyle}
            className="progress-bar"
            id="myBar"
          ></div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  isMegaMenu: state.settings.isMegaMenu,
  offcanvas: state.settings.offcanvas,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMegamenu: (e) => dispatch(toggleMegamenu(e)),
  toggleSearchBar: (e) => dispatch(toggleSearchBar(e)),
  toggleNotificationBar: (e) => dispatch(toggleNotificationBar(e)),
  setOffcanvas: (e) => dispatch(setOffcanvas(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
