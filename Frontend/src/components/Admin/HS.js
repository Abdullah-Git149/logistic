import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { helpSupport, updatedHS } from "../../actions/adminAction";
import TextField from "@material-ui/core/TextField";

const HS = (props) => {
  const dispatch = useDispatch();

  const { helpSupports, hsUpdate } = useSelector(
    (state) => state.agencyReducer
  );
  const [state, setState] = useState({
    content: "Please Write ",
  });

  const saveNote = async (e) => {
    e.preventDefault();
    console.log("here type", state);
    //state.id = edit ? edit: '';
    dispatch(updatedHS(state));
  };

  useEffect(() => {
    //    dispatch(privacyPo(ppm));
    dispatch(helpSupport());
    //updateContent();
  }, [hsUpdate]);

  useEffect(() => {
    if (helpSupports != undefined) {
      setState({
        ...state,
        content: helpSupports.content,
      });
    }
  }, [helpSupports]);

  const updateContent = (newContent) => {
    setState({
      content: newContent,
    });
  };

  const onChange = (e) => {
    setState({
      content: e.target.value,
    });
  };
  // Update pp
  useEffect(() => {
    if (hsUpdate) {
      toast.success(hsUpdate.message);
      setState({
        content: "",
      });
    }
  }, [hsUpdate]);

  return (
    <>
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-12">
              <h2>Help & Support</h2>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <Toaster
            position="top-centre"
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

          <div className="col-xl-8 col-lg-8 col-md-7">
            <form onSubmit={saveNote}>
              <div className="card">
                <div className="body">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        {/* <input type="hidden" name="content_type" value={state.content_type} /> */}
                        {/* <label style={{ color: '#952B23' }}>Privacy Policy</label> */}
                        {/* <CKEditor
                                                content={state.content_content}
                                                events={{
                                                    "change": onChange
                                                }}
                                            /> */}
                        <TextField
                          onChange={(e) => onChange(e)}
                          value={state.content}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="content"
                          label="Help & Support"
                          multiline
                          rows={10}
                          maxWidth
                          style={{ width: 395 }}
                          name="content"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-round btn-primary mr-1"
                    style={{ backgroundColor: "rgb(23 8 60 / 93%)" }}
                  >
                    Save
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
export default HS;
