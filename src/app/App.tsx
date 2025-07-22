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
import ProductDetail from "./screens/productPage/ProductDetail";
import MemberService from "./services/MemberService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";

type Mode = "login" | "signup";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<Mode>("login");
  const { setAuthMember } = useGlobals();
  const location = useLocation();
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = useBasket();

  /********* Handlers **********/
  const openModal = (mode: Mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("Success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
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
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalMode={modalMode}
          setModalMode={setModalMode}
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/product/:productId">
          <ProductDetail onAdd={onAdd} />
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
          <HomePage onAdd={onAdd} />
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
