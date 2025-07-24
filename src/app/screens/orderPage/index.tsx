import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TabContext from "@mui/lab/TabContext";
import PausedOrders from "./PausedOrders";
// import ProcessedOrder from "./ProcessedOrders";
// import FinishedOrder from "./FinishedOrders";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { Dispatch } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/Order.Service";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { serverApi } from "../../../lib/config";

/** Redux Slice & Selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrderPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className="modern-order-page">
      {/* Header Section */}
      <div className="order-header">
        <div className="header-content">
          <h1 className="page-title">My Orders</h1>
          <p className="page-subtitle">Track and manage your book orders</p>
        </div>
        <div className="header-decoration">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>

      <Container maxWidth="xl" className="main-container">
        <div className="content-grid">
          {/* Left Side - Orders */}
          <div className="orders-section">
            <div className="tabs-container">
              <Tabs
                value={value}
                onChange={handleChange}
                className="modern-tabs"
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    background:
                      "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                    height: "3px",
                    borderRadius: "2px",
                  },
                }}
              >
                <Tab label="Paused Orders" value="1" className="modern-tab" />
                <Tab
                  label="Processed Orders"
                  value="2"
                  className="modern-tab"
                />
                <Tab label="Finished Orders" value="3" className="modern-tab" />
              </Tabs>
            </div>

            <div className="orders-content">
              <TabContext value={value}>
                <div className="tab-panels">
                  {value === "1" && <PausedOrders setValue={setValue} />}
                  {/* <ProcessedOrder setValue={setValue} />
                  <FinishedOrder /> */}
                </div>
              </TabContext>
            </div>
          </div>

          {/* Right Side - Profile & Payment */}
          <div className="sidebar-section">
            {/* User Profile Card */}
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar-container">
                  <div className="avatar-wrapper">
                    <img
                      src={
                        authMember?.memberImage
                          ? `${serverApi}/${authMember.memberImage}`
                          : "/icons/default-user.svg"
                      }
                      className="profile-avatar"
                      alt="User Avatar"
                    />
                    <div className="member-badge">
                      <img
                        src={"/icons/user-badge.svg"}
                        className="badge-icon"
                        alt="Member Badge"
                      />
                    </div>
                  </div>
                </div>

                <div className="profile-info">
                  <h3 className="profile-name">{authMember?.memberNick}</h3>
                  <span className="profile-type">{authMember?.memberType}</span>
                </div>
              </div>

              <div className="profile-details">
                <div className="location-info">
                  <LocationOnIcon className="location-icon" />
                  <p className="location-text">
                    {authMember?.memberAddress
                      ? authMember.memberAddress
                      : "Address not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="payment-card">
              <div className="payment-header">
                <h3 className="payment-title">Payment Information</h3>
                <div className="security-badge">
                  <span className="security-text">🔒 Secured</span>
                </div>
              </div>

              <div className="payment-form">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <TextField
                    className="modern-input"
                    variant="outlined"
                    placeholder="5243 4090 2002 7495"
                    fullWidth
                    InputProps={{
                      sx: {
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #e2e8f0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #cbd5e1",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #667eea",
                        },
                      },
                    }}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Expiry Date</label>
                    <TextField
                      className="modern-input"
                      variant="outlined"
                      placeholder="07 / 24"
                      fullWidth
                      InputProps={{
                        sx: {
                          backgroundColor: "#f8fafc",
                          borderRadius: "12px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #e2e8f0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #cbd5e1",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #667eea",
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">CVV</label>
                    <TextField
                      className="modern-input"
                      variant="outlined"
                      placeholder="010"
                      fullWidth
                      InputProps={{
                        sx: {
                          backgroundColor: "#f8fafc",
                          borderRadius: "12px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #e2e8f0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #cbd5e1",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #667eea",
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <TextField
                    className="modern-input"
                    variant="outlined"
                    placeholder="Justin Robertson"
                    fullWidth
                    InputProps={{
                      sx: {
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #e2e8f0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #cbd5e1",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #667eea",
                        },
                      },
                    }}
                  />
                </div>

                <div className="payment-methods">
                  <p className="payment-methods-label">
                    Accepted Payment Methods
                  </p>
                  <div className="payment-icons">
                    <div className="payment-icon-wrapper">
                      <img src="./icons/western-card.svg" alt="Western Union" />
                    </div>
                    <div className="payment-icon-wrapper">
                      <img src="./icons/master-card.svg" alt="MasterCard" />
                    </div>
                    <div className="payment-icon-wrapper">
                      <img src="./icons/paypal-card.svg" alt="PayPal" />
                    </div>
                    <div className="payment-icon-wrapper">
                      <img src="./icons/visa-card.svg" alt="Visa" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
