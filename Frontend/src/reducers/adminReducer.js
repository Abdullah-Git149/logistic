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

const initState = {
  errors: [],
  loading: false,
  regeisterErrors: [],
  loginErrors: [],
  token: "",
  userList: [],
  sellerList: [],
  user: "",
  notification: "",
};

const agencyReducer = (state = initState, action) => {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        userList: [...action.payload],
        agencySaved: "",
        errors: "",
        blockuser: "",
        unBlockUser: "",
      };
    case ALL_SELLERS:
      return {
        ...state,
        sellerList: [...action.payload],
        errors: "",
        blockuser: "",
        unBlockUser: "",
      };

    case USER_DETAILS:
      return { ...state, userDetail: action.payload };

    case BLOCK_USER:
      return { ...state, blockuser: action.payload };

    case UNBLOCK_USER:
      return { ...state, unBlockUser: action.payload };

    case DASHBAORD_DATA:
      return { ...state, getDashbaord: action.payload };

    case PP:
      return {
        ...state,
        privacyPol: action.payload,
        errors: "",
        ppUpdate: "",
        tcUpdate: "",
      };

    case TC:
      return {
        ...state,
        privacyTCL: action.payload,
        errors: "",
        ppUpdate: "",
        tcUpdate: "",
      };
    case HS:
      return {
        ...state,
        helpSupports: action.payload,
        errors: "",
        hsUpdate: "",
      };

    case UPDATE_PP:
      return {
        ...state,
        ppUpdate: action.payload,
        errors: "",
        privacyPol: "",
        tcUpdate: "",
      };

    case UPDATE_TC:
      return {
        ...state,
        tcUpdate: action.payload,
        errors: "",
        privacyPol: "",
        ppUpdate: "",
      };
    case UPDATE_HS:
      return {
        ...state,
        hsUpdate: action.payload,
        errors: "",
        helpSupports: "",
      };

    case SEND_NOTIFICATIONS:
      return {
        ...state,
        notification: action.payload,
        errors: "",
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        updatePassword: action.payload,
        errors: "",
      };

    case ERROR_AGENCY:
      return { ...state, errors: action.payload };

    default:
      return state;
  }
};

export default agencyReducer;
