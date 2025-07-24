import React from "react";
import {
  Box,
  Button,
  Container,
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
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Book } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import {
  MenuBook,
  Close,
  ShoppingCart,
  LocalShipping,
  Receipt,
  LibraryBooks,
  CheckCircleOutline,
  Star,
  StarBorder,
  RateReview,
  Download,
  CheckCircle,
} from "@mui/icons-material";

/** Redux slice & Selector */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3" sx={{ padding: 0 }}>
      <Box sx={{ padding: "20px 0" }}>
        {finishedOrders && finishedOrders.length > 0 ? (
          <Stack spacing={3}>
            {finishedOrders.map((order: Order) => (
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
                    background: "linear-gradient(90deg, #10b981, #059669)",
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
                        sx={{ color: "#10b981", fontSize: "24px" }}
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
                      label="Completed"
                      icon={<CheckCircle />}
                      sx={{
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        "& .MuiChip-icon": {
                          color: "#065f46",
                        },
                      }}
                    />
                  </Box>

                  {/* Completion Status Banner */}
                  <Box
                    sx={{
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <CheckCircleOutline
                      sx={{ color: "#10b981", fontSize: "24px" }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: "#065f46",
                          marginBottom: "4px",
                        }}
                      >
                        Order Delivered Successfully
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Completed on {moment().format("MMMM DD, YYYY at HH:mm")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          sx={{
                            color: star <= 4 ? "#fbbf24" : "#d1d5db",
                            fontSize: "16px",
                          }}
                        />
                      ))}
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
                      Books delivered
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
                                  backgroundColor: "#10b981",
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
                                {/* Completion checkmark */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "4px",
                                    right: "4px",
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: "#059669",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <CheckCircle
                                    sx={{
                                      color: "white",
                                      fontSize: "10px",
                                    }}
                                  />
                                </Box>
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
                                  Unit Price: ${item.itemPrice} • Delivered
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
                                  color: "#10b981",
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
                      Final Order Summary
                    </Typography>

                    <Box
                      sx={{
                        backgroundColor: "#f0fdf4",
                        padding: "20px",
                        borderRadius: "12px",
                        border: "1px solid #bbf7d0",
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
                              sx={{ color: "#064e3b", fontSize: "18px" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#064e3b" }}
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
                              sx={{ color: "#064e3b", fontSize: "18px" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#064e3b" }}
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
                              color: "#10b981",
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
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#f8fafc",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", fontWeight: 600 }}
                      >
                        Order completed successfully
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        Thank you for your purchase!
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "8px" }}>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{
                          borderColor: "#10b981",
                          color: "#10b981",
                          fontWeight: 600,
                          padding: "8px 16px",
                          borderRadius: "8px",
                          textTransform: "none",
                          fontSize: "0.85rem",
                          "&:hover": {
                            backgroundColor: "#f0fdf4",
                            borderColor: "#059669",
                          },
                        }}
                      >
                        Receipt
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<RateReview />}
                        sx={{
                          backgroundColor: "#10b981",
                          color: "white",
                          fontWeight: 600,
                          padding: "8px 16px",
                          borderRadius: "8px",
                          textTransform: "none",
                          fontSize: "0.85rem",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                          "&:hover": {
                            backgroundColor: "#059669",
                            boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
                          },
                        }}
                      >
                        Write Review
                      </Button>
                    </Box>
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
                backgroundColor: "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <CheckCircleOutline
                sx={{
                  fontSize: "60px",
                  color: "#10b981",
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
              No Completed Orders Yet
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                maxWidth: "300px",
                lineHeight: 1.6,
              }}
            >
              Your successfully delivered orders will appear here. Complete your
              first purchase to see your order history!
            </Typography>
          </Box>
        )}
      </Box>
    </TabPanel>
  );
}
