import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { privacyPo, termsCon, updatedPP } from "../../actions/userAction";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
const TC = (props) => {
  const dispatch = useDispatch();
  const { privacyPol, privacyPolicyData, termAndConData, ppUpdate } = useSelector((state) => state.userReducer);
  console.log("pri", privacyPolicyData);
  const [state, setState] = useState({
    pp: "pp",
    content: "Please Write ",
  });

  const [termCondition, settermCondition] = useState()
  const saveNote = async (e) => {
    e.preventDefault()

    console.log("==>", termCondition)

    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    try {
      const data = { "termCondition": termCondition }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/TcPp`, data, config)
      toast.success(response?.data?.message)

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    const getTc = async () => {
      try {
        const data = await axios.get(
          process.env.REACT_APP_API_URL + `/api/admin/getTcPp`
        )
        console.log("==>", data?.data?.tcAndPp?.termCondition)
        settermCondition(data?.data?.tcAndPp?.termCondition)
      } catch (err) {
        console.log(err)
      }
    }
    getTc()
  }, []);




  return (
    <>
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-12">
              <h2>Terms & Conditions</h2>
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
                        {/* <TextField
                          onChange={(e) => onChange(e)}
                          value={privacyPolicyData}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="content"
                          label="Privacy Policy"
                          multiline
                          rows={10}
                          maxWidth
                          style={{ width: 395 }}
                          name="content"
                        /> */}

                        <textarea defaultValue={termAndConData ? termAndConData : termCondition} rows="50" cols="100" onChange={(e) => settermCondition(e.target.value)}  ></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-round mr-1"
                    style={{ backgroundColor: "#FF7F00", color: "white" }}
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
export default TC;
