import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomeNavbar from "./components/headers/HomeNavbar";
import Footer from "./components/footer";
import OtherNavbar from "./components/headers/OtherNavbar";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productPage";
import HelpPage from "./screens/helpPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">OrderPage</Route>
        <Route path="/member-page">UserPage</Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
