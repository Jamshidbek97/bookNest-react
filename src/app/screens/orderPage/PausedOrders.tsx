import React from "react";
import {
  Box,
  Button,
  Stack,
  Chip,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Book } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/Order.Service";
import {
  Menu,
  Close,
  PauseCircle,
  Add,
  ShoppingCart,
  LocalShipping,
  Receipt,
  Cancel,
  Payment,
  LibraryBooks,
} from "@mui/icons-material";

/** Redux slice & Selector */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrderProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrderProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** Handlers */
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete Order");

      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      // Payment Process
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm("Do you want to Proceed Payment");

      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="1" sx={{ padding: 0 }}>
      <Box sx={{ padding: "20px 0" }}>
        {pausedOrders && pausedOrders.length > 0 ? (
          <Stack spacing={3}>
            {pausedOrders.map((order: Order) => (
              <Card
                key={order._id}
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  border: "1px solid #f1f5f9",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                <CardContent sx={{ padding: "24px" }}>
                  {/* Order Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <ShoppingCart
                        sx={{ color: "#f59e0b", fontSize: "24px" }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#1e293b",
                          fontSize: "1.1rem",
                        }}
                      >
                        Order #{order._id.slice(-8).toUpperCase()}
                      </Typography>
                    </Box>
                    <Chip
                      label="Paused"
                      icon={<PauseCircle />}
                      sx={{
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        "& .MuiChip-icon": {
                          color: "#92400e",
                        },
                      }}
                    />
                  </Box>

                  {/* Order Items */}
                  <Box sx={{ marginBottom: "24px" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "#64748b",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Menu sx={{ fontSize: "18px" }} />
                      Books in this order
                    </Typography>

                    <Stack spacing={2}>
                      {order.orderItems.map((item: OrderItem) => {
                        const product: Book = order.bookData.filter(
                          (ele: Book) => item.productId === ele._id
                        )[0];
                        const imagePath = product.coverImages?.[0]
                          ? `${serverApi}/${product.coverImages[0]}`
                          : null;

                        return (
                          <Box
                            key={item._id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "16px",
                              backgroundColor: "#f8fafc",
                              borderRadius: "12px",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "8px",
                                  backgroundColor: "#667eea",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  overflow: "hidden",
                                }}
                              >
                                {imagePath ? (
                                  <img
                                    src={imagePath}
                                    alt={product.title}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                      const target = e.target as HTMLElement;
                                      target.style.display = "none";
                                      const parent = target.parentElement;
                                      if (parent) {
                                        parent.innerHTML = `<LibraryBooks style="color: white; font-size: 24px;" />`;
                                      }
                                    }}
                                  />
                                ) : (
                                  <LibraryBooks
                                    sx={{ color: "white", fontSize: "24px" }}
                                  />
                                )}
                              </Box>

                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 600,
                                    color: "#1e293b",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {product.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#64748b",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  Unit Price: ${item.itemPrice}
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                backgroundColor: "white",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "#64748b", fontWeight: 500 }}
                              >
                                ${item.itemPrice}
                              </Typography>
                              <Close
                                sx={{ color: "#94a3b8", fontSize: "16px" }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: "#64748b", fontWeight: 500 }}
                              >
                                {item.itemQuantity}
                              </Typography>
                              <Box
                                sx={{
                                  width: "1px",
                                  height: "20px",
                                  backgroundColor: "#e2e8f0",
                                  margin: "0 4px",
                                }}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 700,
                                  color: "#667eea",
                                }}
                              >
                                ${item.itemQuantity * item.itemPrice}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>

                  <Divider sx={{ margin: "24px 0" }} />

                  {/* Price Breakdown */}
                  <Box sx={{ marginBottom: "24px" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "#64748b",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Receipt sx={{ fontSize: "18px" }} />
                      Price Breakdown
                    </Typography>

                    <Box
                      sx={{
                        backgroundColor: "#f8fafc",
                        padding: "20px",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Menu
                              sx={{ color: "#64748b", fontSize: "18px" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#64748b" }}
                            >
                              Books Total:
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#1e293b" }}
                          >
                            ${order.orderTotal - order.orderDelivery}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <LocalShipping
                              sx={{ color: "#64748b", fontSize: "18px" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#64748b" }}
                            >
                              Delivery Cost:
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#1e293b" }}
                          >
                            ${order.orderDelivery}
                          </Typography>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700, color: "#1e293b" }}
                          >
                            Total Amount:
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#667eea",
                              fontSize: "1.3rem",
                            }}
                          >
                            ${order.orderTotal}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={deleteOrderHandler}
                      value={order._id}
                      sx={{
                        borderColor: "#ef4444",
                        color: "#ef4444",
                        fontWeight: 600,
                        padding: "10px 24px",
                        borderRadius: "10px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#fef2f2",
                          borderColor: "#dc2626",
                        },
                      }}
                    >
                      Cancel Order
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Payment />}
                      onClick={processOrderHandler}
                      value={order._id}
                      sx={{
                        backgroundColor: "#10b981",
                        color: "white",
                        fontWeight: 600,
                        padding: "10px 24px",
                        borderRadius: "10px",
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                        "&:hover": {
                          backgroundColor: "#059669",
                          boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
                        },
                      }}
                    >
                      Proceed to Payment
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <PauseCircle
                sx={{
                  fontSize: "60px",
                  color: "#94a3b8",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              No Paused Orders
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                maxWidth: "300px",
                lineHeight: 1.6,
              }}
            >
              You don't have any paused orders at the moment. Orders will appear
              here when you pause them during checkout.
            </Typography>
          </Box>
        )}
      </Box>
    </TabPanel>
  );
}
