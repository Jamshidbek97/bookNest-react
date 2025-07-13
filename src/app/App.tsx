import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomeNavbar from "./components/headers/HomeNavbar";

import "../css/app.css";
import "../css/navbar.css";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : "OtherNavbar"}
      <Switch>
        <Route path="/products">ProductsPage</Route>
        <Route path="/orders">OrderPage</Route>
        <Route path="/member-page">UserPage</Route>
        <Route path="/help">HelpPage</Route>
        <Route path="/">HomePage</Route>
      </Switch>
      Footer
    </>
  );
}

export default App;
