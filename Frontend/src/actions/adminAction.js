import axios from "axios";
import toast from "react-hot-toast";
// import jwt_decode from "jwt-decode";
import {
  ERROR_AGENCY,
  ALL_USERS,
  ALL_SELLERS,
  PP,
  TC,
  HS,
  UPDATE_PP,
  UPDATE_TC,
  UPDATE_HS,
  DASHBAORD_DATA,
  USER_DETAILS,
  UNBLOCK_USER,
  BLOCK_USER,
  SEND_NOTIFICATIONS,
  UPDATE_PASSWORD,
} from "../constents/constents";
// const cookies = new Cookies();

// here to get All Users
export const allUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + "/admin/customers"
    );
    console.log("action", data);

    const userList = data.data.customers;
    dispatch({ type: ALL_USERS, payload: userList });
  } catch (error) {
    dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
  }
};

export const allSellers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + "/admin/sellers"
    );
    console.log("action", data);

    const sellerList = data.data.sellers;
    dispatch({ type: ALL_SELLERS, payload: sellerList });
  } catch (error) {
    dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
  }
};


export const userDetails = (user_id) => {
  return async (dispatch) => {
    try {
      // const { branchEdit }
      //  = await axios.get(`/admin/dashboard/users/${user_id}`);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/admin/user/${user_id}`
      );
      console.log("userID data", data);
      dispatch({ type: USER_DETAILS, payload: data?.data.user });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};


export const blockUser = (user_id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("myToken")
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      await axios.post(
        process.env.REACT_APP_API_URL + `/api/admin/block-user/${user_id}`, config
      ).then((res) => {
        toast.success(res.data.message)
        console.log(res)
      }).catch((err) => {

      })


      // dispatch({ type: BLOCK_USER, payload: data });
    } catch (error) {
      // dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// Here Unblock User
export const unblockUser = (user_id) => {
  return async (dispatch) => {
    try {
      // const { data } = await axios.post(`/dashboard/blockUser/${user_id}`);
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + `/admin/UnblockUser/${user_id}`
      );
      console.log(data);
      dispatch({ type: UNBLOCK_USER, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// notifications
export const notifications = (state) => {
  return async (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      // const { data } = await axios.post("/admin/updateContent", state, config);
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/admin/notifications",
        state
      );
      console.log("action data==>", data.message);
      toast.success(data.message);
      dispatch({ type: SEND_NOTIFICATIONS, payload: data.message });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// Update Password
export const update_Password = (state) => {
  return async (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      // const { data } = await axios.post("/admin/updateContent", state, config);
      console.log(state);
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/admin/updatePassword",
        state
      );
      console.log("action data==>", data.message);
      toast.success(data.message);
      dispatch({ type: UPDATE_PASSWORD, payload: data.message });
    } catch (error) {
      //  console.log(error.response.data.message)
      toast.error(error.response.data.message);
      // dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// Here to Get Datshboar Data
export const dashbaordData = () => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // const { data } = await axios.get("/admin/dashboard");
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/admin/dashboard",
        config
      );
      console.log("dash", data);
      dispatch({ type: DASHBAORD_DATA, payload: data.data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// get pp
export const privacyPo = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/api/admin/getTcPp`
      );
      console.log("==>", data)
      // dispatch({ type: PP, payload: data.data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.mesage });
    }
  };
};

// For upated pp
export const updatedPP = (state) => {
  return async (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      // const { data } = await axios.post("/admin/updateContent", state, config);
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/admin/content/privacy_policy",
        state
      );
      console.log(data);
      dispatch({ type: UPDATE_PP, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// get tc
export const privacyTc = () => {
  return async (dispatch) => {
    try {
      // const {
      //   data: { data },
      // } = await axios.get(`/admin/content?content_type=${content_type}`);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/admin/content/terms_and_conditions`
      );

      dispatch({ type: TC, payload: data.data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// For upated tc
export const updatedTC = (state) => {
  return async (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      // const { data } = await axios.post("/admin/updateContentTc", state, config);
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/admin/content/terms_and_conditions",
        state
      );

      dispatch({ type: UPDATE_TC, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

// get hs
export const helpSupport = () => {
  return async (dispatch) => {
    try {
      // const {
      //   data: { data },
      // } = await axios.get(`/admin//dashboard/content/privacy_policy/${content_type}`);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL +
        `/admin/dashboard/content/help_and_support`
      );
      // console.log(data.data)
      dispatch({ type: HS, payload: data.data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.mesage });
    }
  };
};

// For upated hs
export const updatedHS = (state) => {
  return async (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      // const { data } = await axios.post("/admin/updateContent", state, config);
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL +
        "/admin/dashboard/content/help_and_support",
        state
      );
      console.log(data);
      dispatch({ type: UPDATE_HS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};
