import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Topbar from "./components/Topbar";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import Signup from "./Signup";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Switch>
          <Route exact path={"/"} component={Landing} />
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/dashboard"} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
