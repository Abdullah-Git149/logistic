import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
import { notifications } from "../../actions/adminAction";
import TextField from "@material-ui/core/TextField";

const Notification = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    message: "",
  });

  const { notification } = useSelector((state) => state.agencyReducer);
  console.log("===>", notification);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });

    // console.log(state);
  };

  // useEffect(() => {
  //   if (privacyPol != undefined) {
  //     setState({
  //       ...state,
  //       content: privacyPol.content,
  //     });
  //   }
  // }, [privacyPol]);

  //   // Update pp
  const saveNote = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(notifications(state));
    setState({
      title: "",
      message: "",
    });
  };
  // useEffect(() => {
  //   if (notification != undefined) {
  //     // toast.success(notification);

  //   }
  // }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-12">
              <h2>Notifications</h2>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-8 col-lg-8 col-md-7">
            <form onSubmit={saveNote}>
              <div className="card">
                <div className="body">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <TextField
                          onChange={(e) => onChange(e)}
                          value={state.title}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          label="Title"
                          name="title"
                        />
                        <TextField
                          onChange={(e) => onChange(e)}
                          value={state.message}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="message"
                          label="Message"
                          multiline
                          rows={8}
                          name="message"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-round mr-1"
                    style={{ backgroundColor: "#FF7F00", color: "white" }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notification;
