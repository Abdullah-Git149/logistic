import UserList from "./Admin/UserList";
import SellerList from "./Admin/SellerList";
// import UserDetails from "./Admin/UserDetails";

import Dashboard from "./Dashboard/dashboard";

import PP from "./Admin/PP";
import TC from "./Admin/TC";
// import HS from "./Admin/HS";
import Notifications from "./Admin/Notification";

// import ListUser from "./Users/userList";

const Routes = [
  {
    path: "/customer-list",
    name: "Customer List",
    exact: true,
    pageTitle: "Customer List",
    // isPrivate: true,
    component: UserList,
  },

  {
    path: "/seller-list",
    name: "Seller List",
    exact: true,
    pageTitle: "Seller List",
    // isPrivate: true,
    component: SellerList,
  },

  // {
  //   path: "/change-password",
  //   // name: "User Details",
  //   exact: true,
  //   // pageTitle: "User Details",
  //   // isPrivate: true,
  //   // component: UserDetails,
  // },

  {
    path: "/contents/pp",
    name: "Privacy Policy",
    exact: true,
    pageTitle: "Privacy Policy",
    // isPrivate: true,
    component: PP,
  },
  {
    path: "/contents/tc",
    name: "Terms & Condition",
    exact: true,
    pageTitle: "Terms & Condition",
    // isPrivate: true,
    component: TC,
  },
  // {
  //   path: "/contents/hs",
  //   name: "Help & Support",
  //   exact: true,
  //   pageTitle: "Help & Support",
  //   // isPrivate: true,
  //   component: HS,
  // },
  {
    path: "/notifications",
    name: "Notifications",
    exact: true,
    pageTitle: "Notifications",
    // isPrivate: true,
    component: Notifications,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    exact: true,
    pageTitle: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/",
    name: "",
    pageTitle: "Dashboard",
    component: Dashboard,
  },
];

export default Routes;
