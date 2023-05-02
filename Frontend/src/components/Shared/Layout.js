import React, { Component } from "react";
import { Route, Routes, Switch , BrowserRouter, Outlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import ThemeSetting from "./ThemeSetting";
import Searchbar from "./Searchbar";
import Rightbar from "./Rightbar";
import Megamenu from "./Megamenu";
import Routess from "../Route";
import { PrivateRoute } from "../customRouter";

export default class Layout extends Component {
  render() {
    return (
      <>
     
        {/* <ThemeSetting /> */}
      <div className="overlay" />
        <div id="wrapper">
          <Header />
          <Searchbar />
          <Megamenu />
          <Rightbar />
          <Menu {...this.props} />
          <div id="main-content">
            <Routes>
              {Routess.map((layout, i) => {
                if (layout.isPrivate) {
                  return (
                    <PrivateRoute
                      key={`r${i}`}
                      exact={layout.exact}
                      path={layout.path}
                      isAdmin={true}
                      component={layout.component}
                    />
                  );
                }
                return (
                  <Route
                    key={`r${i}`}
                    exact={layout.exact}
                    path={layout.path}
                    component={layout.component}
                  ></Route>
                );
              })}
            </Routes>
            <Outlet />
          </div>
        </div>
    
      </>
    );
  }
}
