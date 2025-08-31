import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Products from "./Products";
import Recommendations from "./Recommendation";
import Location from "./Location";
import Testimonials from "./Testimonials";
import ProductDetail from "./ProductDetail";
import "../../../css/product.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsProps) {
  const { onAdd } = props;
  const location = useLocation();
  console.log("Products:", location);

  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ProductDetail onAdd={onAdd} />} />
        <Route path="" element={
          <div className="products">
            <Products onAdd={onAdd} />
            <Recommendations />
            <Testimonials />
            <Location />
          </div>
        } />
      </Routes>
    </div>
  );
}
