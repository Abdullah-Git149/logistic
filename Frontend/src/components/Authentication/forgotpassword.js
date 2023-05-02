import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {useHistory } from 'react-router-dom';
import toast from "react-hot-toast";
import { passwordSave } from "../../actions/userAction";

const ForgotPassword = () => {
  // const history = useHistory();

  const dispatch = useDispatch();
  const { passwordUpdate } = useSelector((state) => state.userReducer);

  //  console.log(loginErrors , "reducer")
  const [state, setState] = useState({
    email: "",
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });

    // console.log(state);
  };

  //   // Update pp
  const postData = async (e) => {
    e.preventDefault();
    // console.log(state);
    dispatch(passwordSave(state));
  };

  useEffect(() => {
    if (passwordUpdate) {
      console.log(passwordUpdate);
      toast.success(passwordUpdate);
      setState({
        email: "",
      });
      dispatch({ type: "RESET_MESSAGE" });

      // history.push('/login');
    }
  }, [passwordUpdate]);

  return (
    <>
      <div className="pattern">
        <span className="orange"></span>
        <span className="orange"></span>
        <span className="orange"></span>
        <span className="orange"></span>
        <span className="orange"></span>
      </div>
      <div className="auth-main particles_js">
        <div className="auth_div vivify popIn">
          <div className="auth_brand">
            <img
              src="../assets/images/AhPizzaLogo.png"
              style={{ width: 120, height: 100 }}
              className="d-inline-block align-top mr-2"
              alt="Brappy"
            />
          </div>
          <div className="card forgot-pass">
            <div className="body">
              <p className="lead mb-3"> forgot something?</p>
              <p>Type email to recover password.</p>
              <form className="form-auth-small" onSubmit={postData}>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    className="form-control round"
                    onChange={handleInput}
                    value={state.email}
                    placeholder="Email"
                    style={{ color: "grey" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-round btn-block"
                  style={{ backgroundColor: "#952B23", color: "white" }}
                >
                  RESET PASSWORD
                </button>
                <div className="bottom">
                  <span className="helper-text">
                    Know your password?{" "}
                    <Link to="/login" style={{ color: "grey" }}>
                      Login
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

export default ForgotPassword;
