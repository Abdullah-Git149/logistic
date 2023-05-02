import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { update_Password } from "../../actions/userAction";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { MdVisibility, AiFillEyeInvisible } from "react-icons/all";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

const ChangePasword = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickConfirmPassword = () => setConfirmPassword(!confirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setConfirmPassword(!confirmPassword);

  const userToken = localStorage.getItem("myToken")
  const decodedToken = jwt_decode(userToken);
  const userID = decodedToken.userId;
  // console.log(decodedToken.userId)

  const [state, setState] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });

    //  console.log(state);
  };

  // Update pp
  const saveNote = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(update_Password({
      password: state.old_password,
      new_password: state.new_password,
      confirm_password: state.confirm_password
    }))
    setShow(false)
    setState({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });

  };

  return (
    <>
      {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    Open modal
  </button> */}
      <Link className="abc-item" onClick={handleShow}>
        <i className="icon-user"></i>Change Password
      </Link>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>    */}
        {/* <div className="col-xl-8 col-lg-8 col-md-7"> */}
        <form onSubmit={saveNote}>
          <div className="card">
            <div className="body">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                    <TextField
                      onChange={(e) => onChange(e)}
                      className="col-lg-12"
                      value={state.old_password}
                      variant="outlined"
                      margin="normal"
                      required
                      size="medium"
                      fullWidth
                      id="old-password"
                      label="Old Password"
                      name="old_password"
                    />

                    <TextField
                      onChange={(e) => onChange(e)}
                      value={state.new_password}
                      // type="password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      required
                      size="medium"
                      fullWidth
                      id="new-password"
                      label="New Password"
                      name="new_password"
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <MdVisibility />
                              ) : (
                                <AiFillEyeInvisible />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      onChange={(e) => onChange(e)}
                      value={state.confirm_password}
                      type={confirmPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      required
                      size="medium"
                      fullWidth
                      id="confirm-password"
                      label="Confirm Password"
                      name="confirm_password"
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                            >
                              {confirmPassword ? (
                                <MdVisibility />
                              ) : (
                                <AiFillEyeInvisible />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-round mr-1"
                style={{ backgroundColor: "#952B23", color: "white" }}
              >
                Update
              </button>
            </div>
          </div>
        </form>
        {/* </div> */}
        {/* </Modal.Body> */}
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
export default ChangePasword;
