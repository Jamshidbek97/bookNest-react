import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import Recommendations from "./Recommendation";
import Location from "./Location";
import Testimonials from "./Testimonials";
import ProductDetail from "./ProductDetail";
import "../../../css/product.css";

export default function ProductsPage() {
  const products = useRouteMatch();
  console.log("Products:", products);

  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ProductDetail />
        </Route>

        <Route path="/products">
          <div className="products">
            <Products />
            <Recommendations />
            <Testimonials />
            <Location />
          </div>
        </Route>
      </Switch>
    </div>
  );
}
