import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../actions/userAction";
import toast from "react-hot-toast";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { errors, user } = useSelector((state) => state.userReducer);

  console.log("Login", errors);
  const user_device_token = localStorage.getItem("user_device_token")
   const [state, setState] = useState({
    email: "",
    password: "",
    user_device_token: user_device_token
  });
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(signin(state));
  };

  console.log(state.user_device_token, "==>")

  useEffect(() => {
    if (errors) {
      toast.error(errors.message);
      dispatch({ type: "RESET_MESSAGE" });
      setLoading(false);
    }
    // if (token) {
    //    history.push("/dashboard");
    // } else {
    //   // history.push("/login");
    // }
  }, [user, errors]);

  return (
    <>
      <div className="pattern">
        <span className="orange"></span>
        <span className="orange"></span>
        <span className="orange"></span>
        <span className="orange"></span>
        <span className="orange"></span>
      </div>
      <div className="auth-main particles_js ">
        <div className="auth_div vivify popIn">
          <div className="auth_brand">
            {/* <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#713200",
                  fontSize: "17px",
                },
              }}
            /> */}
            <img
              src="../assets/images/AhPizzaLogo.png"
              style={{ width: 120, height: 100 }}
              className="d-inline-block align-top mr-2"
              alt="Brappy"
            />
          </div>
          <div className="card">
            <div className="body">
              <p className="lead">Login to your account</p>

              <form
                className="form-auth-small m-t-20"
                action="/"
                onSubmit={userLogin}
              >
                <div className="form-group">
                  <label
                    htmlFor="signin-email"
                    className="control-label sr-only"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control round"
                    id="signin-email"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleInputs}
                    style={{ color: "grey" }}
                  />
                  <input
                    type="hidden"
                    name="user_device_token"
                    value={state.user_device_token}
                    id="user_device_token"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="signin-password"
                    className="control-label sr-only"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control round"
                    id="signin-password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleInputs}
                    style={{ color: "grey" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-round btn-block"
                  style={{ backgroundColor: "#952B23", color: "white" }}
                >
                  LOGIN
                  {/* {loading ? (
                    <Spinner animation="border" variant="warning" size="sm" />
                  ) : (
                    "LOGIN"
                  )} */}
                </button>

                <div className="bottom">
                  <span className="helper-text m-b-10">
                    <i className="fa fa-lock"></i>{" "}
                    <Link to="/forgotpassword" style={{ color: "grey" }}>
                      Forgot password?
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="particles-js"></div>
      </div>
    </>
  );
};

export default Login;
