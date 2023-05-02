// import React, { useEffect, useState } from "react";
// import { Route } from "react-router-dom";
// import { Redirect } from "react-router";
// import Cookies from "universal-cookie";
// // import instance from "../Config/axios";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../reduxState/aciton/authAction";
// // import { makeStyles } from '@material-ui/core/styles';
// import { Grid } from "@material-ui/core";

// const cookies = new Cookies();

// const instance = axios.create({
//   // your url
//   //baseURL: "http://localhost:8000",
// });

// // Set the AUTH token for any request
// instance.interceptors.request.use(function (config) {
//   const token = cookies.get("token");

//   if (token) {
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//   }
//   return config;
// });

// // const useStyles = makeStyles((theme) => ({
// // 	loaderContainer: {
// // 		position: 'absolute',
// // 		top: '40vh',
// // 		left: '50%',
// // 	},
// // 	loader: {
// // 		background: 'green',
// // 		color: 'green',
// // 	},
// // }));

// async function checkTokenValidity() {
//   try {
//     // check if token is valid by calling api and remove token from cookies

//     let data = false;
//     await instance.get(`/api/doctors/isdoctor`).then((x) => {
//       if (x.status === 200) {
//         data = true;
//       }
//     });

//     return data;
//   } catch (error) {
//     cookies.remove("token");
//     //console.log(error);
//     return false;
//   }
// }

// export const AuthRoute = ({ element: Component, path, ...rest }) => {
//   const [auth, setAuth] = useState(false);
//   const [isTokenValidated, setIsTokenValidated] = useState(false);
//   let token = cookies.get("token");

//   // console.log('Auth called')

//   if (!token) {
//     return <Route path={path} element={Component} />;
//   } else {
//     checkTokenValidity().then((isTokenValid) => {
//       if (isTokenValid) {
//         setAuth(true);
//       } else {
//         cookies.remove("token");
//       }
//       setIsTokenValidated(true);
//     });
//   }

//   if (!isTokenValidated) {
//     return (
//       <Grid item container alignItems="center" justify="center">
//         {/* Loader */}
//       </Grid>
//     );
//   } // or some kind of loading animation

//   if (auth) {
//     // return <Redirect to="/dashboard" replace />;
//     // return <Navigate to="/dashboard" />;
//   } else {
//     return <Route path={path} element={Component} />;
//   }
// };

// export const PrivateRoute = ({ component, path, isAdmin, ...props }) => {
//   const dispatch = useDispatch();
//   // const location = useLocation()
//   const [auth, setAuth] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isAdminState, setIsAdminState] = useState(false);
//   const [isTokenValidated, setIsTokenValidated] = useState(false);
//   // const [isAgreed, setIsAgreed] = useState(false)

//   useEffect(() => {
//     // console.log({ ...props });
//     let token = cookies.get("token");
//     // let token = localStorage.getItem("myToken");
//     let userInfoData = cookies.get("userData");
//     //console.log(userInfoData, "user info data");
//     if (token && userInfoData) {
//       // send jwt to API to see if it's valid
//       try {
//         instance
//           .get(`/api/verify-token`)
//           .then((res) => {
//             // setAuth(true);
//             // setIsTokenValidated(true);
//             // setIsAuthorized(true);
//             if (isAdmin) {
//               if (userInfoData.isAdmin) {
//                 setIsAuthorized(true);
//               }
//               setAuth(true);
//               setIsTokenValidated(true);
//             } else {
//               setAuth(true);
//               setIsTokenValidated(true);
//             }
//             setIsAdminState(isAdmin);
//           })
//           .catch((err) => {
//             // dispatch(logout());
//             setAuth(false);
//             setIsTokenValidated(true);
//           });
//       } catch (err) {
//         // dispatch(logout());
//         setAuth(false);
//         setIsTokenValidated(true);
//       }
//     } else {
//       setIsTokenValidated(true); // in case there is no token
//     }
//   }, []);

//   if (!isTokenValidated) {
//     return (
//       <Grid item container alignItems="center" justify="center">
//         Loading.......
//         {/* your Loader
//          */}
//       </Grid>
//     );
//   } // or some kind of loading animation

//   // console.log(isAuthorized, "authorized");
//   // console.log(isAdmin, "isAdmin");
//   // console.log(isAdminState, "isAdminState");
//   if (auth) {
//     if (isAdminState) {
//       if (isAuthorized) {
//         return <Route path={path} component={component} />;
//       } else {
//         return <Route path={path} component={component} />;
//         // return <Redirect to="/dashboard/not-authorized" replace />
//         // return <Navigate to="/dashboard/not-authorized" />;
//       }
//     } else {
//       return <Route path={path} component={component} />;
//     }

//     // return <Navigate to="/agreement" replace />
//   } else {
//     //     (function() {

//     // history.push('/login')

//     //   })();
//     // return <Redirect to="/login" replace />;

//     // return <Navigate to="/login" replace />;
//   }
// };

// const ButtonToNavigate = ({ title, history }) => (
//   <button type="button" onClick={() => history.push("/my-new-location")}>
//     {title}
//   </button>
// );
