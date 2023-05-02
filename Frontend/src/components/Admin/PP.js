import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { privacyPo, updatedPP } from "../../actions/userAction";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
const PP = (props) => {
  const dispatch = useDispatch();
  const { privacyPol, privacyPolicyData, ppUpdate } = useSelector((state) => state.userReducer);
  console.log("pri", privacyPolicyData);
  const [state, setState] = useState({
    pp: "pp",
    content: "Please Write ",
  });

  const [privacyPolicy, setprivacyPolicy] = useState()
  const saveNote = async (e) => {
    e.preventDefault()

    console.log("==>", privacyPolicy)

    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    try {
      const data = { "privacyPolicy": privacyPolicy }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/TcPp`, data, config)
      toast.success(response?.data?.message)
      console.log(response)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    const getPp = async () => {
      try {
        const data = await axios.get(
          process.env.REACT_APP_API_URL + `/api/admin/getTcPp`
        )
        console.log("==>", data?.data?.tcAndPp?.privacyPolicy)
        setprivacyPolicy(data?.data?.tcAndPp?.privacyPolicy)
      } catch (err) {
        console.log(err)
      }
    }
    getPp()
    // dispatch(privacyPo());
    // setprivacyPolicy(privacyPolicyData)

  }, []);


  return (
    <>
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-12">
              <h2>Privacy Policy</h2>
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

                        <textarea defaultValue={privacyPolicyData ? privacyPolicyData : privacyPolicy} rows="50" cols="100" onChange={(e) => setprivacyPolicy(e.target.value)}  ></textarea>
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
export default PP;
