import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_LIST,
  DASHBAORD_DATA,
  USER_CHANGE_PASSWORD,
  USER_APPROVAL,
  Nurse_List_BY_branch_ID,
  PP,
  TC,
} from "../constents/constents";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userToken = localStorage.getItem("myToken") ? cookies.get("token") : null;
const userData = localStorage.getItem("userData") ? cookies.get("userData") : null;
const initState = {
  loading: false,
  regeisterErrors: [],
  // loginErrors: "",
  token: userToken,
  user: userData,
  listOfUsers: [],
  dashboard: {},
  listOfOrders: [],
  eventList: [],
  passwordUpdate: "",
  errors: "",
  eventDetail: {},
  newsDetail: {},
  newsList: [],
  onsiteList: [],
  packageDetail: {},
  menuList: [],
  menuDetail: {},
  orderDetail: {},
  restaurant: [],
  restaurantDetail: {},
  userDetail: {},
  productList: [],
  privacyPolicyData: "",
  termAndConData: "",
  listOfPump: [],
  listOfTrucks: [],
  listOfDrivers:[]
};

// console.log("this is user data" , initState.user)
const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expiresIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("myToken");
  } else {
    return decodedToken;
  }
};
const token = localStorage.getItem("myToken");

if (token) {
  const decoded = verifyToken(token);
  initState.token = token;
  const { user } = decoded;
  initState.user = user;
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case Nurse_List_BY_branch_ID:
      return { ...state, nurseListsByAgencyId: action.payload };

    case USER_SIGNIN_SUCCESS:
      // const decoded = verifyToken(action.payload);
      // const { user } = decoded;
      // console.log("user dispatch" , user)
      return { ...state, user: action.payload, token: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, errors: action.payload };

    case "RESET_ERRORS":
      return { loading: false, errors: "" };

    case USER_SIGNOUT:
      return { ...state, token: "", user: "" };

    case USER_CHANGE_PASSWORD:
      console.log("========>", action.payload);
      return { loading: false, passwordUpdate: action.payload };

    case "RESET_MESSAGE":
      return { loading: false, passwordUpdate: "" };

    case DASHBAORD_DATA:
      return { ...state, getDashbaord: action.payload };

    case USER_APPROVAL:
      return { ...state, adminApprovalStatus: action.payload };
    case "DASHBOARD":
      return { ...state, dashboard: action.payload };
    case "EVENT_LIST":
      return { ...state, eventList: action.payload };
    case "NEWS_LIST":
      return { ...state, newsList: action.payload };
    case "EVENT_DETAIL":
      return { ...state, eventDetail: action.payload };
    case "NEWS_DETAIL":
      return { ...state, newsDetail: action.payload };
    case "ONSITE_LIST":
      return { ...state, onsiteList: action.payload };
    case "PACKAGE_DETAIL":
      return { ...state, packageDetail: action.payload };
    case "MENU_LIST":
      return { ...state, menuList: action.payload };
    case "MENU_DETAIL":
      return { ...state, menuDetail: action.payload };
    case "ORDER_DETAIL":
      return { ...state, orderDetail: action.payload };
    case "RESTAURANT_LIST":
      return { ...state, restaurant: action.payload };
    case "RESTRAUNT_DETAIL":
      return { ...state, restaurantDetail: action.payload };
    case "USER_DETAIL":
      return { ...state, userDetail: action.payload };
    case "PRODUCT_LIST":
      return { ...state, productList: action.payload };

    case USER_LIST:
      return {
        ...state,
        loading: true,
        listOfUsers: action.payload,
        adminApprovalStatus: "",
      };

    case PP:
      return { ...state, privacyPolicyData: action.payload };
    case TC:
      return { ...state, termAndConData: action.payload };
    case "ORDER_LIST":
      return {
        ...state,
        loading: true,
        listOfOrders: action.payload,
        // adminApprovalStatus: "",
      };

    case "PUMP_LIST":
      return {
        ...state,
        loading: true,
        listOfPump: action.payload
      };
    case "TRUCK_LIST":
      return {
        ...state,
        loading: true,
        listOfTrucks: action.payload
      };
    case "DRIVER_LIST":
      return {
        ...state,
        loading: true,
        listOfDrivers: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
