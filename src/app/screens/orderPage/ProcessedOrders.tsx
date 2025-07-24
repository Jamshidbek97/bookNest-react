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
import moment from "moment";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Book } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/Order.Service";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import {
  MenuBook,
  Close,
  ShoppingCart,
  LocalShipping,
  Receipt,
  LibraryBooks,
  AccessTime,
  CheckCircle,
  Sync,
  VerifiedUser,
} from "@mui/icons-material";

/** Redux slice & Selector */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrderProps {
  setValue: (input: string) => void;
}

export default function ProcessedOrders(props: ProcessOrderProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  /** Handlers **/
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your Order?");

      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2" sx={{ padding: 0 }}>
      <Box sx={{ padding: "20px 0" }}>
        {processOrders && processOrders.length > 0 ? (
          <Stack spacing={3}>
            {processOrders.map((order: Order) => (
              <Card
                key={order._id}
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  border: "1px solid #f1f5f9",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
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
                        sx={{ color: "#3b82f6", fontSize: "24px" }}
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
                      label="Processing"
                      icon={
                        <Sync sx={{ animation: "spin 2s linear infinite" }} />
                      }
                      sx={{
                        backgroundColor: "#dbeafe",
                        color: "#1d4ed8",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        "& .MuiChip-icon": {
                          color: "#1d4ed8",
                        },
                      }}
                    />
                  </Box>

                  {/* Processing Status Banner */}
                  <Box
                    sx={{
                      backgroundColor: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <AccessTime sx={{ color: "#3b82f6", fontSize: "20px" }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: "#1e40af",
                          marginBottom: "4px",
                        }}
                      >
                        Order Being Processed
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Payment confirmed • Books being prepared for shipment
                      </Typography>
                    </Box>
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
                      <MenuBook sx={{ fontSize: "18px" }} />
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
                                  backgroundColor: "#3b82f6",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  overflow: "hidden",
                                  position: "relative",
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
                                {/* Processing indicator */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "4px",
                                    right: "4px",
                                    width: "12px",
                                    height: "12px",
                                    backgroundColor: "#10b981",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                  }}
                                />
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
                                  color: "#3b82f6",
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
                      Order Summary
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
                            <MenuBook
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
                            Total Paid:
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#3b82f6",
                              fontSize: "1.3rem",
                            }}
                          >
                            ${order.orderTotal}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>

                  {/* Processing Time and Action */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f0f9ff",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid #0ea5e9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <AccessTime sx={{ color: "#0ea5e9", fontSize: "20px" }} />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#0c4a6e", fontWeight: 600 }}
                        >
                          Processing Started
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          {moment().format("MMM DD, YYYY HH:mm")}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      startIcon={<VerifiedUser />}
                      onClick={finishOrderHandler}
                      value={order._id}
                      sx={{
                        backgroundColor: "#059669",
                        color: "white",
                        fontWeight: 600,
                        padding: "12px 24px",
                        borderRadius: "10px",
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                        "&:hover": {
                          backgroundColor: "#047857",
                          boxShadow: "0 6px 20px rgba(5, 150, 105, 0.4)",
                        },
                      }}
                    >
                      Confirm Delivery
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
                backgroundColor: "#f0f9ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <Sync
                sx={{
                  fontSize: "60px",
                  color: "#3b82f6",
                  animation: "spin 3s linear infinite",
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
              No Orders Processing
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                maxWidth: "300px",
                lineHeight: 1.6,
              }}
            >
              Orders will appear here after payment confirmation while they're
              being prepared for delivery.
            </Typography>
          </Box>
        )}
      </Box>
    </TabPanel>
  );
}
