import React, { useState } from "react";
import "../../../css/basket.css";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages } from "../../../lib/config";
import OrderService from "../../services/Order.Service";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = props;
  // TODO:
  const { authMember, setOrderBuilder } = useGlobals();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  // const mockCartItems: CartItem[] = [
  //   {
  //     _id: "1",
  //     title: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     price: 12.99,
  //     coverImage: "/books/gatsby.jpg",
  //     quantity: 2,
  //   },
  //   {
  //     _id: "2",
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     price: 14.99,
  //     coverImage: "/books/mockingbird.jpg",
  //     quantity: 1,
  //   },
  //   {
  //     _id: "3",
  //     title: "1984",
  //     author: "George Orwell",
  //     price: 13.99,
  //     coverImage: "/books/1984.jpg",
  //     quantity: 1,
  //   },
  // ];

  const items = cartItems;
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const shippingCost = 5.99;
  const itemPrice = calculateTotal();
  const totalPrice = itemPrice + shippingCost;

  const handleToggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleAddItem = (item: CartItem) => {
    onAdd?.(item);
  };

  const handleRemoveItem = (item: CartItem) => {
    onRemove?.(item);
  };

  const handleDeleteItem = (item: CartItem) => {
    onDelete?.(item);
  };

  const handleDeleteAll = () => {
    onDeleteAll?.();
  };

  // const handleProceedOrder = () => {
  // onProceedOrder();
  //   setIsOpen(false);
  // };

  const handleProceedOrder = async () => {
    try {
      setIsOpen(false);
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <div className="basket-container">
      <button className="cart-icon-button" onClick={handleToggleCart}>
        <div className="cart-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {getTotalItems() > 0 && (
            <span className="cart-badge">{getTotalItems()}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <>
          <div className="basket-overlay" onClick={handleToggleCart}></div>
          <div className="basket-dropdown">
            <div className="basket-header">
              {items.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-icon">🛒</div>
                  <div className="empty-message">Your cart is empty</div>
                  <button
                    className="browse-btn"
                    onClick={() => history.push("/products")}
                  >
                    Browse Books
                  </button>
                </div>
              ) : (
                <div className="cart-header-content">
                  <h3>Shopping Cart</h3>
                  <button className="delete-all-btn" onClick={handleDeleteAll}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    Clear All
                  </button>
                </div>
              )}
            </div>

            <div className="basket-items">
              {items.map((item) => (
                <div key={item._id} className="basket-item">
                  <button
                    className="remove-item-btn"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  <div className="item-image">
                    <img src={item.coverImage} alt={item.title} />
                  </div>

                  <div className="item-details">
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-author">by {item.author}</p>
                    <div className="item-price">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </div>
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn decrease"
                      onClick={() => handleRemoveItem(item)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn increase"
                      onClick={() => handleAddItem(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="basket-footer">
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Items:</span>
                    <span>${itemPrice.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button className="checkout-btn" onClick={handleProceedOrder}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
