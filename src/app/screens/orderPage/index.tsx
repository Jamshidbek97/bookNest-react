import React, { useState, useEffect } from "react";
import "../../../css/orderPage.css";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

/** Redux Slice & Selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  isbn: string;
}

interface Order {
  id: string;
  orderNumber: string;
  books: Book[];
  totalPrice: number;
  orderDate: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  estimatedDelivery?: string;
}

interface User {
  id: string;
  memberNick: string;
  memberEmail: string;
  memberPhone: string;
  memberAddress: string;
  memberImage?: string;
  memberType: "READER" | "AUTHOR" | "PUBLISHER";
}

const OrderPage: React.FC = () => {
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState<
    "pending" | "processing" | "delivered"
  >("pending");
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mockUser: User = {
      id: "1",
      memberNick: "BookLover123",
      memberEmail: "booklover@example.com",
      memberPhone: "+1-234-567-8900",
      memberAddress: "123 Reading St, Booktown, BT 12345",
      memberImage: "/img/member2.jpg",
      memberType: "READER",
    };

    const mockOrders: Order[] = [
      {
        id: "1",
        orderNumber: "BN2024001",
        books: [
          {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 12.99,
            image: "/img/default-book.jpg",
            isbn: "978-0-7432-7356-5",
          },
          {
            id: "2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 14.99,
            image: "/books/mockingbird.jpg",
            isbn: "978-0-06-112008-4",
          },
        ],
        totalPrice: 27.98,
        orderDate: "2024-01-15",
        status: "pending",
        shippingAddress: "123 Reading St, Booktown, BT 12345",
        estimatedDelivery: "2024-01-22",
      },
      {
        id: "2",
        orderNumber: "BN2024002",
        books: [
          {
            id: "3",
            title: "1984",
            author: "George Orwell",
            price: 13.99,
            image: "/books/1984.jpg",
            isbn: "978-0-452-28423-4",
          },
        ],
        totalPrice: 13.99,
        orderDate: "2024-01-10",
        status: "processing",
        shippingAddress: "123 Reading St, Booktown, BT 12345",
        estimatedDelivery: "2024-01-18",
      },
      {
        id: "3",
        orderNumber: "BN2024003",
        books: [
          {
            id: "4",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            price: 11.99,
            image: "/books/pride.jpg",
            isbn: "978-0-14-143951-8",
          },
        ],
        totalPrice: 11.99,
        orderDate: "2024-01-05",
        status: "delivered",
        shippingAddress: "123 Reading St, Booktown, BT 12345",
      },
    ];

    setUser(mockUser);
    setOrders(mockOrders);
  }, []);

  const getFilteredOrders = () => {
    return orders.filter((order) => {
      switch (activeTab) {
        case "pending":
          return order.status === "pending";
        case "processing":
          return order.status === "processing" || order.status === "shipped";
        case "delivered":
          return order.status === "delivered";
        default:
          return true;
      }
    });
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "#f39c12";
      case "processing":
        return "#3498db";
      case "shipped":
        return "#9b59b6";
      case "delivered":
        return "#27ae60";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#7f8c8d";
    }
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: "cancelled" as const }
          : order
      )
    );
  };

  const handleReorder = (order: Order) => {
    // Implement reorder logic
    console.log("Reordering:", order);
  };

  if (!authMember) history.push("/");

  return (
    <div className="order-page">
      <div className="order-header">
        <h1>My Orders</h1>
        <p>Track and manage your book orders</p>
      </div>

      <div className="order-tabs">
        <button
          className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Orders
        </button>
        <button
          className={`tab-button ${activeTab === "processing" ? "active" : ""}`}
          onClick={() => setActiveTab("processing")}
        >
          Processing Orders
        </button>
        <button
          className={`tab-button ${activeTab === "delivered" ? "active" : ""}`}
          onClick={() => setActiveTab("delivered")}
        >
          Delivered Orders
        </button>
      </div>

      <div className="order-content">
        <div className="order-list">
          {getFilteredOrders().length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No orders found</h3>
              <p>You haven't placed any orders in this category yet.</p>
            </div>
          ) : (
            getFilteredOrders().map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header-info">
                  <div className="order-number">
                    <span className="label">Order #</span>
                    <span className="value">{order.orderNumber}</span>
                  </div>
                  <div className="order-date">
                    <span className="label">Order Date</span>
                    <span className="value">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="order-books">
                  {order.books.map((book) => (
                    <div key={book.id} className="book-item">
                      <div className="book-image">
                        <img src={book.image} alt={book.title} />
                      </div>
                      <div className="book-info">
                        <h4>{book.title}</h4>
                        <p>by {book.author}</p>
                        <span className="isbn">ISBN: {book.isbn}</span>
                      </div>
                      <div className="book-price">${book.price}</div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span className="total-label">Total: </span>
                    <span className="total-amount">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="order-actions">
                    {order.status === "pending" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                    )}
                    {order.status === "delivered" && (
                      <button
                        className="reorder-btn"
                        onClick={() => handleReorder(order)}
                      >
                        Reorder
                      </button>
                    )}
                    <button className="details-btn">View Details</button>
                  </div>
                </div>

                {order.estimatedDelivery && (
                  <div className="delivery-info">
                    <span className="delivery-label">Estimated Delivery: </span>
                    <span className="delivery-date">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="order-sidebar">
          {authMember && (
            <div className="user-info-card">
              <div className="user-avatar">
                <img
                  src={
                    authMember?.memberImage?.startsWith("uploads/")
                      ? `${serverApi}/${authMember.memberImage}`
                      : `${serverApi}/uploads/members/${authMember.memberImage}`
                  }
                  alt="User Avatar"
                />
                <div className="user-type-badge">📖</div>
              </div>
              <h3>{authMember.memberNick}</h3>
              <p className="user-type">{authMember.memberType}</p>
              <div className="user-details">
                <div className="detail-item">
                  <span className="icon">📧</span>
                  <span>{authMember.memberEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">📞</span>
                  <span>{authMember.memberPhone}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <span>123 Reading St, Booktown, BT 12345</span>
                </div>
              </div>
            </div>
          )}

          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-number">
                  {orders.filter((o) => o.status === "pending").length}
                </span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {
                    orders.filter(
                      (o) => o.status === "processing" || o.status === "shipped"
                    ).length
                  }
                </span>
                <span className="stat-label">Processing</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {orders.filter((o) => o.status === "delivered").length}
                </span>
                <span className="stat-label">Delivered</span>
              </div>
            </div>
          </div>

          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn">
                <span className="icon">🛒</span>
                Continue Shopping
              </button>
              <button className="action-btn">
                <span className="icon">💳</span>
                Payment Methods
              </button>
              <button className="action-btn">
                <span className="icon">📍</span>
                Shipping Addresses
              </button>
              <button className="action-btn">
                <span className="icon">🎁</span>
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
