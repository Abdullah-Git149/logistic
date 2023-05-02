import axios from "axios";
import instance from "../components/Config/axios";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_LIST,
  USER_LIST_FAIL,
  USER_EDIT,
  USER_CHANGE_PASSWORD,
  DASHBAORD_DATA,
  USER_APPROVAL,
  PP,
  TC,
} from "../constents/constents";


const cookies = new Cookies();

export const signin = (state) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const data = await axios.post(
        process.env.REACT_APP_API_URL + "/api/admin/sign-in",
        state,
        config
      );
      localStorage.setItem('myToken', data?.data?.data)
      localStorage.setItem('userData', data?.data?.admin)

      const user = data?.data?.admin;
      const token = data?.data?.data;

      toast.success(data?.data?.message);


      dispatch({ type: USER_SIGNIN_SUCCESS, payload: user, token });


    } catch (error) {
      // dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data });
      toast.error(error?.response?.data?.msg);
      // console.log(error.response.data.msg)
    }
  };
};

// Update Password
export const update_Password = (state) => {
  return async (dispatch) => {

    try {
      const token = localStorage.getItem("myToken")
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      await axios.post(
        process.env.REACT_APP_API_URL + "/api/admin/update-password",
        state,
        config
      ).then((response) => {
        console.log(response.data.message)
        toast.success(response?.data?.message)
      }).catch((err) => {
        console.log(err?.response)
        toast.error(err?.response?.data?.message)
      })
      // console.log("action data==>", data.message);
      // toast.success(data.message);
      // dispatch({ type: "UPDATE_PASSWORD", payload: data.message });
    } catch (error) {
      //  console.log(error.response.data.message)
      toast.error(error.response.data.message);
      // dispatch({ type: ERROR_AGENCY, payload: error.response.data.message });
    }
  };
};

export const userlistt = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/user-list`, config)
    var users = data?.data?.users


    dispatch({ type: USER_LIST, payload: users });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const orderList = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/order-list`, config);




    var orders = data?.data?.orders


    dispatch({ type: "ORDER_LIST", payload: orders });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};
export const listOfRestaurant = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    await axios.get(process.env.REACT_APP_API_URL + `/api/admin/all-restaurant`, config).then((res) => {
      var restaurant = res?.data?.restaurat
      dispatch({ type: "RESTAURANT_LIST", payload: restaurant });
    }).catch((err) => {
      toast.error(err.response.message)
    })



  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const delete_restraunt = (resId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/delete-restraunt/${resId}`, config);
    toast.success(data?.data?.message)

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};
export const delete_product = (productId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/product-delete/${productId}`, config);
    // toast.success(data?.data?.message)
    console.log(data)

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};


export const dashboardData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/dashboard-data`, config);
    var dashboard = data?.data
    dispatch({ type: "DASHBOARD", payload: dashboard });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};

export const eventListData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/event-list`, config);
    var eventList = data?.data?.events
    dispatch({ type: "EVENT_LIST", payload: eventList });
  } catch (error) {
    dispatch({ type: "EVENT_LIST", payload: [] });
    // dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};

export const eventDetailData = (eventId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/event-detail/${eventId}`, config);

    var eventDetail = data?.data?.event
    dispatch({ type: "EVENT_DETAIL", payload: eventDetail });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const onsiteDetailData = (onsiteId) => async (dispatch) => {
  try {

    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/onsite-detail/${onsiteId}`, config);


    var packageDetail = data?.data?.package
    dispatch({ type: "PACKAGE_DETAIL", payload: packageDetail });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};



export const updateEvent = (state) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.post(process.env.REACT_APP_API_URL + `/api/admin/event-edit`, state, config);


  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};
export const updateRestraunt = (state) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.post(process.env.REACT_APP_API_URL + `/api/admin/update-restraunt`, state, config);
    toast.success(data?.data?.message)

  } catch (error) {
    console.log(error?.response)
    dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};


export const updateProduct = (state, productId) => async (dispatch) => {
  try {


    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.post(process.env.REACT_APP_API_URL + `/api/admin/edit-product/${productId}`, state);
    toast.success(data?.data?.message)
  } catch (error) {
    console.log(error?.response)
    dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};

export const uploadProduct = (state) => async (dispatch) => {
  try {

    var formdata = new FormData()

    formdata.append("productName", state.productName)
    formdata.append("productDescription", state.productDescription)
    formdata.append("productPrice", state.productPrice)
    formdata.append("category", state.category)
    formdata.append("subCategory", state.subCategory)
    formdata.append("productImage", state.productImage)

    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/add-product/${state.restraunt}`, formdata, config).then((response) => {
      console.log(response)
      toast.success(response.data.message)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })


  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const newsListData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/news-list`, config);


    var newsList = data?.data?.news
    dispatch({ type: "NEWS_LIST", payload: newsList });
  } catch (error) {
    dispatch({ type: "NEWS_LIST", payload: [] });
    // dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const newsDetailData = (newsId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/news-detail/${newsId}`, config);


    var newsDetail = data?.data?.news
    dispatch({ type: "NEWS_DETAIL", payload: newsDetail });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const updateNews = (state) => async (dispatch) => {
  try {

    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }


    const data = await axios.post(process.env.REACT_APP_API_URL + `/api/admin/news-edit`, state, config);
    toast.success(data.data.message)

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const onsiteListData = () => async (dispatch) => {
  try {

    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }


    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/onsite-list`, config);


    var onsiteList = data?.data?.package
    dispatch({ type: "ONSITE_LIST", payload: onsiteList });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};


export const OffsiteListData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/menu-list`, config);

    var menuList = data?.data?.menu
    dispatch({ type: "MENU_LIST", payload: menuList });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};

export const offSiteDetailData = (offsiteId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/menu-detail/${offsiteId}`, config);

    var menuDetail = data?.data?.menu
    dispatch({ type: "MENU_DETAIL", payload: menuDetail });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error?.response?.data?.error });
  }
};

export const updateMenu = (state) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.post(process.env.REACT_APP_API_URL + `/api/admin/menu-edit`, state, config);
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};
export const uploadMenu = (state) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.post(process.env.REACT_APP_API_URL + `/api/admin/create-menu`, state, config);
    console.log(data?.data?.message)
    toast.success(data.data?.message)
  } catch (error) {
    // dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
    toast.error(error.response.data.message)
  }
};
export const uploadEvent = (state) => async (dispatch) => {
  try {

    console.log("pp", state)
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/create-event`, state, config).then((res) => {

      toast.success(res?.data?.message)
    }).catch((err) => {

      toast.error(err?.response?.data?.message)
    })
  } catch (error) {
    // dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const uploadPackage = (state) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.post(process.env.REACT_APP_API_URL + `/api/admin/create-package`, state, config);
    toast.success(data?.data?.message)
  } catch (error) {
    toast.error(error?.response?.data?.message)

    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const orderDetailData = (orderId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.get(process.env.REACT_APP_API_URL + `/api/admin/order-detail/${orderId}`, config).then((res) => {

      dispatch({ type: "ORDER_DETAIL", payload: res?.data?.order });
    }).catch((err) => {
      console.log(err)
    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const userDetailData = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.get(process.env.REACT_APP_API_URL + `/api/admin/user-detail/${id}`, config).then((res) => {

      dispatch({ type: "USER_DETAIL", payload: res?.data?.user });
    }).catch((err) => {
      console.log(err)
    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const productListData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.get(process.env.REACT_APP_API_URL + `/api/admin/list-of-products`, config).then((res) => {
      console.log(res?.data?.products)
      dispatch({ type: "PRODUCT_LIST", payload: res?.data?.products });
    }).catch((err) => {
      console.log(err)
    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};


export const restrauntDetailData = (resId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.get(process.env.REACT_APP_API_URL + `/api/admin/restaurant-detail/${resId}`, config).then((res) => {
      dispatch({ type: "RESTRAUNT_DETAIL", payload: res?.data?.restraunt });
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const orderStatusAction = (state) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/update-order-status/${state.orderId}`, state, config).then((res) => {
      dispatch({ type: "ORDER_DETAIL", payload: res?.data?.order });
      toast.success(res?.data?.message)
    }).catch((err) => {
      console.log(err)
    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};
export const saveNewsAction = (state) => async (dispatch) => {
  try {
    console.log("state", state)
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/create-news`, state, config).then((res) => {
      // dispatch({ type: "ORDER_DETAIL", payload: res?.data?.order });
      console.log(res)
      toast.success(res?.data?.message)
    }).catch((err) => {
      toast.error(err?.data?.message)
    })
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};


export const saveRestaurantAction = (name, address, city, restaurantState, description, lat, long, restaurantImage) => async (dispatch) => {
  try {
    console.log("==>", restaurantImage)
    var formdata = new FormData()
    formdata.append("name", name)
    formdata.append("address", address)
    formdata.append("city", city)
    formdata.append("state", restaurantState)
    formdata.append("description", description)
    formdata.append("lat", lat)
    formdata.append("long", long)
    formdata.append("restaurantImage", restaurantImage)


    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/add-restaurant`, formdata, config).then((res) => {

      toast.success(res?.data?.message)
    }).catch((err) => {
      console.log(err)
    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};
export const blockUser = (user_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(
      process.env.REACT_APP_API_URL + `/api/admin/block-user/${user_id}`, null, config
    ).then((res) => {
      toast.success(res.data.message)
      console.log(res)
    }).catch((err) => {

    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const unblockUser = (user_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(
      process.env.REACT_APP_API_URL + `/api/admin/unblock-user/${user_id}`, null, config
    ).then((res) => {
      toast.success(res.data.message)
      console.log(res)
    }).catch((err) => {

    })

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};


// get pp
export const privacyPo = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/api/admin/getTcPp`
      );
      dispatch({ type: PP, payload: data?.tcAndPp?.privacyPolicy });
    } catch (error) {
      dispatch({ type: "ERROR_AGENCY", payload: error?.response?.data?.mesage });
    }
  };
};

// get tc
export const termsCon = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/api/admin/getTcPp`
      );
      console.log("hey", data?.tcAndPp?.termCondition)
      dispatch({ type: TC, payload: data?.tcAndPp?.termCondition });

    } catch (error) {
      dispatch({ type: "ERROR_AGENCY", payload: error?.response?.data?.mesage });
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
      dispatch({ type: "UPDATE_PP", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR_AGENCY", payload: error.response.data.message });
    }
  };
};




// For Get for Edit user
export const getUserById = (userId) => {
  return async (dispatch) => {
    try {
      const {
        data: { getUser, getFamilyInfo, getEmploymentInfo, getEducationInfo },
      } = await instance.get(`/admin/userEdit/${userId}`);
      // const { data: { getUser, getFamilyInfo, getEmploymentInfo, getEducationInfo } } = await instance.get(process.env.REACT_APP_API_URL + `/admin/userEdit/${userId}`);

      dispatch({
        type: USER_EDIT,
        payload: {
          getUser,
          getFamilyInfo,
          getEmploymentInfo,
          getEducationInfo,
        },
      });
    } catch (error) {
      dispatch({ type: USER_LIST_FAIL, payload: error.response.data.error });
    }
  };
};

// Here update the user Password
export const passwordSave = (state) => {
  return async (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      // const { data } = await axios.post("/admin/passwordChange", state, config);
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/admin/changePassword",
        state
      );

      dispatch({ type: USER_CHANGE_PASSWORD, payload: data.message });
      // toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      // dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data });
    }
  };
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('myToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('user_device_token');
  // cookies.remove("token");
  // cookies.remove("userData");
  dispatch({ type: USER_SIGNOUT });
};

// here to get Alla user


// Here to Get Datshboar Data
// export const dashbaordData = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get("/admin/dashboard");
//       // const { data } = await axios.get(process.env.REACT_APP_API_URL + '/admin/dashboard');

//       dispatch({ type: DASHBAORD_DATA, payload: data });
//     } catch (error) {
//       dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
//     }
//   };
// };

// Here Admin Approval
export const adminApproval = (user_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/admin/adminApproval/${user_id}`);
      // const { data } = await axios.get(process.env.REACT_APP_API_URL + `/admin/adminApproval/${user_id}`);

      dispatch({ type: USER_APPROVAL, payload: data });
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
    }
  };
};


// logisitc 



export const pumpList = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/list-of-pumps`, config)
    // var users = data?.data?.users

    console.log(data?.data?.data)


    dispatch({ type: "PUMP_LIST", payload: data?.data?.data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};


export const trucklistAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/list-of-trucks`, config)
    // var users = data?.data?.users

    console.log(data?.data?.data)


    dispatch({ type: "TRUCK_LIST", payload: data?.data?.data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const driverListAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await axios.get(process.env.REACT_APP_API_URL + `/api/admin/list-of-drivers`, config)

    console.log(data?.data?.data)


    dispatch({ type: "DRIVER_LIST", payload: data?.data?.data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const savePumpAction = (state) => async (dispatch) => {
  try {
    console.log("state", state)
   
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/create-pump`, state).then((res) => {
       console.log(res)
      toast.success(res?.data?.message)
    }).catch((err) => {
      toast.error(err?.data?.message)
    })
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};


export const saveTruckAction = (state) => async (dispatch) => {
  try {
     
   
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/create-truck`, state).then((res) => {
       toast.success(res?.data?.message)
    }).catch((err) => {
      toast.error(err?.data?.message)
    })
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};
export const saveDriverAction = (state) => async (dispatch) => {
  try {
    const token = localStorage.getItem("myToken")
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await axios.post(process.env.REACT_APP_API_URL + `/api/admin/create-driver`, state).then((res) => {
       toast.success(res?.data?.message)
    }).catch((err) => {
      toast.error(err?.data?.message)
    })
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};