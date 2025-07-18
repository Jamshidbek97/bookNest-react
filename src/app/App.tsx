import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomeNavbar from "./components/headers/HomeNavbar";
import Footer from "./components/footer";
import OtherNavbar from "./components/headers/OtherNavbar";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productPage";
import HelpPage from "./screens/helpPage";
import MyPage from "./screens/myPage";
import OrderPage from "./screens/orderPage";
import { useGlobals } from "./hooks/useGlobals";
import useBasket from "./hooks/useBasket";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import AuthenticationModal from "./components/auth";

type Mode = "login" | "signup";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<Mode>("login");
  const { setAuthMember } = useGlobals();
  const location = useLocation();
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = useBasket();

  const openModal = (mode: Mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  /********* Handlers **********/

  const handleLogoutRequest = async () => {
    try {
      // TODO:
    } catch (err) {
      // FIXME:
      // BUG:
      // NOTE:
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalMode={modalMode}
          setModalMode={setModalMode}

          // cartItems={cartItems}
          // onAdd={onAdd}
          // onDelete={onDelete}
          // onRemove={onRemove}
          // onDeleteAll={onDeleteAll}

          // anchorEl={anchorEl}
          // handleLogoutClick={handleLogoutClick}
          // handleCloseLogout={handleCloseLogout}
          // handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
        //  cartItems={cartItems}
        // onAdd={onAdd}
        // onDelete={onDelete}
        // onRemove={onRemove}
        // onDeleteAll={onDeleteAll}
        // setSignupOpen={setSignupOpen}
        // setLoginOpen={setLoginOpen}
        // anchorEl={anchorEl}
        // handleLogoutClick={handleLogoutClick}
        // handleCloseLogout={handleCloseLogout}
        // handleLogoutRequest={handleLogoutRequest}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrderPage />
        </Route>
        <Route path="/member-page">
          <MyPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      {modalOpen && (
        <AuthenticationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          // @ts-ignore
          initialMode={modalMode}
        />
      )}
    </>
  );
}

export default App;
